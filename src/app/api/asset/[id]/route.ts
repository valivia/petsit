import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) { return new Response("Unauthorized", { status: 401 }); }

  const id = params.id;
  if (!id) { return new Response("Missing id", { status: 400 }); }

  const data = await prisma.asset.delete({ where: { id } });

  return NextResponse.json(data);
}
