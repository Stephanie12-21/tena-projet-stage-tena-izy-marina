import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        parent: true,
        children: true,
      },
    });
    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error("Erreur lors de la récupération des abonnements :", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
