import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { JobType, RateType, petType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export function GET(request: Request) {
  return new Response('Hello, Next.js!')
}


export const jobSchema = z.object({
  title: z.string(),
  description: z.string(),
  notes: z.string().optional(),
  location: z.string(),

  rate: z.coerce.number().optional(),
  rateType: z.nativeEnum(RateType).optional(),

  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),

  type: z.nativeEnum(JobType),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) { return new Response("Unauthorized", { status: 401 }); }

  const requestData = await request.json();
  const body = await jobSchema.safeParseAsync(requestData);

  if (!body.success) {
    console.log(body.error);
    return new Response(body.error.message, { status: 400 });
  }

  const data = await prisma.job.create({
    data: {
      ...body.data,
      author: { connect: { id: session.user?.id } },
    }
  })

  return NextResponse.json(data);
}
