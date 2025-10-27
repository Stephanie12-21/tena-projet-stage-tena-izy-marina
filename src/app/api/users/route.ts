import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // ✅ Récupération avec relations
    const allUsers = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        nom: true,
        prenom: true,
        createdAt: true,

        // Relations Parents
        children: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            adresse: true,
            homeLat: true,
            homeLong: true,
            school: {
              select: {
                id: true,
                nom: true,
                adresse: true,
                schoolLat: true,
                schoolLong: true,
              },
            },
            imageprofile: {
              select: {
                id: true,
                url: true,
              },
            },
          },
        },
        subscriptions: {
          select: {
            id: true,
            plan: true,
            status: true,
            stripeSubId: true,
            createdAt: true,
          },
        },

        // Relations Driver
        driverProfile: {
          select: {
            id: true,
            image: {
              select: {
                id: true,
                url: true,
              },
            },
            license: {
              select: {
                id: true,
                licenseNumber: true,
                licenseType: true,
                licenseExpiration: true,
                photoFront: true,
                photoBack: true,
              },
            },
          },
        },
      },
    });

    // ✅ Groupement par rôle
    return NextResponse.json({
      total: allUsers.length,
      admins: allUsers.filter((u) => u.role === "ADMIN"),
      parents: allUsers.filter((u) => u.role === "PARENT"),
      drivers: allUsers.filter((u) => u.role === "DRIVER"),
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
