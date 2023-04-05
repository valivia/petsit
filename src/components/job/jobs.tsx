import styles from "./jobs.module.scss";
import Prisma from "@prisma/client";
import { Job } from "@/components/job/job";

interface JobProps {
  jobs: Prisma.Job[];
}

export const Jobs = ({ jobs }: JobProps) => {
  return (
    <section className={styles.main}>
      <h1 className={styles.title}>Jobs</h1>
      <ul className={styles.jobs}>
        {jobs.map((job) => <Job job={job} />)}
      </ul>

    </section>
  );
};
