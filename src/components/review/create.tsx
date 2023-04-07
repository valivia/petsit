import styles from "./review.module.scss";
import Prisma from "@prisma/client";

export const CreateReview = () => {

  return (
    <form>
      <textarea name="review" id="review" cols={30} rows={10} />
      <input type="submit" value="Submit" />
    </form>
  );
};
