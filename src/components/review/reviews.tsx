import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session, getServerSession } from "next-auth";
import styles from "./reviews.module.scss";
import Prisma from "@prisma/client";
import { Review } from "./review";
import { CreateReview } from "./create";
import { Section } from "../layout/section";

interface Props {
  reviews: (Prisma.Review & {
    job: Prisma.Job & {
      author: Prisma.User;
    };
  })[]
}

export const Reviews = ({ reviews }: Props) => {

  return (
    <Section title="Reviews">
      <div className={styles.reviews}>
        {reviews.length > 0
          ? reviews.map((review) => <Review key={review.id} review={review} />)
          : <p>No reviews yet</p>
        }
      </div>
    </Section>
  );
};
