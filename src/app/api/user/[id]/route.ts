import { getSessionAndId } from "@/lib/middleware";
import Prisma from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: IdParams) {
  const { session, id, error } = await getSessionAndId(params)
  if (error) return error;

  if (session.user.id !== id && session.user.role !== Prisma.Role.ADMIN)
    return new Response("Unauthorized", { status: 401 });


  const data = await prisma.user.delete({ where: { id } });

  return NextResponse.json(data);
}
