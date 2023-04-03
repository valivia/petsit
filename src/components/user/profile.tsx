import styles from "./profile.module.scss";
import Image from "next/image";
import Prisma from "@prisma/client";

export const Profile = ({ user }: { user: Prisma.User }) => {
  // Name
  let name = user.firstName;
  if (user.lastName) name += ` ${user.lastName}`;
  if (!name) name = user.name || user.id;

  return (
    <section className={styles.main}>

      <div className={styles.avatar}>
        <Image src={user.image || "TODO"} alt="Profile Picture" fill />
      </div>

      <section className={styles.info}>
        <h2>{name}</h2>
        <p>{user.bio ?? "No description provided"}</p>
      </section>


    </section>
  );
};
