import styles from "./job.module.scss";
import Prisma from "@prisma/client";
import { PropsWithChildren } from "react";
import { Session } from "next-auth";

interface Props {
  job: (Prisma.Job & {
    requests: Prisma.Request[];
    author: Prisma.User;
    acceptedBy: Prisma.User | null;
  });
  session: Session | null;
}

export const Job = ({ job, session, children }: PropsWithChildren<Props>) => {

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

        {children}

      </div>

    </section>
  );
};
