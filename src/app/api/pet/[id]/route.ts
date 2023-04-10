import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { petSchema } from "../route";

export interface Params {
  params: {
    id: string;
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) { return new Response("Unauthorized", { status: 401 }); }

  const id = params.id;
  if (!id) { return new Response("Missing id", { status: 400 }); }

  const data = await prisma.pet.deleteMany({
    where: {
      id: id,
      userId: session.user?.id,
    }
  });

  if (data.count === 0) {
    return new Response("No pets deleted", { status: 404 });
  }

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
    console.log(body.error);
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
