"use client"

import form from "@styles/form.module.scss"
import Prisma, { petType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"

interface Props {
  defaultValues?: Prisma.Pet;
}

export const ModifyPet = ({ defaultValues }: Props) => {
  const { register, handleSubmit } = useForm({ defaultValues });
  const router = useRouter();
  console.log({ defaultValues })

  const onSubmit = async (body: Record<string, unknown>) => {
    const response = await fetch(`/api/pet${defaultValues ? `/${defaultValues.id}` : ""}`, {
      method: defaultValues ? "PUT" : "POST",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      router.refresh();
      alert("pet info saved");
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  const uploadAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!defaultValues?.id) return alert("No pet selected");

    const body = new FormData(e.currentTarget);

    const response = await fetch(`/api/pet/${defaultValues.id}/avatar`, {
      method: "POST",
      body,
    });

    if (response.ok) {
      router.refresh();
      alert("Avatar uploaded");
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  const deleteEntry = async () => {

    if (!confirm("Are you sure you want to delete this pet from your profile?")) return;
    if (!defaultValues?.id) return alert("No pet selected");

    const response = await fetch(`/api/pet/${defaultValues.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };


  return (
    <>
      {defaultValues &&
        <form className={form.main} onSubmit={uploadAvatar}>
          <h2>avatar</h2>
          <input type="file" name="image" required />

          <button type="submit">Upload</button>
        </form>
      }

      <form className={form.main} onSubmit={handleSubmit(onSubmit)}>
        <h2>Info</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          {...register("name", { required: true })}
        />

        <label htmlFor="bio">Bio</label>
        <textarea
          {...register("bio", { required: true })}
        />

        <label htmlFor="birthDate">Birth Date</label>
        <input
          type="date"
          {...register("birthDate", { valueAsDate: true, required: true })}
        />

        <label htmlFor="type">Animal Type</label>
        <select {...register("type")} >
          {Object.keys(petType).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>

        <label htmlFor="breed">Breed</label>
        <input type="text" {...register("breed")} />

        <button type="submit">{defaultValues ? "Update" : "Add"}</button>
        {defaultValues &&
          <button type="button" onClick={deleteEntry}>Delete</button>
        }

      </form>
    </>
  );
}
