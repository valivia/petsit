import { formatDate } from "@/lib/formatDate";
import styles from "./details.module.scss";
import Prisma from "@prisma/client";

interface DetailProps {
  job: Prisma.Job;
}

export const Details = ({ job }: DetailProps) => {

  const hours =
    job.startDate && job.endDate
      ? Math.round((job.endDate.getTime() - job.startDate.getTime()) / 1000 / 60 / 60)
      : 0;

  return (
    <table className={styles.main}>
      <tbody>

        {/* Rate */}
        {job.rate &&
          <tr>
            <th>Rate</th>
            <td>€{job.rate} ({job.rateType.toLocaleLowerCase()})</td>
          </tr>
        }

        {/* Duration */}
        {job.startDate && job.endDate &&
          <tr>
            <th>Duration</th>
            <td>{hours} hours</td>
          </tr>
        }

        <tr>
          <th>Location</th>
          <td>{job.location}</td>
        </tr>

        {/* Date */}
        {job.startDate &&
          <tr>
            <th>Start Date</th>
            <td>{formatDate(job.startDate)}</td>
          </tr>
        }

      </tbody>
    </table>
  );
};
