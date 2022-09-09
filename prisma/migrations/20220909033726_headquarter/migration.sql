/*
  Warnings:

  - You are about to drop the column `headQuarterId` on the `Table` table. All the data in the column will be lost.
  - Added the required column `headquarterId` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_headQuarterId_fkey";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "headQuarterId",
ADD COLUMN     "headquarterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_headquarterId_fkey" FOREIGN KEY ("headquarterId") REFERENCES "Headquarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
