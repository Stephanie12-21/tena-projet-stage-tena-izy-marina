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
        { error: "Utilisateur ID manquant" },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { id },
      include: {
        driverProfile: {
          include: {
            license: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
