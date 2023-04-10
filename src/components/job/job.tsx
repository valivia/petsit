import styles from "./job.module.scss";
import Prisma, { RateType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillCreditCardFill } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { formatDate } from "@/lib/formatDate";
import { Editable } from "@/types/editable";
import { ModifyJob } from "./modify";
import { Edit } from "../layout/editButton";

interface JobProps extends Editable {
  job: (Prisma.Job & { pets: Prisma.Pet[]; })
}

export const Job = ({ job, editable }: JobProps) => {

  const convertDate = (d: Date) => {
    return (new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
  }

  return (
    <Link href={`/job/${job.id}`} className={styles.wrapper}>
      <article key={job.id} className={styles.main}>

        {editable &&
          <Edit title="Edit Job">
            <ModifyJob defaultValues={JSON.parse(JSON.stringify({
              ...job,
              startDate: convertDate(job.startDate),
              endDate: job.endDate ? convertDate(job.endDate) : null,
            }))} />
          </Edit>
        }

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
                src={`/avatars/${pet.avatar ?? "default.jpg"}`}
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
