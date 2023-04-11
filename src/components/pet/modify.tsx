"use client"

import form from "@styles/form.module.scss"
import Prisma, { PetType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"

interface Props {
  defaultValues?: Prisma.Pet;
}

export const ModifyPet = ({ defaultValues }: Props) => {
  const { register, handleSubmit, getValues } = useForm({ defaultValues });
  const router = useRouter();

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

    if (!confirm(`Are you sure you want to delete ${getValues("name")} from your profile?`)) return;
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

        <fieldset>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="bio">Bio</label>
          <textarea
            maxLength={96}
            {...register("bio", { required: true, maxLength: 96 })}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            {...register("birthDate", { valueAsDate: true, required: true })}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="type">Animal Type</label>
          <select {...register("type")} >
            {Object.keys(PetType).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="breed">Breed</label>
          <input type="text" {...register("breed")} />
        </fieldset>

        <button type="submit">{defaultValues ? "Update" : "Add"}</button>
        {defaultValues &&
          <button type="button" onClick={deleteEntry}>Delete</button>
        }

      </form>
    </>
  );
}
