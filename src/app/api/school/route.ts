import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const schools = await prisma.school.findMany();
    return NextResponse.json(schools);
  } catch (error) {
    console.error("Erreur lors de la récupération des écoles:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
