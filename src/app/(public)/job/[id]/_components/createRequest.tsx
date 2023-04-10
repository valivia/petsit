"use client"
import styles from "./createRequest.module.scss";
import { useRouter } from "next/navigation";

interface DetailProps {
  id: string
  disabled?: boolean
}

export const CreateRequest = ({ id, disabled }: DetailProps) => {
  const router = useRouter();

  const request = async () => {
    const response = await fetch("/api/request", {
      method: "POST",
      body: JSON.stringify({ jobId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Request sent");
      router.refresh()
    } else {
      alert("Request failed");
    }

  };


  return (
    <button disabled={disabled} className={styles.button} onClick={request}>Request</button>
  );
};
