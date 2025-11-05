import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const children = await prisma.children.findMany({
      where: {
        busId: null,
        subscription: {
          status: "active",
        },
      },
      include: {
        school: true,
        imageprofile: true,
      },
    });

    return NextResponse.json({ children });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des enfants" },
      { status: 500 }
    );
  }
}
