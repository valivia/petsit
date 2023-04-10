import { JobStatus } from "@prisma/client";
import styles from "./page.module.scss";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Request } from "@/components/request/request";
import { Requests } from "@/components/request/requests";

async function getData(userId: string) {
  const sent = await prisma.request.findMany({
    where: { userId },
    include: {
      user: true, job: { include: { author: true } }
    }
  });

  const received = await prisma.request.findMany({
    where: { job: { authorId: userId } },
    include: {
      user: true, job: { include: { author: true } }
    }
  });

  const active = await prisma.job.findMany({
    where: { authorId: userId, status: JobStatus.ONGOING },
    include: { acceptedBy: true, author: true }
  });

  return { sent, received, active };
}



export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return { redirect: { destination: "/api/auth/signin", permanent: false } };
  const { sent, received, active } = await getData(session.user.id);

  console.log({ sent, received });
  return (
    <main className={styles.main}>
      <Requests requests={sent} />
      <Requests requests={received} editable />

    </main >
  );
}
