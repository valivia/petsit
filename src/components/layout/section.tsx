"use client";
import styles from "./section.module.scss";
import { PropsWithChildren, useState } from "react";
import { asSyncComponent } from "@/lib/async";
import { Modal } from "./modal";


interface Props {
  title: string;
  modalTitle?: string;
  addComponent?: JSX.Element;
  isAllowed?: boolean;
}


export const Section = ({ title, addComponent, modalTitle, isAllowed, children }: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.main}>

      {addComponent &&
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={modalTitle}>
          {addComponent}
        </Modal>
      }

      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        {addComponent && isAllowed &&
          <button
            onClick={() => setIsOpen(true)}
            className={styles.add}
          >
            +
          </button>}
      </div>

      {children}
    </section>
  );
}
