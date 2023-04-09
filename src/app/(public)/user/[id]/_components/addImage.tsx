"use client"
import form from "@styles/form.module.scss";
import { useRouter } from "next/navigation";

export const AddImage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData(e.currentTarget);
    const response = await fetch(`/api/asset`, {
      method: "POST",
      body,
    });

    if (response.ok) {
      router.refresh()
    } else {
      alert("Error uploading image");
    }
  };


  return (
    <form className={form.main} onSubmit={onSubmit}>
      <input type="file" name="image" accept="image/*" />
      <input type="submit" value="Submit" />
    </form>
  );
}
