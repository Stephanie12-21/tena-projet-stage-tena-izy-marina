-- CreateTable
CREATE TABLE "Anomaly" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "childId" TEXT NOT NULL,
    "busId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anomaly_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Anomaly" ADD CONSTRAINT "Anomaly_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anomaly" ADD CONSTRAINT "Anomaly_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anomaly" ADD CONSTRAINT "Anomaly_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
