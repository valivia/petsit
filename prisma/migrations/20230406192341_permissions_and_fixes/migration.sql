/*
  Warnings:

  - You are about to drop the column `petId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Job` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,jobId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Asset` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `authorId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_petId_fkey";

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_userId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_userId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "petId",
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Request_userId_jobId_key" ON "Request"("userId", "jobId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
