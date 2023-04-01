import { JobStatus } from "@prisma/client";
import styles from "./page.module.scss";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const getJobs = async () => {
  const jobs = await prisma.job.findMany({
    where: {
      status: JobStatus.PENDING,
    },
  });

  return jobs;
}

export default async function Page() {
  const jobs = await getJobs();

  return (
    <main className={styles.main}>
      <section>
        <h1>Jobs</h1>
        <div>

          {jobs.map((job) =>
            <Link href={`/job/${job.id}`}>
              <article>
                <h2>{job.title}</h2>

              </article>
            </Link>
          )}

        </div>
      </section>
    </main >
  );
}
