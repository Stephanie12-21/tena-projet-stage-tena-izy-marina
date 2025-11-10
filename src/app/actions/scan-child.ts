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

export async function logChildScan(
  childId: string,
  driverId: string,
  type: "BOARDING" | "DROPOFF",
  lat?: number,
  long?: number
) {
  if (!childId || !driverId || !type)
    throw new Error("Champs requis manquants");

  // Récupération du chauffeur + bus
  const driver = await prisma.users.findUnique({
    where: { id: driverId },
    include: { buses: true },
  });

  if (!driver || driver.buses.length === 0)
    throw new Error("Bus non trouvé pour ce chauffeur");

  const busId = driver.buses[0].id;

  // ✅ Création du log
  const log = await prisma.scanLog.create({
    data: { childId, driverId, busId, type, lat, long },
  });

  // 🔍 Récupère les infos de l'enfant et du parent
  const child = await prisma.children.findUnique({
    where: { id: childId },
    include: { parent: true },
  });

  if (!child || !child.parent?.email) return log;

  const { parent, nom, prenom } = child;
  const action =
    type === "BOARDING"
      ? "vient de monter dans le bus"
      : "vient de descendre du bus";

  // 📨 Envoi du mail
  await sendMail(
    parent.email,
    `Notification de transport scolaire - ${nom} ${prenom}`,
    `
    <div style="font-family:Arial,sans-serif;line-height:1.6;">
      <h2>Bonjour ${parent.prenom},</h2>
      <p>Nous vous informons que <strong>${nom} ${prenom}</strong> ${action}.</p>
      <p><strong>Date et heure :</strong> ${new Date().toLocaleString(
        "fr-FR"
      )}</p>
      <p><strong>Chauffeur :</strong> ${driver.prenom} ${driver.nom}</p>
      <p><strong>Bus :</strong> ${driver.buses[0].matricule}</p>
      <br/>
      <p style="color:#555;">Cordialement,<br/>L’équipe SmartRide Corporation</p>
    </div>
    `
  );

  return log;
}
