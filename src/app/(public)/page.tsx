import { JobStatus } from "@prisma/client";
import styles from "./page.module.scss";
import { prisma } from "@/lib/prisma";
import { Jobs } from "../../components/job/jobs";
import { FilteredJobs } from "@/components/job/filteredJobs";

const getJobs = async () => {

  const jobs = await prisma.job.findMany({
    where: {
      status: JobStatus.OPEN,
    },
    include: {
      pets: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs;
}

export default async function Page() {
  const jobs = await getJobs();

  return (
    <main className={styles.main}>
      <FilteredJobs jobs={JSON.parse(JSON.stringify(jobs))} />
    </main >
  );
}
