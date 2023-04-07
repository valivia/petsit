import styles from "./pets.module.scss";
import Prisma from "@prisma/client";
import { Pet } from "@components/pet/pet";
import { Section } from "../layout/section";

export const Pets = ({ pets }: { pets: Prisma.Pet[] }) => {
  return (
    <Section title="Pets">
      <ul className={styles.pets}>
        {pets.map((pet) => <Pet key={pet.id} pet={pet} />)}
      </ul>
    </Section>
  );
};
