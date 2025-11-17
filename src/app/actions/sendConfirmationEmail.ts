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
            <td style="background:linear-gradient(135deg, #f97316 0%, #ea580c 100%);padding:40px;text-align:center;">
              <div style="width:64px;height:64px;background-color:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:32px;">
                ✓
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">Abonnement Confirmé !</h1>
              <p style="margin:8px 0 0 0;color:rgba(255,255,255,0.9);font-size:15px;">Merci pour votre confiance</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              
              <!-- Plan Badge -->
              <div style="background:linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);border:2px solid #f97316;border-radius:12px;padding:20px;margin:0 0 24px 0;text-align:center;">
                <p style="margin:0 0 4px 0;font-size:13px;color:#9a3412;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Votre Plan</p>
                <p style="margin:0;font-size:24px;color:#ea580c;font-weight:700;">${
                  subscription.plan
                }</p>
              </div>
              
              <!-- Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px 0;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:14px;color:#64748b;">Montant payé</td>
                        <td align="right" style="font-size:16px;color:#0f172a;font-weight:600;">${subscription.price.toLocaleString()} MGA</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:14px;color:#64748b;">Date d'activation</td>
                        <td align="right" style="font-size:14px;color:#0f172a;font-weight:500;">${subscription.createdAt.toLocaleDateString(
                          "fr-FR",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:14px;color:#64748b;">Date d'expiration</td>
                        <td align="right" style="font-size:14px;color:#0f172a;font-weight:500;">${subscription.expiresAt.toLocaleDateString(
                          "fr-FR",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Children List -->
              <div style="background-color:#f8fafc;border-radius:8px;padding:20px;margin:0 0 24px 0;">
                <p style="margin:0 0 12px 0;font-size:15px;color:#0f172a;font-weight:600;">Enfants abonnés</p>
                <ul style="margin:0;padding:0 0 0 20px;list-style:none;">
                  ${childrenList
                    .split("<li>")
                    .filter((item) => item.trim())
                    .map(
                      (item) =>
                        `<li style="padding:6px 0;font-size:14px;color:#475569;position:relative;padding-left:20px;">
                      <span style="position:absolute;left:0;color:#f97316;">•</span>
                      ${item.replace("</li>", "")}
                    </li>`
                    )
                    .join("")}
                </ul>
              </div>
              
              <!-- CTA Button (optional) -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 0 0;">
                    <a href="#" style="display:inline-block;background:linear-gradient(135deg, #f97316 0%, #ea580c 100%);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(249,115,22,0.3);">
                      Accéder à mon compte
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px 0;font-size:14px;color:#0f172a;font-weight:600;">
                SmartRide Corporation
              </p>
              <p style="margin:0 0 12px 0;font-size:13px;color:#94a3b8;">
                Votre partenaire de confiance pour le transport scolaire
              </p>
              <p style="margin:0;font-size:12px;color:#cbd5e1;">
                Des questions ? Contactez-nous à support@smartride.com
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  });
}
