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

const getData = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id }, include: { pets: true, assets: true } });
  const jobs = await prisma.job.findMany({ where: { authorId: id }, include: { pets: true } });
  return { user, jobs };
}

export default async function Page({ params }: { params: Params }) {

  const session = await getServerSession(authOptions);

  const data = await getData(params.id);
  if (!data.user) notFound();

  return (
    <main className={styles.main}>

      <Profile user={data.user} />

      <Environment assets={data.user.assets} user={data.user} />

      <Pets pets={data.user.pets} user={data.user} session={session} />

      <Jobs jobs={data.jobs} />

    </main >
  );
}
