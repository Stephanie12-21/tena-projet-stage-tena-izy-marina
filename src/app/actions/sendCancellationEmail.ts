"use server";

import nodemailer from "nodemailer";

export async function sendCancellationEmail(to: string, childNames: string[]) {
  if (!to) throw new Error("Adresse email manquante pour l'envoi.");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const childrenList = childNames.length
    ? `<ul>${childNames.map((c) => `<li>${c}</li>`).join("")}</ul>`
    : "<p>Aucun enfant renseigné.</p>";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #d9534f;"> Votre abonnement sera résilié à la fin de la période en cours</h2>
      <p>Les enfants concernés :</p>
      ${childrenList}
      <p>Merci pour votre confiance </p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: " Confirmation de résiliation d'abonnement UnivPass",
    html: htmlContent,
  });

  console.log(` Email de résiliation envoyé à ${to}`);
}
