"use client"

import styles from "./filteredJobs.module.scss";
import Prisma from "@prisma/client";
import { Job } from "@/components/job/job";
import { useEffect, useState } from "react";


type JobType = Prisma.Job & { pets: Prisma.Pet[]; }
interface JobProps {
  jobs: JobType[]
}

export const FilteredJobs = ({ jobs }: JobProps) => {
  const [petType, setPetType] = useState<Prisma.PetType | "all">("all");
  const [jobType, setJobType] = useState<Prisma.JobType | "all">("all");
  const [displayedJobs, setDisplayedJobs] = useState<JobType[]>(jobs);

  useEffect(() => {
    const items = jobs.filter((job) => {
      if (petType === "all" && jobType === "all") {
        return true;
      }

      if (petType === "all") {
        return job.type === jobType;
      }

      if (jobType === "all") {
        return job.pets.some((pet) => pet.type === petType);
      }

      return job.type === jobType && job.pets.some((pet) => pet.type === petType);
    });

    setDisplayedJobs(items);
  }, [petType, jobType]);


  return (
    <main className={styles.main}>

      <section className={styles.filters}>

        {/* PetType */}
        <div>
          <label htmlFor="PetType">Pet Type:</label>
          <select
            id="PetType"
            value={petType}
            onChange={(e) => setPetType(e.target.value as Prisma.PetType)}
          >
            <option value="all">All</option>
            <option value="DOG">Dog</option>
            <option value="CAT">Cat</option>
            <option value="BIRD">Bird</option>
          </select>
        </div>

        {/* JobType */}
        <div>
          <label htmlFor="JobType">Job Type:</label>
          <select
            id="JobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value as Prisma.JobType)}
          >
            <option value="all">All</option>
            <option value="WALK">Walk</option>
            <option value="SIT">Sit</option>
            <option value="BOARD">Board</option>
          </select>
        </div>

      </section>
      <ul className={styles.jobs}>
        {displayedJobs.map((job) => <Job key={`${job.id}_${displayedJobs.length}`} job={job} />)}
      </ul>
    </main>
  );
};
