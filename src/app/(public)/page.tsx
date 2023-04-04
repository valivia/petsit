import { JobStatus } from "@prisma/client";
import styles from "./page.module.scss";
import { prisma } from "@/lib/prisma";
import { Jobs } from "./user/[id]/_components/jobs";

const getJobs = async () => {

  const jobs = await prisma.job.findMany({
    where: {
      status: JobStatus.OPEN,
    },
    include: {
      pets: true,
    },
  });

  return jobs;
}

export default async function Page() {
  const jobs = await getJobs();

  return (
    <main className={styles.main}>
      <Jobs jobs={jobs} />
    </main >
  );
}
