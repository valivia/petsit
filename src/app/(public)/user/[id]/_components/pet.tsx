import styles from "./pet.module.scss";
import Image from "next/image";
import Prisma from "@prisma/client";

export const Pet = ({ pet }: { pet: Prisma.Pet }) => {
  return (
    <article key={pet.id} className={styles.main}>

      <div className={styles.icons}>

        <div></div>

        <figure className={styles.avatar}>
          <Image src="https://cdn.discordapp.com/attachments/798915150445936750/1091780827467219025/PXL_20230331_131839568.PORTRAIT.jpg" alt="" fill />
        </figure>

        <div></div>

      </div>

      <div className={styles.info}>
        <h2>{pet.name}</h2>
      </div>

    </article>
  );
};
