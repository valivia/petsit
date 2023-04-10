"use client"

import form from "@styles/form.module.scss"
import Prisma, { JobType, RateType, petType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"

interface Props {
  defaultValues?: Prisma.Job;
}

export const ModifyJob = ({ defaultValues }: Props) => {
  const { register, handleSubmit } = useForm({ defaultValues });
  const router = useRouter();

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

      <label htmlFor="title">title</label>
      <input
        type="text"
        {...register("title", { required: true })}
      />

      <label htmlFor="description">description</label>
      <textarea
        {...register("description", { required: true })}
      />

      <label htmlFor="notes">notes</label>
      <textarea
        {...register("notes")}
      />

      <label htmlFor="location">location</label>
      <input
        type="text"
        {...register("location", { required: true })}
      />

      <label htmlFor="rate">rate</label>
      <input
        type="number"
        step="0.1"

        {...register("rate", { required: true })}
      />

      <label htmlFor="rateType">Payment type</label>
      <select {...register("rateType")} >
        {Object.keys(RateType).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>

      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        {...register("startDate", { valueAsDate: true, required: true })}
      />

      <label htmlFor="endDate">End Date</label>
      <input
        type="date"
        {...register("endDate", { valueAsDate: true })}
      />


      <label htmlFor="type">Job Type</label>
      <select {...register("type")} >
        {Object.keys(JobType).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>

      <button type="submit">{defaultValues ? "Update" : "Add"}</button>
      {defaultValues &&
        <button type="button" onClick={deleteEntry}>Delete</button>
      }

    </form>
  );
}
