import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/scan-logs?driverId=xxx&childId=yyy
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const driverId = searchParams.get("driverId");
    const childId = searchParams.get("childId");

    if (!driverId) {
      return NextResponse.json(
        { error: "driverId est requis" },
        { status: 400 }
      );
    }

    // Requête Prisma
    const logs = await prisma.scanLog.findMany({
      where: {
        driverId,
        ...(childId ? { childId } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        child: true,
        bus: true,
      },
    });

    return NextResponse.json({ logs });
  } catch (err: unknown) {
    console.error(err);
    let message = "Erreur serveur";
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
