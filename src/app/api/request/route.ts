import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) { return new Response("Unauthorized", { status: 401 }); }

  const requests = await prisma.request.findMany({
    where: { job: { authorId: session.user.id } },
    include: { user: true, job: true }
  });

  return NextResponse.json(requests);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) { return new Response("Unauthorized", { status: 401 }); }

  const { jobId } = await request.json();
  if (!jobId) { return new Response("Missing jobId", { status: 400 }); }

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) { return new Response("Job not found", { status: 404 }); }

  if (job.authorId === session.user.id) {
    return new Response("You can't request your own job", { status: 400 });
  }

  if (job.status !== "OPEN") {
    return new Response("Job is not open for requests", { status: 400 });
  }

  const data = await prisma.request.create({
    data: { userId: session.user.id, jobId }
  });

  return NextResponse.json(data);
}
