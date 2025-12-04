import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const supabase = await createClient();
  let message = "Erreur lors de la confirmation.";
  let success = false;

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      message = "Compte confirmé avec succès !";
      success = true;
    }
  }

  const description = success
    ? "Votre compte a été vérifié. Vous pouvez maintenant vous connecter et profiter de SmartRide."
    : "Quelque chose s'est mal passé. Ne vous inquiétez pas, vous pouvez retourner à la page d'accueil.";

  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmartRide - Confirmation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 60px 40px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(254, 192, 63, 0.4);
      text-align: center;
      animation: slideIn 0.5s ease-out;
      border: 2px solid rgba(254, 192, 63, 0.3);
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

 

    h1 {
      color: #2d3748;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 15px;
      line-height: 1.4;
    }

    p {
      color: #4a5568;
      font-size: 16px;
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #fec03f 0%, #ff9a3c 100%);
      color: #2d3748;
      text-decoration: none;
      padding: 14px 40px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(254, 192, 63, 0.4);
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(254, 192, 63, 0.6);
      background: linear-gradient(135deg, #ffd45f 0%, #ffaa5c 100%);
    }

    .btn:active {
      transform: translateY(0);
    }

    @media (max-width: 480px) {
      .container {
        padding: 40px 30px;
      }

      h1 {
        font-size: 20px;
      }

      .icon {
        font-size: 60px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${message}</h1>
    <p>${description}</p>
    <a href="${next}" class="btn">${
    success ? "Continuer" : "Retour à l'accueil"
  }</a>
  </div>
</body>
</html>
`;

  return new Response(htmlContent, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
