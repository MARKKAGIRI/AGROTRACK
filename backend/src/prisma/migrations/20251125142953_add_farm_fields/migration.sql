-- AlterTable
ALTER TABLE "public"."Farm" ADD COLUMN     "crops" JSONB,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "unit" TEXT;
