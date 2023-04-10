import { getSessionAndId } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";

import { JobStatus } from "@prisma/client";
import { Session } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

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

export async function DELETE(req: Request, { params }: Params) {
  const { session, id, error: error1 } = await getSessionAndId(params);
  if (error1) { return error1; }

  const { error: error2 } = await checkOwnership(id, session);
  if (error2) { return error2; }

  const deleted = await prisma.request.delete({ where: { id } });

  return NextResponse.json(deleted);
}


export async function PUT(req: Request, { params }: Params) {
  const { session, id, error: error1 } = await getSessionAndId(params);
  if (error1) { return error1; }

  const { request, error: error2 } = await checkOwnership(id, session);
  if (error2) { return error2; }

  await prisma.$transaction([
    prisma.job.update({
      where: { id: request.jobId },
      data: {
        status: JobStatus.ONGOING,
        acceptedBy: { connect: { id: request.userId } },
      }
    }),
    prisma.request.delete({ where: { id } })
  ]);

  return NextResponse.json({ success: true });
}
