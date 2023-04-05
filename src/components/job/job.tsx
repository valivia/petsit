import styles from "./job.module.scss";
import Prisma, { RateType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillCreditCardFill } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { formatDate } from "@/lib/formatDate";

interface JobProps {
  job: (Prisma.Job & { pets: Prisma.Pet[]; })
}

export const Job = ({ job }: JobProps) => {

  return (
    <Link href={`/job/${job.id}`} className={styles.wrapper}>
      <article key={job.id} className={styles.main}>

        <section className={styles.info}>
          <h1>{job.title}</h1>
          <p><BiTask /> {job.type.toLocaleLowerCase()}</p>
          <p><BsFillCreditCardFill /> €{job.rate} {job.rateType.toLowerCase()}</p>
          <p><FaMapMarkerAlt /> {job.location}</p>
          <p><BsCalendarDate /> {formatDate(job.startDate)} {job.endDate ? `- ${formatDate(job.endDate)}` : ""}</p>
        </section>

        <section className={styles.pets}>
          {job.pets.map(pet => (
            <div key={pet.id} className={styles.pet}>
              <Image
                src="https://cdn.discordapp.com/attachments/798915150445936750/1091780827467219025/PXL_20230331_131839568.PORTRAIT.jpg"
                alt={pet.name}
                fill
              />
            </div>
          ))}
        </section>

      </article>
    </Link>
  );
};