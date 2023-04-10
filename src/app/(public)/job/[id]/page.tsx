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
import { Details } from "./_components/details";
import { Status } from "./_components/status";


async function getData(id: string) {
  return await prisma.job.findUnique({
    where: { id },
    include: {
      author: true,
      acceptedBy: true,
      pets: true,
      requests: true,
    },
  });
}

export default async function Page({ params }: { params: Params }) {
  const job = await getData(params.id);
  if (!job) notFound();

  const session = await getServerSession(authOptions);
  const isOwner = job.author.id === session?.user.id;
  const isAcceptedUser = job.acceptedBy?.id === session?.user.id;

  if ((job.status !== JobStatus.OPEN) && !(isOwner || isAcceptedUser)) notFound();

  return (
    <main className={styles.main}>
      <Profile user={job.author} />

      <Job job={job} session={session}>
        <Status job={job} session={session} />
      </Job>

      {/* Details */}
      <Details job={job} />


      <Pets pets={job.pets} />

    </main >
  );
}
