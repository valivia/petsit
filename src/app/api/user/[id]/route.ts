import { prisma } from "@/lib/prisma";
import { getSessionAndId } from "@/lib/middleware";
import Prisma from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: IdParams) {
  const { session, id, error } = await getSessionAndId(params)
  if (error) return error;

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return new Response("User not found", { status: 404 });

  if ((session.user.id !== user.id && session.user.role !== Prisma.Role.ADMIN) || user.role === Prisma.Role.ADMIN)
    return new Response("Unauthorized", { status: 401 });


  const data = await prisma.user.delete({ where: { id } });

  return NextResponse.json(data);
}
