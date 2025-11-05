-- AlterTable
ALTER TABLE "Bus" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Children" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "DriverLicense" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "BusSchool" (
    "id" TEXT NOT NULL,
    "busId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "BusSchool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusSchool_busId_schoolId_key" ON "BusSchool"("busId", "schoolId");

-- AddForeignKey
ALTER TABLE "BusSchool" ADD CONSTRAINT "BusSchool_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusSchool" ADD CONSTRAINT "BusSchool_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
