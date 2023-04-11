import styles from "./pet.module.scss";
import Image from "next/image";
import Prisma from "@prisma/client";
import { BiDna, BiCake } from "react-icons/bi";
import { formatDate } from "@/lib/formatDate";
import { Edit } from "../layout/editButton";
import { asSyncComponent } from "@/lib/async";
import { Editable } from "@/types/editable";
import { ModifyPet } from "./modify";
import moment from "moment";

interface Props extends Editable {
  pet: Prisma.Pet;
}

export const Pet = asSyncComponent(async ({ pet, editable }: Props) => {

  return (
    <article key={pet.id} className={styles.main}>

      {/* Icons */}
      <div className={styles.header}>

        <figure className={styles.avatar}>
          <Image src={`/avatars/${pet.avatar ?? "default.jpg"}`} alt="" fill />
        </figure>

        <h2 className={styles.title}>{pet.name}</h2>

      </div>

      {/* Content */}
      <div className={styles.content}>

        {editable &&
          <Edit title="Edit Pet">
            <ModifyPet defaultValues={JSON.parse(JSON.stringify({ ...pet, birthDate: pet.birthDate?.toLocaleDateString('en-CA') }))} />
          </Edit>
        }

        <div className={styles.info}>
          <p><BiDna /> {pet.breed ?? pet.type}</p>
          {pet.birthDate && <p><BiCake /> {moment(pet.birthDate).format("DD/MM/YYYY")}</p>}
        </div>

        <div className={styles.bio}>
          <p>{pet.bio?.substring(0, 96)}</p>
        </div>

      </div>

    </article>
  );
}
);
