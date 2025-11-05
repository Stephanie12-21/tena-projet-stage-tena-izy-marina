import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { childId, busId } = await req.json();

    if (!childId || !busId) {
      return NextResponse.json(
        { error: "childId et busId sont requis" },
        { status: 400 }
      );
    }

    const bus = await prisma.bus.findUnique({
      where: { id: busId },
      include: { children: true },
    });

    if (!bus)
      return NextResponse.json({ error: "Bus introuvable" }, { status: 404 });

    if (bus.children.length >= bus.seats) {
      return NextResponse.json({ error: "Bus complet" }, { status: 400 });
    }

    const updatedChild = await prisma.children.update({
      where: { id: childId },
      data: { busId },
      include: { bus: true },
    });

    return NextResponse.json({
      message: "Affectation réussie",
      child: updatedChild,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
