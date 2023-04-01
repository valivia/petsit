import { getServerSession } from "next-auth";
import { Nav } from "./_layout/nav";
import styles from "./layout.module.scss";
import type { Metadata } from "next/types";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className={styles.main}>
      <Nav session={session} />
      {children}
      <footer>footer</footer>
    </div>
  );
}

export const metadata: Metadata = {
  title: "petsit",
  description: "",
};
