/*
  Warnings:

  - You are about to drop the column `status` on the `DriverLicense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DriverLicense" DROP COLUMN "status";

-- DropEnum
DROP TYPE "public"."DriverStatus";
