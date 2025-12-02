/*
  Warnings:

  - A unique constraint covering the columns `[licenseNumber]` on the table `DriverLicense` will be added. If there are existing duplicate values, this will fail.
  - Made the column `licenseId` on table `DriverProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DriverProfile" DROP CONSTRAINT "DriverProfile_licenseId_fkey";

-- AlterTable
ALTER TABLE "DriverProfile" ALTER COLUMN "licenseId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DriverLicense_licenseNumber_key" ON "DriverLicense"("licenseNumber");

-- AddForeignKey
ALTER TABLE "DriverProfile" ADD CONSTRAINT "DriverProfile_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "DriverLicense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
