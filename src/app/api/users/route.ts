import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET /api/users
export async function GET() {
  try {
    // Récupère tous les utilisateurs
    const allUsers = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        nom: true,
        prenom: true,
        createdAt: true,
      },
    });

    // Classe les utilisateurs selon leur rôle
    const adminUsers = allUsers.filter((u) => u.role === "ADMIN");
    const parentUsers = allUsers.filter((u) => u.role === "PARENT");
    const driverUsers = allUsers.filter((u) => u.role === "DRIVER");

    // Renvoie les résultats groupés
    return NextResponse.json({
      total: allUsers.length,
      admins: adminUsers,
      parents: parentUsers,
      drivers: driverUsers,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
