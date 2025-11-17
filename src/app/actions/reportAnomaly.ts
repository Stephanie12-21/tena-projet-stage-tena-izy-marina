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
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #f97316 0%, #ea580c 100%);padding:32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">⚠️ Alerte de Trajet</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 20px 0;font-size:16px;color:#0f172a;">
                Bonjour <strong>${child.parent.prenom}</strong>,
              </p>
              
              <p style="margin:0 0 24px 0;font-size:15px;color:#475569;line-height:1.6;">
                Une anomalie a été signalée pendant le trajet de <strong style="color:#0f172a;">${child.nom} ${child.prenom}</strong>.
              </p>
              
              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff7ed;border-left:4px solid #f97316;border-radius:8px;margin:0 0 24px 0;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 12px 0;font-size:14px;color:#7c2d12;">
                      <strong style="color:#9a3412;">Description</strong><br/>
                      <span style="color:#0f172a;">${description}</span>
                    </p>
                    <p style="margin:0 0 12px 0;font-size:14px;color:#7c2d12;">
                      <strong style="color:#9a3412;">Localisation</strong><br/>
                      <span style="color:#0f172a;">${adresse}</span>
                    </p>
                    <p style="margin:0;font-size:14px;color:#7c2d12;">
                      <strong style="color:#9a3412;">Date et heure</strong><br/>
                      <span style="color:#0f172a;">${date}</span>
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">
                Si vous avez des questions, n'hésitez pas à nous contacter.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px 0;font-size:14px;color:#0f172a;font-weight:600;">
                SmartRide Corporation
              </p>
              <p style="margin:0;font-size:13px;color:#94a3b8;">
                Votre sécurité est notre priorité
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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
