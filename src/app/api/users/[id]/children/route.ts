import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id)
    return NextResponse.json({ error: "Parent ID manquant" }, { status: 400 });

  try {
    const children = await prisma.children.findMany({
      where: { parentId: id },
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
