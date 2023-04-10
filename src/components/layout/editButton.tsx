"use client";
import styles from "./editButton.module.scss";
import { PropsWithChildren, useState } from "react";
import { Modal } from "./modal";
import { FiEdit } from "react-icons/fi"

interface Props {
  title: string;
}


export const Edit = ({ title, children }: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      <button className={styles.main} onClick={onClick}><FiEdit /></button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
        {children}
      </Modal>
    </>
  );
}
