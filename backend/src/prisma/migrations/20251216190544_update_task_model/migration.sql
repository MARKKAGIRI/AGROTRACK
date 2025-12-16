/*
  Warnings:

  - Added the required column `date` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_cropCycleId_fkey";

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Task_cropCycleId_idx" ON "public"."Task"("cropCycleId");

-- CreateIndex
CREATE INDEX "Task_date_idx" ON "public"."Task"("date");

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_cropCycleId_fkey" FOREIGN KEY ("cropCycleId") REFERENCES "public"."CropCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
