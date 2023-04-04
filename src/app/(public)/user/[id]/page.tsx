import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import styles from "./page.module.scss";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Pets } from "./_components/pets";
import { Profile } from "@/components/user/profile";
import { Jobs } from "./_components/jobs";

const getData = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id }, include: { pets: true } });
  const jobs = await prisma.job.findMany({ where: { userId: id }, include: { pets: true } });
  return { user, jobs };
}

export default async function Page({ params }: { params: Params }) {


  const session = await getServerSession(authOptions);

  const data = await getData(params.id);
  if (!data.user) notFound();

  return (
    <main className={styles.main}>

      <Profile user={data.user} />

      <Pets pets={data.user.pets} />

      <Jobs jobs={data.jobs} />

    </main >
  );
}
