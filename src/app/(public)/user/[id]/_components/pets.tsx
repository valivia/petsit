import styles from "./pets.module.scss";
import Prisma from "@prisma/client";
import { Pet } from "./pet";

export const Pets = ({ pets }: { pets: Prisma.Pet[] }) => {
  return (
    <section className={styles.main}>
      <h2>Pets</h2>
      <ul className={styles.pets}>
        {pets.map((pet) => <Pet pet={pet} />)}
      </ul>
    </section>
  );
};
