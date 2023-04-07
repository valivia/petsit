import styles from "./jobs.module.scss";
import Prisma from "@prisma/client";
import { Job } from "@/components/job/job";
import { Section } from "../layout/section";

interface JobProps {
  jobs: (Prisma.Job & { pets: Prisma.Pet[]; })[]
}

export const Jobs = ({ jobs }: JobProps) => {
  return (
    <Section title="jobs">
      <ul className={styles.jobs}>
        {jobs.map((job) => <Job key={job.id} job={job} />)}
      </ul>
    </Section>
  );
};
