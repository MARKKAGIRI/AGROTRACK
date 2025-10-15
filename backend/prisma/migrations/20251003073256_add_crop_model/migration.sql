-- CreateTable
CREATE TABLE "public"."Crop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stages" JSONB NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);
