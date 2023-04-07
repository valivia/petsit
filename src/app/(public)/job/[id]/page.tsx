import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import styles from "./page.module.scss";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Profile } from "@/components/user/profile";
import { Job } from "./_components/job";
import { Pets } from "@/components/pet/pets";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { JobStatus } from "@prisma/client";
import { CreateRequest } from "./_components/createRequest";


async function getData(id: string) {
  return await prisma.job.findUnique({
    where: { id },
    include: {
      author: true,
      pets: true,
    },
  });
}

export default async function Page({ params }: { params: Params }) {
  const job = await getData(params.id);
  if (!job) notFound();

  const session = await getServerSession(authOptions);
  if (
    (job.status === JobStatus.COMPLETED || job.status === JobStatus.CANCELLED) &&
    (session?.user?.id !== job.author.id)
  ) notFound();

  return (
    <main className={styles.main}>

      <Job job={job} />

      <Profile user={job.author} />

      {session?.user &&
        session?.user?.id !== job.author.id &&
        job.status === JobStatus.OPEN &&
        <CreateRequest id={job.id} />
      }

      <Pets pets={job.pets} />

    </main >
  );
}
