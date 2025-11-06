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
      where: { id },
      include: {
        driver: {
          include: { driverProfile: true },
        },
      },
    });

    if (!bus)
      return NextResponse.json({ error: "Bus introuvable" }, { status: 404 });

    return NextResponse.json(bus);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { busId, childrenIds } = await req.json();

    if (!busId || !childrenIds || !Array.isArray(childrenIds)) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    // Vérifier le bus
    const bus = await prisma.bus.findUnique({
      where: { id: busId },
      include: { children: true },
    });

    if (!bus)
      return NextResponse.json({ error: "Bus non trouvé" }, { status: 404 });

    const availableSeats = bus.seats - bus.children.length;

    if (childrenIds.length > availableSeats) {
      return NextResponse.json(
        { error: "Pas assez de places disponibles" },
        { status: 400 }
      );
    }

    // Assignation des enfants
    await prisma.children.updateMany({
      where: { id: { in: childrenIds } },
      data: { busId: bus.id },
    });

    // Optionnel : mettre à jour un champ availableSeats dans le bus
    await prisma.bus.update({
      where: { id: bus.id },
      data: { seats: availableSeats - childrenIds.length },
    });

    return NextResponse.json({ success: true, assigned: childrenIds.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
