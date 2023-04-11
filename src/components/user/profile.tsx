import styles from "./profile.module.scss";
import Image from "next/image";
import Prisma from "@prisma/client";
import { getDisplayName } from "@/lib/getDisplayName";
import Link from "next/link";

export const Profile = ({ user }: { user: Prisma.User }) => {
  const name = getDisplayName(user);

  return (
    <section className={styles.main}>

      <div className={styles.avatar}>
        <Image src={user.image || "TODO"} alt="Profile Picture" fill />
      </div>

      <section className={styles.info}>
        <h2>
          <Link href={`/user/${user.id}`}>{name}</Link>
        </h2>
        <p>{user.bio ?? "No description provided"}</p>
      </section>


    </section>
  );
};
