/*
  Warnings:

  - You are about to drop the column `headQuarterId` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `headquarterId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_headQuarterId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "headQuarterId",
ADD COLUMN     "headquarterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_headquarterId_fkey" FOREIGN KEY ("headquarterId") REFERENCES "Headquarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
