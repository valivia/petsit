import { formatDate } from "@/lib/formatDate";
import styles from "./job.module.scss";
import Prisma from "@prisma/client";
import { Details } from "./details";

interface JobProps {
  job: Prisma.Job;
}

export const Job = ({ job }: JobProps) => {

  const hours =
    job.startDate && job.endDate
      ? Math.round((job.endDate.getTime() - job.startDate.getTime()) / 1000 / 60 / 60)
      : 0;

    return (
      <section className={styles.main}>

        <h1 className={styles.title}>{job.title}</h1>

        <div className={styles.content}>

          {/* Description */}
          <p className={styles.description}>
            {job.description}
          </p>

          {/* Notes */}
          {job.notes &&
            <div className={styles.description}>
              <h2>Notes</h2>
              <p>{job.notes}</p>
            </div>
          }

          {/* Details */}
          <Details job={job} />

        </div>

      </section>
    );
  };
