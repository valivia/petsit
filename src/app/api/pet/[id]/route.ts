import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { petSchema } from "../route";
import { getSessionAndId } from "@/lib/middleware";
import Prisma from "@prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function DELETE(request: Request, { params }: Params) {
  const { session, id, error } = await getSessionAndId(params)
  if (error) return error;

  const pet = await prisma.pet.findUnique({ where: { id } });

  if (!pet)
    return new Response("Pet not found", { status: 404 });

  if (pet.userId !== session.user?.id && session.user.role !== Prisma.Role.ADMIN)
    return new Response("Unauthorized", { status: 401 });

  const data = await prisma.pet.delete({ where: { id } });

  return NextResponse.json(data);
}


export async function GET(request: Request, { params }: Params) {
  const { session, id, error } = await getSessionAndId(params)
  if (error) return error;

  const data = await prisma.pet.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!data) return new Response("Pet not found", { status: 404 });

  return NextResponse.json(data);
}


export async function PUT(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) { return new Response("Unauthorized", { status: 401 }); }

  const id = params.id;
  if (!id) { return new Response("Missing id", { status: 400 }); }

  const requestData = await request.json();
  const body = await petSchema.safeParseAsync(requestData);

  if (!body.success) {
    return new Response(body.error.message, { status: 400 });
  }

  const data = await prisma.pet.updateMany({
    where: {
      id,
      userId: session.user?.id,
    },
    data: {
      ...body.data,
    }
  })

  return NextResponse.json(data);
}
