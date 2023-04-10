import { prisma } from "@/lib/prisma";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { JobStatus } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export interface Params {
  params: {
    id: string;
  }
}


const checkOwnership = async (id: string, session: Session) => {
  const request = await prisma.request.findUnique({
    where: { id: id },
    include: { job: true }
  });

  if (!request || request.job.authorId !== session.user?.id && request.userId !== session.user?.id) {
    return { error: new Response("Unauthorized", { status: 401 }) };
  }

  return { request };
}

const checkRequest = async (params: Params["params"]) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return { error: new Response("Unauthorized", { status: 401 }) }

  const id = params.id;
  if (!id)
    return { error: new Response("Missing id", { status: 400 }) }

  return { session, id };
}

export async function DELETE(req: Request, { params }: Params) {
  const { session, id, error: error1 } = await checkRequest(params);
  if (error1) { return error1; }

  const { error: error2 } = await checkOwnership(id, session);
  if (error2) { return error2; }

  const deleted = await prisma.request.delete({ where: { id } });

  return NextResponse.json(deleted);
}


export async function PUT(req: Request, { params }: Params) {
  const { session, id, error: error1 } = await checkRequest(params);
  if (error1) { return error1; }

  const { request, error: error2 } = await checkOwnership(id, session);
  if (error2) { return error2; }

  await prisma.$transaction([
    prisma.job.update({
      where: { id: request.jobId },
      data: {
        status: JobStatus.ACCEPTED,
        acceptedBy: { connect: { id: request.userId } },
      }
    }),
    prisma.request.delete({ where: { id } })
  ]);

  return NextResponse.json({ success: true });
}
