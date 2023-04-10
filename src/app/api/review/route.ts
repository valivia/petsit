import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { JobStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";


const schema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(500),
  jobId: z.string().cuid(),
});




export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session) { return new Response("Unauthorized", { status: 401 }); }

  const requestData = await req.json();
  const body = await schema.safeParseAsync(requestData);

  if (!body.success) {
    console.log(body.error);
    return new Response(body.error.message, { status: 400 });
  }

  const job = await prisma.job.findUnique({
    where: {
      id: body.data.jobId,
    },
  });

  if (!job) return new Response("Job not found", { status: 404 });


  if (job.authorId !== session.user?.id) return new Response("Unauthorized", { status: 401 });


  prisma.$transaction([
    prisma.review.create({
      data: {
        ...body.data,
      }
    }),
    prisma.job.update({
      where: {
        id: body.data.jobId,
      },
      data: {
        status: JobStatus.COMPLETED,
      },
    }),
  ]);



  return NextResponse.json({ success: true });
}
