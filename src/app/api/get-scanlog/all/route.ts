import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const logs = await prisma.scanLog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        child: {
          include: {
            imageprofile: true,
          },
        },
        bus: true,
        driver: true,
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
