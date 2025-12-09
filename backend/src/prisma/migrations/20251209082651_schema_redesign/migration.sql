/*
  Warnings:

  - You are about to drop the column `cropName` on the `CropCycle` table. All the data in the column will be lost.
  - You are about to drop the column `cropId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `cropType` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `crops` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `cropId` on the `Revenue` table. All the data in the column will be lost.
  - You are about to drop the column `cropId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `cropId` to the `CropCycle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CropCycle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cropCycleId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cropCycleId` to the `Revenue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cropCycleId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_cropId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Revenue" DROP CONSTRAINT "Revenue_cropId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_cropId_fkey";

-- DropIndex
DROP INDEX "public"."Expense_cropId_idx";

-- DropIndex
DROP INDEX "public"."Revenue_cropId_idx";

-- AlterTable
ALTER TABLE "public"."CropCycle" DROP COLUMN "cropName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "cropId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'plantend';

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "cropId",
ADD COLUMN     "cropCycleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Farm" DROP COLUMN "cropType",
DROP COLUMN "crops";

-- AlterTable
ALTER TABLE "public"."Revenue" DROP COLUMN "cropId",
ADD COLUMN     "cropCycleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "cropId",
ADD COLUMN     "cropCycleId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Expense_cropCycleId_idx" ON "public"."Expense"("cropCycleId");

-- CreateIndex
CREATE INDEX "Revenue_cropCycleId_idx" ON "public"."Revenue"("cropCycleId");

-- AddForeignKey
ALTER TABLE "public"."CropCycle" ADD CONSTRAINT "CropCycle_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "public"."Crops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_cropCycleId_fkey" FOREIGN KEY ("cropCycleId") REFERENCES "public"."CropCycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_cropCycleId_fkey" FOREIGN KEY ("cropCycleId") REFERENCES "public"."CropCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Revenue" ADD CONSTRAINT "Revenue_cropCycleId_fkey" FOREIGN KEY ("cropCycleId") REFERENCES "public"."CropCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
