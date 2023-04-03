import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import styles from "./page.module.scss";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Pets } from "./_components/pets";
import { Profile } from "@/components/user/profile";

const getData = async (id: string) => {
  return await prisma.user.findUnique({ where: { id }, include: { pets: true } })
}

export default async function Page({ params }: { params: Params }) {

  const session = await getServerSession(authOptions);

  const data = await getData(params.id);
  if (!data) notFound();

  return (
    <main className={styles.main}>
      <Profile user={data} />

      <Pets pets={data?.pets} />

      <section className={styles.section}>
        <h2>Jobs</h2>
      </section>

    </main >
  );
}
