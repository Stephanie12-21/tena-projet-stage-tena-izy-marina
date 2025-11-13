// /api/stats/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [users, children, buses, schools] = await Promise.all([
      prisma.users.findMany(),
      prisma.children.findMany(),
      prisma.bus.findMany(),
      prisma.school.findMany(),
    ]);

    const drivers = users.filter((u) => u.role === "DRIVER");

    return NextResponse.json({
      totalUsers: users.length,
      totalDrivers: drivers.length,
      totalChildren: children.length,
      totalBuses: buses.length,
      totalSchools: schools.length,
    });
  } catch (error) {
    console.error("Erreur lors du chargement des stats:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
