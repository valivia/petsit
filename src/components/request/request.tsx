"use client"
import styles from "./request.module.scss";
import Prisma from "@prisma/client";
import { Editable } from "@/types/editable";
import { getDisplayName } from "@/lib/getDisplayName";

import { ImCheckmark, ImCross } from "react-icons/im";
import { useRouter } from "next/navigation";
import Link from "next/link";
import moment from "moment";

interface Props extends Editable {
  request: Prisma.Request & {
    user: Prisma.User;
    job: Prisma.Job & { author: Prisma.User }
  }
}

export const Request = ({ request, editable }: Props) => {
  const router = useRouter();

  const deleteRequest = async () => {
    const data = await fetch(`/api/request/${request.id}`, {
      method: "DELETE"
    });

    if (data.ok) {
      alert("Request deleted");
      router.refresh();
    }

  };

  const acceptRequest = async () => {
    const data = await fetch(`/api/request/${request.id}`, {
      method: "PUT"
    });

    if (data.ok) {
      alert("Request accepted");
      router.refresh();
    }
  };


  return (
    <li className={styles.main}>
      <table className={styles.info}>
        <tbody>

          <tr>
            <th>Job:</th>
            <td>
              <Link href={`/job/${request.job.id}`} >
                {request.job.title}
              </Link>
            </td>
          </tr>

          {editable ?
            <tr>
              <th>From:</th>
              <td>
                <Link href={`/user/${request.user.id}`} >
                  {getDisplayName(request.user)}
                </Link>
              </td>
            </tr>
            :
            <tr>
              <th>To:</th>
              <td>
                <Link href={`/user/${request.job.authorId}`} >
                  {getDisplayName(request.job.author)}
                </Link>
              </td>
            </tr>
          }

          <tr>
            <th>When:</th>
            <td>{moment(request.createdAt).fromNow()}</td>
          </tr>


        </tbody>
      </table>

      <section className={styles.controls}>
        <button className={styles.reject} onClick={deleteRequest} ><ImCross /></button>

        {editable &&
          <button className={styles.accept} onClick={acceptRequest} ><ImCheckmark /></button>
        }
      </section>
    </li>
  );
};
