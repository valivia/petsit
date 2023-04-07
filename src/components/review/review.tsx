import styles from "./review.module.scss";
import Prisma from "@prisma/client";

interface Props {
  review: (Prisma.Review & { author: Prisma.User[]; })
}

export const Review = ({ review }: Props) => {

  return (
    <div>

    </div>
  );
};
