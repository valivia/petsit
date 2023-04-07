import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session, getServerSession } from "next-auth";
import styles from "./reviews.module.scss";
import Prisma from "@prisma/client";
import { Review } from "./review";
import { CreateReview } from "./create";

interface Props {
  reviews: (Prisma.Review & { author: Prisma.User[]; })[];
  session: Session;
}

export const Reviews = ({ reviews, session }: Props) => {

  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Reviews</h2>

      <CreateReview />

      <div className={styles.reviews}>
        {reviews.map((review) => <Review review={review} />)}
      </div>
    </section>
  );
};
