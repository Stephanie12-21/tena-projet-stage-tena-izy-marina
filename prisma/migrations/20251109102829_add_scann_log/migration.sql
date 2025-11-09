-- CreateEnum
CREATE TYPE "ScanType" AS ENUM ('BOARDING', 'DROPOFF');

-- CreateTable
CREATE TABLE "ScanLog" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "busId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "type" "ScanType" NOT NULL,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScanLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScanLog" ADD CONSTRAINT "ScanLog_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanLog" ADD CONSTRAINT "ScanLog_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanLog" ADD CONSTRAINT "ScanLog_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
