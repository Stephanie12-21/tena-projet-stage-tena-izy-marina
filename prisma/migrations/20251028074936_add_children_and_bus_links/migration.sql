/*
  Warnings:

  - Added the required column `updatedAt` to the `Children` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Children" ADD COLUMN     "busId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
