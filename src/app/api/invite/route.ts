import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASSWORD!;
const SMTP_HOST = process.env.SMTP_HOST!;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465");

export async function POST(req: Request) {
  try {
    const { email, adminId } = await req.json();

    if (!email || !adminId) {
      return NextResponse.json(
        { error: "Email ou ID de l'admin manquant" },
        { status: 400 }
      );
    }

    // Vérifier que l'admin existe et a le rôle ADMIN
    const admin = await prisma.users.findUnique({
      where: { id: adminId },
      select: { nom: true, prenom: true, role: true },
    });

    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin non autorisé" },
        { status: 403 }
      );
    }

    // Créer le token JWT pour l'invitation
    const token = jwt.sign({ email, adminId }, JWT_SECRET, { expiresIn: "1h" });
    const inviteLink = `${process.env.NEXT_PUBLIC_SITE_URL}/register/as-driver?token=${token}`;

    // Configurer le transporteur mail
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `Plateforme Scolaire <${SMTP_USER}>`,
      to: email,
      subject: "Invitation à rejoindre la plateforme de transport scolaire",
      html: `
        <html>
          <body style="font-family:sans-serif;line-height:1.6;color:#333">
            <h2>Bonjour,</h2>
            <p>${admin.nom} ${admin.prenom} vous invite à rejoindre la plateforme de gestion de transport scolaire.</p>
            <p>Veuillez cliquer sur le lien ci-dessous pour créer votre compte chauffeur :</p>
            <p><a href="${inviteLink}" target="_blank">Créer mon compte</a></p>
            <p>Ce lien est valable pendant 1 heure.</p>
            <hr />
            <p>Plateforme de transport scolaire</p>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Invitation envoyée !",
    });
  } catch (error) {
    console.error("Erreur envoi email :", error);
    return NextResponse.json(
      { error: "Échec de l’envoi de l’email." },
      { status: 500 }
    );
  }
}
