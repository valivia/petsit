import styles from "./requests.module.scss";
import Prisma from "@prisma/client";
import { Editable } from "@/types/editable";
import { Request } from "@/components/request/request";

interface Props extends Editable {
  requests: (Prisma.Request & {
    user: Prisma.User;
    job: Prisma.Job & { author: Prisma.User }
  })[]
}

export const Requests = ({ requests, editable }: Props) => {

  return (
    <section className={styles.main}>
      <h2>{editable ? "Requests received:" : "Requests Sent:"}</h2>
      <ul className={styles.requests}>
        {requests.map((request) => <Request key={request.id} request={JSON.parse(JSON.stringify(request))} editable={editable} />)}
      </ul>
    </section>
  );
};
