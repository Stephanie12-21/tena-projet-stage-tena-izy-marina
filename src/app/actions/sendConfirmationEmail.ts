"use server";

import nodemailer from "nodemailer";

export async function sendConfirmationEmail(
  to: string,
  subscription: {
    id: string;
    plan: string;
    createdAt: Date;
    price: number;
    expiresAt: Date;
  },
  childrenNames: string[]
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const childrenList = childrenNames.map((c) => `<li>${c}</li>`).join("");

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: " Confirmation d’abonnement SmartRide",
    html: `
      <h2>Merci pour votre abonnement </h2>
      <p>Votre abonnement <b>${subscription.plan}</b> est actif.</p>
      <p><b>Montant payé :</b> ${subscription.price.toLocaleString()} MGA</p>
      <p><b>Date d'activation :</b> ${subscription.createdAt.toLocaleDateString()}</p>
      <p><b>Date d'expiration :</b> ${subscription.expiresAt.toLocaleDateString()}</p>

      <h3> Enfants abonnés :</h3>
      <ul>${childrenList}</ul>

      <br />
      <p>Merci pour votre confiance </p>
    `,
  });
}
