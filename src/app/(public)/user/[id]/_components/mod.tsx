"use client"
import { useRouter } from "next/navigation";


interface Props {
  id: string;
}

export const Mod = ({ id }: Props) => {
  const router = useRouter();

  const ban = async () => {
    if (!confirm("Are you sure you want to ban this user?")) return;

    const response = await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("User successfully banned");
      router.push("/");
    } else {
      alert("Couldn't ban this user");
    }
  };


  return (
    <button onClick={ban}>Ban user</button>
  );
}
