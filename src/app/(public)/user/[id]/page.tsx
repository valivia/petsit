import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import styles from "./page.module.scss";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Pets } from "@components/pet/pets";
import { Profile } from "@/components/user/profile";
import { Jobs } from "@components/job/jobs";
import { Environment } from "./_components/environment ";
import { Reviews } from "@/components/review/reviews";
import { JobStatus } from "@prisma/client";
import { AdminButton } from "@/components/layout/adminMenu";
import { Mod } from "./_components/mod";

const getData = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      pets: true,
      assets: true,
      jobs: {
        where: { status: JobStatus.OPEN },
        include: {
          pets: true,
        }
      }
    }
  });

  const reviews = await prisma.review.findMany({
    where: { job: { acceptedBy: { id } } },
    include: { job: { include: { author: true } } }
  });

  return { user, reviews };
}

export default async function Page({ params }: { params: Params }) {

  const session = await getServerSession(authOptions);
  const editable = session?.user?.id === params.id;

  const data = await getData(params.id);
  if (!data.user) notFound();

  return (
    <main className={styles.main}>

      <AdminButton title="Moderate User" session={session}>
        <Mod id={params.id} />
      </AdminButton>

      <Profile user={data.user} />

      <Reviews reviews={data.reviews} />

      <Environment assets={data.user.assets} editable={editable} />

      <Pets pets={data.user.pets} editable={editable} />

      <Jobs jobs={data.user.jobs} editable={editable} />

    </main >
  );
}
