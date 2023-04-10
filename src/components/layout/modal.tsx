import styles from "./modal.module.scss";
import { PropsWithChildren, useState } from "react";
import ReactModal from "react-modal";
interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
}

ReactModal.setAppElement('#modals');

export const Modal = ({ children, isOpen, setIsOpen, title }: PropsWithChildren<Props>) => {

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    e.stopPropagation();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      className={styles.main}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <header className={styles.header}>
        <h1>{title}</h1>
        <button className={styles.close} onClick={() => setIsOpen(false)}>X</button>
      </header>
      <main onClick={onClick} className={styles.content}>
        {children}
      </main>
    </ReactModal>
  );
}
