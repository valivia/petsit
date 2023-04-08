import styles from "./pets.module.scss";
import Prisma from "@prisma/client";
import { Pet } from "@components/pet/pet";
import { Section } from "../layout/section";
import { AddPet } from "./addPet";
import { Session } from "next-auth";


interface Props {
  pets: Prisma.Pet[];
  user: Prisma.User;
  session: Session | null;
}

export const Pets = ({ pets, user, session }: Props) => {
  const isAllowed = session?.user?.id === user.id;

  return (
    <Section
      title="Pets"
      isAllowed={isAllowed}
      addComponent={<AddPet userId={session?.user?.id} />}
      modalTitle="Add Pet"
    >
      <ul className={styles.pets}>
        {pets.map((pet) => <Pet key={pet.id} pet={pet} />)}
      </ul>
    </Section>
  );
}
