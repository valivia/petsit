import styles from "./pet.module.scss";
import Image from "next/image";
import Prisma from "@prisma/client";
import { BiDna, BiCake } from "react-icons/bi";
import { formatDate } from "@/lib/formatDate";

export const Pet = ({ pet }: { pet: Prisma.Pet }) => {
  return (
    <article key={pet.id} className={styles.main}>

      {/* Icons */}
      <div className={styles.header}>

        <figure className={styles.avatar}>
          <Image src="https://cdn.discordapp.com/attachments/798915150445936750/1091780827467219025/PXL_20230331_131839568.PORTRAIT.jpg" alt="" fill />
        </figure>

        <h2 className={styles.title}>{pet.name}</h2>

      </div>

      {/* Content */}
      <div className={styles.content}>

        <div className={styles.info}>
          <p><BiDna /> {pet.breed}</p>
          {pet.birthDate && <p><BiCake /> {formatDate(pet.birthDate)}</p>}
        </div>

        <div className={styles.bio}>
          <p>{pet.bio?.substring(0, 128)}...</p>
        </div>

      </div>

    </article>
  );
};
