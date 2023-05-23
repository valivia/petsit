"use client"
import Image from "next/image";
import styles from "./item.module.scss";
import { BsTrash } from "react-icons/bs";
import { useSession } from "next-auth/react";

interface Props {
  id: string;
  author: string;
}

export const Item = ({ id, author }: Props) => {
  const session = useSession();

  const deleteAsset = async () => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    const response = await fetch(`/api/asset/${id}`, { method: "DELETE" });
    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <div className={styles.item}>
      <Image src={`${process.env.NEXT_PUBLIC_URL}/assets/${id}`} alt="" fill />

      {session.data?.user.id === author &&
        <button
          className={styles.delete}
          onClick={deleteAsset}
        >
          <BsTrash />
        </button>
      }
    </div>
  );
};
