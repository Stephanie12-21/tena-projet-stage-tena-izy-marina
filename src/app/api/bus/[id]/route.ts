import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id)
    return NextResponse.json({ error: "bus ID manquant" }, { status: 400 });

  try {
    const bus = await prisma.bus.findUnique({
      where: { id: id },
      include: {
        driver: true,
      },
    });
    return NextResponse.json(bus);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
