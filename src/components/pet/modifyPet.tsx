import Prisma from "@prisma/client";

interface Props {
  pet: Prisma.Pet;
}

export const modifyPet = ({ pet }: Props) => {
  return (
    <form>

    </form>
  );
};
