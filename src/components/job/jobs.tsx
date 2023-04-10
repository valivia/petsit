import styles from "./jobs.module.scss";
import Prisma from "@prisma/client";
import { Job } from "@/components/job/job";
import { Section } from "../layout/section";
import { ModifyJob } from "./modify";
import { Editable } from "@/types/editable";

interface JobProps extends Editable {
  jobs: (Prisma.Job & { pets: Prisma.Pet[]; })[]
}

export const Jobs = ({ jobs, editable }: JobProps) => {
  return (
    <Section
      title="jobs"
      editable={editable}
      addComponent={<ModifyJob />}
      modalTitle="Add Job"
    >
      <ul className={styles.jobs}>
        {jobs.map((job) => <Job key={job.id} job={job} editable={editable} />)}
      </ul>
    </Section>
  );
};
