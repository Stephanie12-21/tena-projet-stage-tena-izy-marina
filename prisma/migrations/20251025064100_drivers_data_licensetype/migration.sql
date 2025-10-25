/*
  Warnings:

  - Changed the type of `licenseType` on the `DriverLicense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- AlterTable
ALTER TABLE "DriverLicense" DROP COLUMN "licenseType",
ADD COLUMN     "licenseType" "LicenseType" NOT NULL;
