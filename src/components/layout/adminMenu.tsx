"use client";
import styles from "./adminMenu.module.scss";
import { PropsWithChildren, useState } from "react";
import { Modal } from "./modal";
import { Session } from "next-auth";
import { Role } from "@prisma/client";

interface Props {
  title: string;
  session: Session | null;
}


export const AdminButton = ({ children, title, session }: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false);

  if (session?.user.role !== Role.ADMIN) return null;

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
        {children}
      </Modal>

      <button
        onClick={() => setIsOpen(true)}
        className={styles.button}
      >
        Admin
      </button>

    </>
  );
}
