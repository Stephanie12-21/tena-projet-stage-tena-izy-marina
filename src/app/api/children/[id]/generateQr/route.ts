// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import QRCode from "qrcode";

// export async function GET(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;

//   try {
//     const child = await prisma.children.findUnique({
//       where: { id: id },
//       include: {
//         parent: true,
//         school: true,
//         imageprofile: true,
//       },
//     });

//     if (!child) {
//       return NextResponse.json(
//         { error: "Enfant introuvable" },
//         { status: 404 }
//       );
//     }

//     // ✅ Crée une URL vers la page publique de l’enfant
//     const childUrl = `${process.env.NEXT_PUBLIC_SITE_URL_PHONE}/children/${child.id}`;

//     // Génère le QR code à partir de cette URL
//     const qrCode = await QRCode.toDataURL(childUrl, {
//       errorCorrectionLevel: "H",
//       type: "image/png",
//       width: 400,
//       margin: 2,
//       color: {
//         dark: "#000000",
//         light: "#ffffff",
//       },
//     });

//     return NextResponse.json({ qrCode });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Erreur lors de la génération du QR code" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const secret = process.env.JWT_SECRET;

  try {
    const child = await prisma.children.findUnique({
      where: { id },
      include: {
        parent: true,
        school: true,
      },
    });

    if (!child)
      return NextResponse.json(
        { error: "Enfant introuvable" },
        { status: 404 }
      );

    // ✅ Crée un token JWT valide 5 minutes
    const token = jwt.sign({ childId: child.id }, secret!, { expiresIn: "5m" });

    // URL contenant le token
    const urlWithToken = `${process.env.NEXT_PUBLIC_SITE_URL_PHONE}/children/${child.id}?token=${token}`;

    const qrCode = await QRCode.toDataURL(urlWithToken, {
      errorCorrectionLevel: "H",
      type: "image/png",
      width: 400,
      margin: 2,
      color: { dark: "#000", light: "#fff" },
    });

    return NextResponse.json({ qrCode });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur génération QR code" },
      { status: 500 }
    );
  }
}
