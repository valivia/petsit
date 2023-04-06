"use client"
import styles from "./createRequest.module.scss";
import Prisma from "@prisma/client";

interface DetailProps {
  id: string
}

export const CreateRequest = ({ id }: DetailProps) => {

  const request = async () => {
    const response = await fetch("/api/request", {
      method: "POST",
      body: JSON.stringify({ jobId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };


  return (
    <button className={styles.button} onClick={request}>Request</button>
  );
};
