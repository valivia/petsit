import styles from "./gallery.module.scss";
import Prisma from "@prisma/client";
import { Item } from "./item";

interface Props {
  assets: Prisma.Asset[];
}

export const Gallery = ({ assets }: Props) => {

  return (
    <div className={styles.main}>
      {assets.map((asset) => <Item key={asset.id} id={asset.id} author={asset.userId} />)}
    </div>
  );
};
