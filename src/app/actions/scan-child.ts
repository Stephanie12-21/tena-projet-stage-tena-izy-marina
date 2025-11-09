"use server";

import { prisma } from "@/lib/prisma";

export async function logChildScan(
  childId: string,
  driverId: string,
  type: "BOARDING" | "DROPOFF",
  lat?: number,
  long?: number
) {
  if (!childId || !driverId || !type)
    throw new Error("Champs requis manquants");

  const driver = await prisma.users.findUnique({
    where: { id: driverId },
    include: { buses: true },
  });

  if (!driver || driver.buses.length === 0)
    throw new Error("Bus non trouvé pour ce chauffeur");

  const busId = driver.buses[0].id;

  return await prisma.scanLog.create({
    data: { childId, driverId, busId, type, lat, long },
  });
}
