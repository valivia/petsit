import { getDisplayName } from "@/lib/getDisplayName";
import styles from "./review.module.scss";
import Prisma from "@prisma/client";
import Link from "next/link";
import moment from "moment";
import { Route } from "next";
import { formatJobType } from "@/lib/formatJobType";

interface Props {
  review: (Prisma.Review & {
    job: Prisma.Job & {
      author: Prisma.User;
    };
  })
}

export const Review = ({ review }: Props) => {

  return (
    <article className={styles.main}>
      <header className={styles.header}>
        <h2 className={styles.title}>{review.title}</h2>
        <p className={styles.rating}>{review.rating}/5</p>
        <p className={styles.author}>
          <Link href={`/user/${review.job.author.id}` as Route}>
            By {getDisplayName(review.job.author)}
          </Link> - {moment(review.createdAt).fromNow()}
        </p>
      </header>

      <p className={styles.body}>{review.body}</p>

      <p className={styles.job}>
        <Link href={`/job/${review.job.id}`}>
          {review.job.title} - {formatJobType(review.job.type)}
        </Link>
      </p>
    </article>
  );
};
