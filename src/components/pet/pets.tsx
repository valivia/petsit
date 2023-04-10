import styles from "./pets.module.scss";
import Prisma from "@prisma/client";
import { Pet } from "@components/pet/pet";
import { Section } from "../layout/section";
import { ModifyPet } from "./modify";
import { Editable } from "@/types/editable";


interface Props extends Editable {
  pets: Prisma.Pet[];
}

export const Pets = ({ pets, editable }: Props) => {

  return (
    <Section
      title="Pets"
      editable={editable}
      addComponent={<ModifyPet />}
      modalTitle="Add Pet"
    >
      <ul className={styles.pets}>
        {pets.map((pet) => <Pet key={pet.id} pet={pet} editable={editable} />)}
      </ul>
    </Section>
  );
}
