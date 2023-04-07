import { getServerSession } from "next-auth";
import styles from "./section.module.scss";
import { PropsWithChildren } from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { asSyncComponent } from "@/lib/async";


interface Props {
  title: string;
  addComponent?: JSX.Element;
  isAllowed?: boolean;
}


export const Section = asSyncComponent(
  async ({ title, addComponent, isAllowed, children }: PropsWithChildren<Props>) => {

    return (
      <section className={styles.main}>

        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          {addComponent && isAllowed && <button className={styles.add}>+</button>}
        </div>

        {children}
      </section>
    );
  }
);
