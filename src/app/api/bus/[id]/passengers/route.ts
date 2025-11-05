import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "id manquant dans l'URL" },
      { status: 400 }
    );
  }

  try {
    // Vérifier que le bus existe
    const bus = await prisma.bus.findUnique({
      where: { id },
    });

    if (!bus) {
      return NextResponse.json({ error: "Bus non trouvé" }, { status: 404 });
    }

    // Récupérer les enfants assignés avec toutes les relations
    const children = await prisma.children.findMany({
      where: { busId: id },
      include: {
        school: true,
        imageprofile: true,
        parent: true,
      },
    });

    return NextResponse.json(children, { status: 200 });
  } catch (error) {
    console.error("Erreur API bus/[id]/children :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
