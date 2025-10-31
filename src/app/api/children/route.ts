import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const children = await prisma.children.findMany({
      include: {
        school: true,
        imageprofile: true,
      },
    });
    return NextResponse.json(children);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
