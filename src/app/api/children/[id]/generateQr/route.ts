import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "Child ID manquant" }, { status: 400 });
  }

  try {
    // Récupère l'enfant avec les relations
    const child = await prisma.children.findUnique({
      where: { id },
      include: {
        school: true,
        imageprofile: true,
        parent: true, // inclure les infos du parent
      },
    });

    if (!child) {
      return NextResponse.json({ error: "Enfant non trouvé" }, { status: 404 });
    }

    // Préparer les données à inclure dans le QR code
    const qrData = {
      id: child.id,
      nom: child.nom,
      prenom: child.prenom,
      adresse: child.adresse,
      homeLat: child.homeLat,
      homeLong: child.homeLong,
      school: {
        id: child.school.id,
        nom: child.school.nom,
        adresse: child.school.adresse,
        schoolLat: child.school.schoolLat,
        schoolLong: child.school.schoolLong,
      },
      imageprofile: {
        id: child.imageprofile.id,
        url: child.imageprofile.url,
      },
      parent: {
        id: child.parent.id,
        nom: child.parent.nom,
        prenom: child.parent.prenom,
        email: child.parent.email,
        phone: child.parent.phone,
        role: child.parent.role,
      },
    };

    // Générer le QR code en base64
    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
      errorCorrectionLevel: "H",
      type: "image/png",
      width: 300,
      margin: 2,
    });

    // Retourne l'image du QR code
    return NextResponse.json({ qrCode: qrCodeDataUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
