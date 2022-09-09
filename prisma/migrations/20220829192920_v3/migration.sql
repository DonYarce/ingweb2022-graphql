/*
  Warnings:

  - You are about to drop the column `idRestaurant` on the `Headquarter` table. All the data in the column will be lost.
  - You are about to drop the column `idTable` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `idHeadquarter` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `idHeadquarter` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `idRole` on the `User` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `Headquarter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headQuarterId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headQuarterId` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Headquarter" DROP CONSTRAINT "Headquarter_idRestaurant_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_idTable_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_idHeadquarter_fkey";

-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_idHeadquarter_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_idRole_fkey";

-- AlterTable
ALTER TABLE "Headquarter" DROP COLUMN "idRestaurant",
ADD COLUMN     "restaurantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "idTable",
DROP COLUMN "idUser",
ADD COLUMN     "tableId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "idUser",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "idHeadquarter",
ADD COLUMN     "headQuarterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "idHeadquarter",
ADD COLUMN     "headQuarterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "idRole",
ADD COLUMN     "roleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_headQuarterId_fkey" FOREIGN KEY ("headQuarterId") REFERENCES "Headquarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Headquarter" ADD CONSTRAINT "Headquarter_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_headQuarterId_fkey" FOREIGN KEY ("headQuarterId") REFERENCES "Headquarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
