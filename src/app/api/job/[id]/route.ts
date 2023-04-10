import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { jobSchema } from "../route";
import { getSessionAndId } from "@/lib/middleware";
import Prisma from "@prisma/client";

export async function DELETE(request: Request, { params }: IdParams) {
  const { session, id, error } = await getSessionAndId(params)
  if (error) return error;

  const job = await prisma.job.findUnique({ where: { id } });

  if (!job) return new Response("Job not found", { status: 404 });
  if (job.authorId !== session.user?.id && session.user.role !== Prisma.Role.ADMIN)
    return new Response("Unauthorized", { status: 401 });

  const data = await prisma.job.delete({ where: { id } });

  return NextResponse.json(data);
}


export async function PUT(request: Request, { params }: IdParams) {
  const session = await getServerSession(authOptions);
  if (!session) { return new Response("Unauthorized", { status: 401 }); }

  const id = params.id;
  if (!id) { return new Response("Missing id", { status: 400 }); }

  const requestData = await request.json();
  const body = await jobSchema.safeParseAsync(requestData);

  if (!body.success) {
    console.log(body.error);
    return new Response(body.error.message, { status: 400 });
  }

  const check = await prisma.job.findUnique({
    where: {
      id: id,
    }
  });

  if (!check || check.authorId !== session.user?.id) {
    return new Response("Job not found", { status: 404 });
  }

  const data = await prisma.job.update({
    where: { id },
    data: {
      ...body.data,
      pets: { connect: body.data.pets.map(id => ({ id })) },
    }
  })

  return NextResponse.json(data);
}
