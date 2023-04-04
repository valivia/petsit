/*
  Warnings:

  - You are about to drop the column `body` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "body",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "breed" TEXT;
