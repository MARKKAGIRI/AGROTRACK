/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Advice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Activity" DROP CONSTRAINT "Activity_cropId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Advice" DROP CONSTRAINT "Advice_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "dueDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "status" SET DEFAULT 'pending';

-- DropTable
DROP TABLE "public"."Activity";

-- DropTable
DROP TABLE "public"."Advice";
