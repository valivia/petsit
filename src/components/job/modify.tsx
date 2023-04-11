"use client"

import form from "@styles/form.module.scss"
import Prisma, { JobType, RateType, PetType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import useSWR from "swr";
import { fetcher } from "@/lib/swr";

interface Props {
  defaultValues?: Prisma.Job & { pets: Prisma.Pet[] };
}

export const ModifyJob = ({ defaultValues }: Props) => {
  const { register, handleSubmit, watch } = useForm({ defaultValues: { ...defaultValues, pets: defaultValues?.pets.map(x => x.id) } });
  const router = useRouter();
  const { data: pets, isLoading } = useSWR("/api/pet", fetcher);

  const onSubmit = async (body: Record<string, unknown>) => {
    const response = await fetch(`/api/job${defaultValues ? `/${defaultValues.id}` : ""}`, {
      method: defaultValues ? "PUT" : "POST",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      router.refresh();
      alert("Job saved");
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  const deleteEntry = async () => {

    if (!confirm("Are you sure you want to delete this job from your profile?")) return;
    if (!defaultValues?.id) return alert("No job selected");

    const response = await fetch(`/api/job/${defaultValues.id}`, {
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
    <form className={form.main} onSubmit={handleSubmit(onSubmit)}>

      <fieldset>
        <label htmlFor="title">title</label>
        <input
          type="text"
          {...register("title", { required: true })}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="description">description</label>
        <textarea
          {...register("description", { required: true })}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="notes">notes</label>
        <textarea
          {...register("notes", { required: true })}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="location">location</label>
        <input
          type="text"
          {...register("location", { required: true })}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="rate">rate</label>
        <input
          type="number"
          step="0.01"

          {...register("rate", { required: true })}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="rateType">Payment type</label>
        <select {...register("rateType")} >
          {Object.keys(RateType).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="datetime-local"
          {...register("startDate", { required: true })}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="endDate">End Date</label>
        <input
          type="datetime-local"
          {...register("endDate", {})}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="type">Job Type</label>
        <select {...register("type")} >
          {Object.keys(JobType).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <label htmlFor="pets">Pets</label>
        <select {...register("pets")} multiple>
          {pets?.map((pet: Prisma.Pet) => (
            <option key={pet.id} value={pet.id}>{pet.name}</option>
          ))}
        </select>
      </fieldset>

      <button type="submit">{defaultValues ? "Update" : "Add"}</button>
      {defaultValues &&
        <button type="button" onClick={deleteEntry}>Delete</button>
      }

    </form>
  );
}
