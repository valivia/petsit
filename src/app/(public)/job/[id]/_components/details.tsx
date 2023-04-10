import { formatDate } from "@/lib/formatDate";
import styles from "./details.module.scss";
import Prisma from "@prisma/client";
import { formatJobType } from "@/lib/formatJobType";
import moment, { duration } from "moment";

interface DetailProps {
  job: Prisma.Job;
}

export const Details = ({ job }: DetailProps) => {



  return (
    <table className={styles.main}>
      <tbody>

        {/* Type */}
        <tr>
          <th>Type</th>
          <td>{formatJobType(job.type)}</td>
        </tr>

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
            <td>{duration(moment(job.endDate).diff(moment(job.startDate))).humanize()}</td>
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
