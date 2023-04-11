import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSessionAndId } from "@/lib/middleware";
import Prisma from "@prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function DELETE(req: Request, { params }: Params) {
  const { session, id, error } = await getSessionAndId(params)
  if (error) return error;

  const request = await prisma.request.findUnique({ where: { id } });

  if (!request)
    return new Response("Request not found", { status: 404 });

  if (request.userId !== session.user?.id && session.user.role !== Prisma.Role.ADMIN)
    return new Response("Unauthorized", { status: 401 });

  const data = await prisma.request.delete({ where: { id } });

  return NextResponse.json(data);
}


export async function GET(request: Request, { params }: Params) {
  const { session, id, error } = await getSessionAndId(params)
  if (error) return error;

  const data = await prisma.review.findUnique({ where: { id } });

  if (!data) return new Response("Request not found", { status: 404 });

  return NextResponse.json(data);
}
