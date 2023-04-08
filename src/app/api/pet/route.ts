import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { petType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export function GET(request: Request) {
  return new Response('Hello, Next.js!')
}


const postSchema = z.object({
  name: z.string(),
  breed: z.string().optional(),
  bio: z.string().optional(),
  birthDate: z.coerce.date().optional(),
  type: z.nativeEnum(petType),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) { return new Response("Unauthorized", { status: 401 }); }

  const requestData = await request.json();
  const body = await postSchema.safeParseAsync(requestData);

  if (!body.success) {
    console.log(body.error);
    return new Response(body.error.message, { status: 400 });
  }

  const data = await prisma.pet.create({
    data: {
      ...body.data,
      user: { connect: { id: session.user?.id } },
    }
  })

  return NextResponse.json(data);
}

