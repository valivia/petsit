"use client"

import form from "@styles/form.module.scss"
import Prisma, { petType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"

interface Props {
  userId: string;
}

export const AddPet = ({ userId }: Props) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (body: Record<string, unknown>) => {
    const response = await fetch(`/api/pet`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      router.refresh();
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };


  return (
    <form className={form.main} onSubmit={handleSubmit(onSubmit)}>

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

      <input type="submit" />
    </form>
  );
}
