import styles from "./pets.module.scss";
import Prisma from "@prisma/client";
import { Pet } from "@components/pet/pet";

export const Pets = ({ pets }: { pets: Prisma.Pet[] }) => {
  return (
    <section className={styles.main}>
      <h1 className={styles.title}>Pets</h1>
      <ul className={styles.pets}>
        {pets.map((pet) => <Pet pet={pet} />)}
      </ul>
    </section>
  );
};
