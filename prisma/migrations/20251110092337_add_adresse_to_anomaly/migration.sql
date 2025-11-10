/*
  Warnings:

  - Added the required column `adresse` to the `Anomaly` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Anomaly" ADD COLUMN     "adresse" TEXT NOT NULL;
