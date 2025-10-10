/*
  Warnings:

  - You are about to drop the `Parent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Parent";

-- CreateTable
CREATE TABLE "Children" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "homeLat" DOUBLE PRECISION NOT NULL,
    "homeLong" DOUBLE PRECISION NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "Children_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
