"use client";
import styles from "./section.module.scss";
import { PropsWithChildren, useState } from "react";
import { asSyncComponent } from "@/lib/async";
import { Modal } from "./modal";
import { Editable } from "@/types/editable";


interface Props extends Editable {
  title: string;
  modalTitle?: string;
  addComponent?: JSX.Element;
}


export const Section = ({ title, addComponent, modalTitle, editable, children }: PropsWithChildren<Props>) => {
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
        {addComponent && editable &&
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
