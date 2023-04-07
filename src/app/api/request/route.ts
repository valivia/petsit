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

  const data = await prisma.request.create({
    data: { userId: session.user.id, jobId }
  });

  return NextResponse.json(data);
}
