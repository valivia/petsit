/*
  Warnings:

  - You are about to drop the column `petId` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_petId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "petId";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "birthDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "_JobToPet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobToPet_AB_unique" ON "_JobToPet"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToPet_B_index" ON "_JobToPet"("B");

-- AddForeignKey
ALTER TABLE "_JobToPet" ADD CONSTRAINT "_JobToPet_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToPet" ADD CONSTRAINT "_JobToPet_B_fkey" FOREIGN KEY ("B") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
