import Prisma from "@prisma/client";

export function formatJobType(type: Prisma.JobType) {
  switch (type) {
    case Prisma.JobType.TRAIN:
      return "Training";
    case Prisma.JobType.SIT:
      return "Pet Sitting";
    case Prisma.JobType.WALK:
      return "Walking";
    case Prisma.JobType.BOARD:
      return "Boarding";
  }
}
