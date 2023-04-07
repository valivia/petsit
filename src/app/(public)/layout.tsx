import { getServerSession } from "next-auth";
import styles from "./layout.module.scss";
import type { Metadata } from "next/types";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.main}>
      <Nav session={session} />
      {children}
      <Footer />
    </div>
  );
}

export const metadata: Metadata = {
  title: "petsit",
  description: "",
};
