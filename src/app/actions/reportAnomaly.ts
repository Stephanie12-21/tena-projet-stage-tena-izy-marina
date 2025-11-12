"use server";

import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

// 🚚 Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ✉️ Fonction d'envoi d'email
async function sendMail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email envoyé :", info.messageId);
  } catch (error) {
    console.error("❌ Erreur envoi mail :", error);
  }
}

// 🌍 Fonction pour récupérer une adresse à partir des coordonnées GPS
async function getAddressFromCoords(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`
    );

    if (!res.ok) throw new Error(`Erreur Geoapify : ${res.statusText}`);

    const data = await res.json();
    const adresse = data?.results?.[0]?.formatted || "Adresse non disponible";

    console.log("📍 Adresse détectée :", adresse);
    return adresse;
  } catch (error) {
    console.error("❌ Erreur API Geoapify :", error);
    return "Adresse non disponible";
  }
}

/**
 * 🚨 Report d’anomalie (avec récupération auto de la position du chauffeur)
 */
export async function reportAnomaly(
  driverId: string,
  busId: string,
  childId: string,
  description: string
) {
  // console.log("🚨 Début reportAnomaly", {
  //   driverId,
  //   busId,
  //   childId,
  //   description,
  // });

  if (!driverId || !busId || !childId || !description) {
    throw new Error("Tous les champs sont requis");
  }

  try {
    // 🔹 Récupération du chauffeur avec profil et bus
    const driver = await prisma.users.findUnique({
      where: { id: driverId },
      include: {
        driverProfile: true,
        buses: true,
      },
    });

    if (!driver) throw new Error("Chauffeur introuvable");
    if (!driver.buses.some((b) => b.id === busId))
      throw new Error("Ce chauffeur n'est pas assigné à ce bus");

    // 🔹 Récupération de la position GPS du chauffeur
    const lat = driver.driverProfile?.currentLat;
    const lon = driver.driverProfile?.currentLong;

    let adresse = "Adresse non disponible";
    if (lat != null && lon != null) {
      adresse = await getAddressFromCoords(lat, lon);
    }

    // 🔹 Vérification de l’enfant
    const child = await prisma.children.findUnique({
      where: { id: childId },
      include: { parent: true },
    });
    if (!child) throw new Error("Enfant introuvable");

    // 🔹 Création de l’anomalie dans la base
    const anomaly = await prisma.anomaly.create({
      data: {
        driverId,
        busId,
        childId,
        description,
      },
    });

    // console.log("✅ Anomalie enregistrée :", anomaly);

    // 🔹 Envoi d'un mail au parent (si email disponible)
    if (child.parent?.email) {
      const date = new Date().toLocaleString("fr-FR");
      const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.6;">
          <h2>Bonjour ${child.parent.prenom},</h2>
          <p>Une anomalie a été signalée pendant le trajet de <strong>${child.nom} ${child.prenom}</strong>.</p>
          <p><strong>Description :</strong> ${description}</p>
          <p><strong>Adresse détectée :</strong> ${adresse}</p>
          <p><strong>Date :</strong> ${date}</p>
          <br/>
          <p style="color:#555;">L’équipe SmartRide Corporation</p>
        </div>
      `;

      await sendMail(
        child.parent.email,
        `Anomalie signalée pour ${child.nom} ${child.prenom}`,
        html
      );
    } else {
      console.log("ℹ️ Aucun email parent trouvé, pas d’envoi.");
    }

    return anomaly;
  } catch (error) {
    console.error("❌ Erreur dans reportAnomaly :", error);
    throw error;
  }
}
