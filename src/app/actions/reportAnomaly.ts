"use server";

import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendMail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

/**
 * Signaler une anomalie survenue pendant la route
 */
export async function reportAnomaly(
  driverId: string,
  busId: string,
  childId: string,
  description: string
) {
  if (!driverId || !busId || !childId || !description) {
    throw new Error("Tous les champs sont requis");
  }

  // Vérification chauffeur et bus
  const driver = await prisma.users.findUnique({
    where: { id: driverId },
    include: { buses: true },
  });

  if (!driver) throw new Error("Chauffeur introuvable");
  if (!driver.buses.find((b) => b.id === busId))
    throw new Error("Ce chauffeur n'est pas assigné à ce bus");

  // Vérifie l'enfant
  const child = await prisma.children.findUnique({
    where: { id: childId },
    include: { parent: true },
  });

  if (!child) throw new Error("Enfant introuvable");

  // ✅ Création de l’anomalie
  const anomaly = await prisma.anomaly.create({
    data: {
      driverId,
      busId,
      childId,
      description,
    },
  });

  // 📨 Optionnel : notifier le parent ou l’admin
  if (child.parent?.email) {
    await sendMail(
      child.parent.email,
      `Anomalie signalée pour ${child.nom} ${child.prenom}`,
      `
      <div style="font-family:Arial,sans-serif;line-height:1.6;">
        <h2>Bonjour ${child.parent.prenom},</h2>
        <p>Une anomalie a été signalée pendant le trajet de <strong>${
          child.nom
        } ${child.prenom}</strong>.</p>
        <p><strong>Description :</strong> ${description}</p>
        <p><strong>Date :</strong> ${new Date().toLocaleString("fr-FR")}</p>
        <br/>
        <p style="color:#555;">L’équipe SmartRide Corporation</p>
      </div>
      `
    );
  }

  return anomaly;
}
