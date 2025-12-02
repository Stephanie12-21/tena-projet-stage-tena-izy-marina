-- DropForeignKey
ALTER TABLE "DriverProfile" DROP CONSTRAINT "DriverProfile_licenseId_fkey";

-- AlterTable
ALTER TABLE "DriverProfile" ALTER COLUMN "licenseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DriverProfile" ADD CONSTRAINT "DriverProfile_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "DriverLicense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
