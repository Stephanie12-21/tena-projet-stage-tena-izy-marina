/*
  Warnings:

  - A unique constraint covering the columns `[imageprofileId]` on the table `Children` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageprofileId` to the `Children` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `Children` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Children" ADD COLUMN     "imageprofileId" TEXT NOT NULL,
ADD COLUMN     "schoolId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "schoolLat" DOUBLE PRECISION NOT NULL,
    "schoolLong" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Children_imageprofileId_key" ON "Children"("imageprofileId");

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_imageprofileId_fkey" FOREIGN KEY ("imageprofileId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
