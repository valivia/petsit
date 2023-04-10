import styles from "./status.module.scss";
import { CreateRequest } from "@/app/(public)/job/[id]/_components/createRequest";
import Prisma from "@prisma/client";
import { Session } from "next-auth";

interface JobProps {
  job: (Prisma.Job & {
    requests: Prisma.Request[];
    author: Prisma.User;
    acceptedBy: Prisma.User | null;
  });
  session: Session | null;
}

export const Status = ({ job, session }: JobProps) => {

  // Job not open
  if (job.status !== Prisma.JobStatus.OPEN) {
    return (
      <section className={styles.main}>
        <p>Status: {job.status}</p>
      </section>
    );
  }

  const isOwner = session?.user?.id === job.author.id;


  // Get number of requests
  const filteredRequests = job.requests.filter((request) => request.userId !== session?.user.id);
  const requestSize = filteredRequests.length;
  const interested = requestSize > 0
    ? <p>{requestSize} {!isOwner && `other${requestSize > 1 ? "s" : ""}`} interested</p>
    : <p>No {job.requests.length > 0 ? "other" : ""} requests yet</p>


  // Own job
  if (!session || isOwner) return (
    <section className={styles.main}>
      {interested}
    </section>
  )

  let whyCantIRequest;

  if (job.requests.some((request) => request.userId === session?.user?.id)) {
    whyCantIRequest = "You have already made a request for this job"
  }

  return (
    <section className={styles.main}>

      <CreateRequest id={job.id} disabled={whyCantIRequest !== undefined} />
      {whyCantIRequest &&
        <p className={styles.cantRequest}>{whyCantIRequest}</p>
      }

      {interested}
    </section>
  );
};
