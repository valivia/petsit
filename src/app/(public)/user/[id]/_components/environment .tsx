import Prisma from "@prisma/client";
import { Section } from "@/components/layout/section";
import { Gallery } from "@/components/gallery/gallery";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { asSyncComponent } from "@/lib/async";

interface Props {
  assets: Prisma.Asset[];
  user: Prisma.User;
}

export const Environment = asSyncComponent(
  async ({ assets, user }: Props) => {
    const session = await getServerSession(authOptions);
    const isAllowed = session?.user?.id === user.id;

    return (
      <Section title="Environment" addComponent={<div></div>} isAllowed={isAllowed}>
        {assets.length === 0 &&
          (isAllowed
            ? <p>You havent uploaded any pictures yet. Please consider uploading some so that others can see how comfy and pet friendly your place is!</p>
            : <p>this user has not uploaded any pictures yet.</p>
          )}
        <Gallery assets={assets} />
      </Section>
    );
  }
);
