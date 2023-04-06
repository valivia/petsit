import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import styles from "./page.module.scss";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Profile } from "@/components/user/profile";
import { Job } from "./_components/job";
import { Pets } from "@/components/pet/pets";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Prisma, { JobStatus } from "@prisma/client";
import { CreateRequest } from "./_components/createRequest";


async function getData(id: string) {
  return await prisma.job.findUnique({
    where: { id },
    include: {
      user: true,
      pets: true,
    },
  });
}

export default async function Page({ params }: { params: Params }) {
  const data = await getData(params.id);
  if (!data) notFound();

  const session = await getServerSession(authOptions);
  if (
    (data.status === JobStatus.COMPLETED || data.status === JobStatus.CANCELLED) &&
    (session?.user?.id !== data.user.id)
  ) notFound();

  return (
    <main className={styles.main}>

      <Job job={data} />

      <Profile user={data.user} />

      {session?.user &&
        session?.user?.id !== data.user.id &&
        data.status === JobStatus.OPEN &&
        <CreateRequest id={data.id} />
      }

      <Pets pets={data.pets} />

    </main >
  );
}
