import Prisma from "@prisma/client";
import { Section } from "@/components/layout/section";
import { Gallery } from "@/components/gallery/gallery";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { asSyncComponent } from "@/lib/async";
import { AddImage } from "./addImage";
import { Editable } from "@/types/editable";

interface Props extends Editable {
  assets: Prisma.Asset[];
}

export const Environment = asSyncComponent(
  async ({ assets, editable }: Props) => {

    return (
      <Section title="Environment" addComponent={<AddImage />} editable={editable}>
        {assets.length === 0 &&
          (editable
            ? <p>You havent uploaded any pictures yet. Please consider uploading some so that others can see how comfy and pet friendly your place is!</p>
            : <p>this user has not uploaded any pictures yet.</p>
          )}
        <Gallery assets={assets} />
      </Section>
    );
  }
);
