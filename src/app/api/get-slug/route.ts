import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email manquant" }, { status: 400 });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    if (!user.nom || !user.role) {
      return NextResponse.json(
        { error: "Nom ou rôle manquant pour l'utilisateur." },
        { status: 400 }
      );
    }

    // Crée un slug unique à partir du prénom + nom
    const slug = `${user?.prenom}-${user?.nom}`
      .toLowerCase()
      .replace(/\s+/g, "-");

    console.log("Réponse utilisateur envoyée :", {
      slug,
      role: user.role,
    });

    return NextResponse.json({
      slug,
      role: user.role,
    });
  } catch (error) {
    console.error("Erreur serveur dans get-slug:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
