"use client"
import { Modal } from "@/components/layout/modal";
import form from "@/styles/form.module.scss";
import styles from "./createReview.module.scss";
import Prisma from "@prisma/client";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { getDisplayName } from "@/lib/getDisplayName";

interface Props {
  job: (Prisma.Job & {
    requests: Prisma.Request[];
    author: Prisma.User;
    acceptedBy: Prisma.User | null;
  });
}

export const CreateReview = ({ job }: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const submit = async (data: any) => {
    const response = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({
        rating: data.rating,
        title: data.title,
        body: data.body,
        jobId: job.id,
      }),
    });

    if (response.ok) {
      reset()
      alert("Review created!");
      setIsOpen(false);
    } else {
      alert("Something went wrong");
    }

    return response;
  };

  return (
    <>
      <button
        className={styles.main}
        onClick={() => setIsOpen(true)}
      >
        Create Review
      </button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Create Review"
      >
        <form className={form.main} onSubmit={handleSubmit(submit)} >
          <p className={form.description}>
            Please leave a review for your petsitter {getDisplayName(job.acceptedBy!)}. so you will help other users find the best petsitter for their pets!.
          </p>
          <p className={form.notice}>
            (doing this will also close the job!!)
          </p>

          {/* Rating */}
          <fieldset>
            <label htmlFor="rating">Rating</label>
            <input type="number" min={0} max={5} {...register("rating", { min: 0, max: 5, valueAsNumber: true })} />
            <p className={form.error}>
              {errors.rating && "Rating must be between 0 and 5"}
            </p>
          </fieldset>

          {/* Title */}
          <fieldset>
            <label htmlFor="title">Title</label>
            <input type="text" {...register("title", { maxLength: 50 })} />
            <p className={form.error}>
              {errors.title && "Title must be less than 50 characters"}
            </p>
          </fieldset>

          {/* Comment */}
          <fieldset>
            <label htmlFor="body">Comment</label>
            <textarea {...register("body", { maxLength: 500 })} />
            <p className={form.error}>
              {errors.comment && "Comment must be less than 500 characters"}
            </p>
          </fieldset>



          <button type="submit">Submit</button>
        </form>
      </Modal>

    </>
  );
};
