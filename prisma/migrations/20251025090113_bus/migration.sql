-- CreateEnum
CREATE TYPE "BusStatus" AS ENUM ('ACTIF', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "Bus" (
    "id" TEXT NOT NULL,
    "matricule" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "status" "BusStatus" NOT NULL DEFAULT 'ACTIF',
    "driverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bus_matricule_key" ON "Bus"("matricule");

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
