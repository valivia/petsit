import styles from "./page.module.scss";
import { prisma } from "@/lib/prisma";


export default async function Page() {
  return (
    <main className={styles.main}>
    </main >
  );
}
