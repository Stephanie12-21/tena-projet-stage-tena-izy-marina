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
            <td style="background:linear-gradient(135deg, #64748b 0%, #475569 100%);padding:40px;text-align:center;">
              <div style="width:64px;height:64px;background-color:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:32px;">
                ℹ️
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">Confirmation de Résiliation</h1>
              <p style="margin:8px 0 0 0;color:rgba(255,255,255,0.9);font-size:15px;">Votre demande a été prise en compte</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              
              <!-- Alert Box -->
              <div style="background-color:#fef2f2;border-left:4px solid #ef4444;border-radius:8px;padding:20px;margin:0 0 24px 0;">
                <p style="margin:0;font-size:15px;color:#7f1d1d;line-height:1.6;">
                  <strong style="display:block;margin-bottom:8px;font-size:16px;color:#991b1b;">📋 Information importante</strong>
                  Votre abonnement sera résilié à la fin de la période en cours. Vous continuerez à bénéficier du service jusqu'à la date d'expiration.
                </p>
              </div>
              
              <!-- Children List -->
              <div style="background-color:#f8fafc;border-radius:8px;padding:20px;margin:0 0 24px 0;">
                <p style="margin:0 0 12px 0;font-size:15px;color:#0f172a;font-weight:600;">👶 Enfants concernés</p>
                <ul style="margin:0;padding:0 0 0 20px;list-style:none;">
                  ${
                    typeof childrenList === "string" &&
                    childrenList.includes("<li>")
                      ? childrenList
                          .split("<li>")
                          .filter((item) => item.trim())
                          .map(
                            (item) =>
                              `<li style="padding:6px 0;font-size:14px;color:#475569;position:relative;padding-left:20px;">
                          <span style="position:absolute;left:0;color:#64748b;">•</span>
                          ${item.replace("</li>", "").replace("</ul>", "")}
                        </li>`
                          )
                          .join("")
                      : `<li style="padding:6px 0;font-size:14px;color:#475569;position:relative;padding-left:20px;">
                        <span style="position:absolute;left:0;color:#64748b;">•</span>
                        ${childrenList}
                      </li>`
                  }
                </ul>
              </div>
              
              <!-- Info Box -->
              <div style="background-color:#fff7ed;border-radius:8px;padding:20px;margin:0 0 24px 0;">
                <p style="margin:0 0 12px 0;font-size:14px;color:#9a3412;">
                  <strong style="color:#c2410c;">💡 Vous avez changé d'avis ?</strong>
                </p>
                <p style="margin:0;font-size:14px;color:#7c2d12;line-height:1.6;">
                  Vous pouvez réactiver votre abonnement à tout moment avant la date d'expiration en vous connectant à votre compte.
                </p>
              </div>
              
              <!-- CTA Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px 0;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:0 8px;">
                          <a href="#" style="display:inline-block;background:linear-gradient(135deg, #f97316 0%, #ea580c 100%);color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
                            Réactiver l'abonnement
                          </a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="#" style="display:inline-block;background:#f1f5f9;color:#475569;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
                            Accéder à mon compte
                          </a>
                        </td>
                      </tr>
                    </table>
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
                Merci pour votre confiance
              </p>
              <p style="margin:0;font-size:12px;color:#cbd5e1;">
                Une question ? Contactez-nous à support@smartride.com
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

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: " Confirmation de résiliation d'abonnement UnivPass",
    html: htmlContent,
  });

  console.log(` Email de résiliation envoyé à ${to}`);
}
