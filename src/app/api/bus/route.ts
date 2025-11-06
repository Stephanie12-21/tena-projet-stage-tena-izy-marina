import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bus = await prisma.bus.findMany({
      include: {
        driver: {
          include: {
            driverProfile: true,
          },
        },
      },
    });
    return NextResponse.json(bus);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
