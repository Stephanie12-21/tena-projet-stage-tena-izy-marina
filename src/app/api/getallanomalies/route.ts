import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const anomalies = await prisma.anomaly.findMany({
      include: {
        driver: { select: { driverProfile: true } },
        bus: true,
        child: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(anomalies, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des anomalies :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
