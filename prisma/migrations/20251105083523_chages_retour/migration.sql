/*
  Warnings:

  - You are about to drop the column `depotId` on the `Bus` table. All the data in the column will be lost.
  - You are about to drop the column `stopId` on the `Children` table. All the data in the column will be lost.
  - You are about to drop the `Anomaly` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Depot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QRCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Route` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RouteAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScanEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Anomaly" DROP CONSTRAINT "Anomaly_busId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Anomaly" DROP CONSTRAINT "Anomaly_childId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Anomaly" DROP CONSTRAINT "Anomaly_driverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Anomaly" DROP CONSTRAINT "Anomaly_tripId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bus" DROP CONSTRAINT "Bus_depotId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Children" DROP CONSTRAINT "Children_stopId_fkey";

-- DropForeignKey
ALTER TABLE "public"."QRCode" DROP CONSTRAINT "QRCode_childId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RouteAssignment" DROP CONSTRAINT "RouteAssignment_busId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RouteAssignment" DROP CONSTRAINT "RouteAssignment_routeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScanEvent" DROP CONSTRAINT "ScanEvent_busId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScanEvent" DROP CONSTRAINT "ScanEvent_childId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScanEvent" DROP CONSTRAINT "ScanEvent_driverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScanEvent" DROP CONSTRAINT "ScanEvent_tripId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Stop" DROP CONSTRAINT "Stop_routeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_busId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_depotId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_driverId_fkey";

-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "depotId";

-- AlterTable
ALTER TABLE "Children" DROP COLUMN "stopId";

-- DropTable
DROP TABLE "public"."Anomaly";

-- DropTable
DROP TABLE "public"."Depot";

-- DropTable
DROP TABLE "public"."QRCode";

-- DropTable
DROP TABLE "public"."Route";

-- DropTable
DROP TABLE "public"."RouteAssignment";

-- DropTable
DROP TABLE "public"."ScanEvent";

-- DropTable
DROP TABLE "public"."Stop";

-- DropTable
DROP TABLE "public"."Trip";

-- DropEnum
DROP TYPE "public"."ScanType";

-- DropEnum
DROP TYPE "public"."TripStatus";
