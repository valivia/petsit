/*
  Warnings:

  - The values [PENDING,REJECTED] on the enum `JobStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `hourlyRate` on the `Job` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RateType" AS ENUM ('HOURLY', 'FLAT');

-- AlterEnum
BEGIN;
CREATE TYPE "JobStatus_new" AS ENUM ('OPEN', 'ACCEPTED', 'CANCELLED', 'COMPLETED');
ALTER TABLE "Job" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "status" TYPE "JobStatus_new" USING ("status"::text::"JobStatus_new");
ALTER TYPE "JobStatus" RENAME TO "JobStatus_old";
ALTER TYPE "JobStatus_new" RENAME TO "JobStatus";
DROP TYPE "JobStatus_old";
ALTER TABLE "Job" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "hourlyRate",
ADD COLUMN     "location" TEXT,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "rateType" "RateType" NOT NULL DEFAULT 'HOURLY',
ALTER COLUMN "status" SET DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "location" TEXT;
