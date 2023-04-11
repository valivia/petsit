"use client"
import { useRouter } from "next/navigation";


interface Props {
  id: string;
}

export const Mod = ({ id }: Props) => {
  const router = useRouter();

  const ban = async () => {
    if (!confirm("Are you sure you want to remove this job?")) return;

    const response = await fetch(`/api/job/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("job successfully removed");
      router.push("/");
    } else {
      alert("Couldn't remove this job");
    }
  };


  return (
    <button onClick={ban}>Remove Job</button>
  );
}
