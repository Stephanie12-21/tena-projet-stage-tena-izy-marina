import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "ID du chauffeur manquant" },
        { status: 400 }
      );
    }

    // 🔹 Vérifie si le chauffeur existe et a le bon rôle
    const driver = await prisma.users.findUnique({
      where: { id },
      select: { id: true, nom: true, prenom: true, role: true },
    });

    if (!driver) {
      return NextResponse.json(
        { error: "Chauffeur non trouvé" },
        { status: 404 }
      );
    }

    if (driver.role !== "DRIVER") {
      return NextResponse.json(
        { error: "L'utilisateur n'est pas un chauffeur" },
        { status: 403 }
      );
    }

    // 🔹 Trouve le bus associé à ce chauffeur
    const bus = await prisma.bus.findFirst({
      where: { driverId: id },
      include: {
        driver: {
          select: { id: true, nom: true, prenom: true, email: true },
        },
        children: {
          include: {
            school: {
              select: { id: true, nom: true, adresse: true },
            },
            imageprofile: {
              select: { url: true },
            },
            parent: {
              select: { nom: true, prenom: true, phone: true },
            },
          },
        },
      },
    });

    if (!bus) {
      return NextResponse.json(
        { message: "Aucun bus assigné à ce chauffeur." },
        { status: 200 }
      );
    }

    return NextResponse.json({ driver, bus });
  } catch (error) {
    console.error("Erreur API /driver/[id]/bus :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
