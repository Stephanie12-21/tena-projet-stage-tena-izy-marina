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
  type: "BOARDING" | "DROPOFF"
) {
  if (!childId || !driverId || !type)
    throw new Error("Champs requis manquants");

  // 🔹 Récupération du chauffeur et de son bus
  const driver = await prisma.users.findUnique({
    where: { id: driverId },
    include: {
      driverProfile: true,
      buses: true,
    },
  });

  if (!driver || !driver.driverProfile || driver.buses.length === 0)
    throw new Error("Bus ou chauffeur non trouvé");

  const bus = driver.buses[0];

  // 🔹 Récupération des coordonnées GPS actuelles du bus
  const busLat = driver.driverProfile.currentLat;
  const busLon = driver.driverProfile.currentLong;

  // 🔹 Conversion en adresse
  let adresseBus = "Adresse non disponible";
  if (busLat != null && busLon != null) {
    adresseBus = await getAddressFromCoords(busLat, busLon);
  }

  // ✅ Création du log
  const log = await prisma.scanLog.create({
    data: {
      childId,
      driverId,
      busId: bus.id,
      type,
      lat: busLat,
      long: busLon,
    },
  });

  // 🔹 Récupère les infos de l'enfant et du parent
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

  // 📨 Envoi du mail (même style que ton template précédent)
  await sendMail(
    parent.email,
    `Notification de transport scolaire - ${nom} ${prenom}`,
    `
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
              
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Notification de Transport</h1>
              <p style="margin:8px 0 0 0;color:rgba(255,255,255,0.9);font-size:14px;">Mise à jour en temps réel</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              
              <p style="margin:0 0 20px 0;font-size:16px;color:#0f172a;">
                Bonjour <strong>${parent.prenom}</strong>,
              </p>
              
              <!-- Status Badge -->
              <div style="background:${
                action.includes("monté") || action.includes("embarqué")
                  ? "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)"
                  : "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)"
              };border-left:4px solid ${
      action.includes("monté") || action.includes("embarqué")
        ? "#22c55e"
        : "#3b82f6"
    };border-radius:8px;padding:20px;margin:0 0 24px 0;">
                <p style="margin:0;font-size:15px;color:#0f172a;line-height:1.6;">
                  <strong style="display:block;margin-bottom:4px;font-size:16px;">${nom} ${prenom}</strong>
                  ${action}
                </p>
              </div>
              
              <!-- Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:8px;padding:16px;margin:0 0 24px 0;">
                <tr>
                  <td style="padding:8px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:14px;color:#64748b;padding:4px 0;">
                          Date et heure
                        </td>
                        <td align="right" style="font-size:14px;color:#0f172a;font-weight:500;padding:4px 0;">
                          ${new Date().toLocaleString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-top:1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:14px;color:#64748b;padding:4px 0;">
                          Chauffeur
                        </td>
                        <td align="right" style="font-size:14px;color:#0f172a;font-weight:500;padding:4px 0;">
                          ${driver.prenom} ${driver.nom}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-top:1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:14px;color:#64748b;padding:4px 0;">
                          Bus
                        </td>
                        <td align="right" style="font-size:14px;color:#0f172a;font-weight:500;padding:4px 0;">
                          ${bus.matricule}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-top:1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:14px;color:#64748b;padding:4px 0;">
                          Adresse exacte du bus
                        </td>
                        <td align="right" style="font-size:14px;color:#0f172a;font-weight:500;padding:4px 0;">
                          ${adresseBus}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Info Box -->
              <div style="background-color:#fff7ed;border-radius:8px;padding:16px;margin:0 0 16px 0;">
                <p style="margin:0;font-size:13px;color:#9a3412;line-height:1.6;">
                 <strong>Astuce :</strong> Vous recevrez une notification à chaque étape du trajet de votre enfant pour votre tranquillité d'esprit.
                </p>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px 0;font-size:14px;color:#0f172a;font-weight:600;">
                SmartRide Corporation
              </p>
              <p style="margin:0 0 12px 0;font-size:13px;color:#94a3b8;">
                La sécurité de vos enfants, notre priorité
              </p>
              <p style="margin:0;font-size:12px;color:#cbd5e1;">
                Questions ? Contactez-nous à support@smartride.com
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
  );

  return log;
}
