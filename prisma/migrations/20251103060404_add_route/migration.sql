-- DropForeignKey
ALTER TABLE "public"."Bus" DROP CONSTRAINT "Bus_driverId_fkey";

-- AlterTable
ALTER TABLE "Bus" ADD COLUMN     "depotLat" DOUBLE PRECISION,
ADD COLUMN     "depotLong" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "busId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pickupJson" JSONB NOT NULL,
    "dropJson" JSONB NOT NULL,
    "estimatedDistanceMeters" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
