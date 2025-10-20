import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { sendConfirmationEmail } from "@/app/actions/sendConfirmationEmail";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: Request) {
  console.log("💡 Webhook reçu");

  const sig = req.headers.get("stripe-signature");
  console.log("🔑 Signature Stripe :", sig);

  if (!sig) {
    console.warn("⚠️ Signature manquante !");
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  const payload = await req.text();
  console.log("📄 Body brut reçu :", payload);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("✅ Signature Stripe validée");
  } catch (err) {
    console.error("❌ Signature invalide :", (err as Error).message);
    return NextResponse.json(
      { error: `Signature invalide : ${(err as Error).message}` },
      { status: 400 }
    );
  }

  console.log("📦 Type d'événement :", event.type);

  if (event.type === "checkout.session.completed") {
    console.log("💰 Événement checkout.session.completed détecté");

    const session = event.data.object as Stripe.Checkout.Session;
    console.log("🧾 Session Stripe :", session);

    try {
      const parentId = session.metadata?.parentId;
      const childrenList = session.metadata?.childrenIds;
      const stripeSubId = session.subscription?.toString();
      const priceId = session.metadata?.priceId;
      const pricePaid = session.amount_total || 0;

      console.log("👨‍👩‍👧 parentId :", parentId);
      console.log("🧒 childrenIds metadata :", childrenList);
      console.log("💳 stripeSubId :", stripeSubId);
      console.log("🏷 priceId :", priceId);
      console.log("💰 Montant payé :", pricePaid);

      if (!parentId || !childrenList) {
        throw new Error("Metadata parentId ou childrenIds manquant.");
      }

      const plan =
        priceId === process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID
          ? "YEARLY"
          : "MONTHLY";
      console.log("📌 Plan détecté :", plan);

      // ✅ Récupérer parent
      console.log("🔍 Récupération parent depuis la DB...");
      const parent = await prisma.users.findUnique({ where: { id: parentId } });
      console.log("👤 Parent trouvé :", parent);

      if (!parent) throw new Error("Parent introuvable.");

      // ✅ Récupérer enfants
      const childrenIds = childrenList.split(",");
      console.log("🔢 ChildrenIds parsés :", childrenIds);

      const children = await prisma.children.findMany({
        where: { id: { in: childrenIds } },
      });
      console.log("🧒 Enfants trouvés :", children);

      const childrenNames = children.map((c) => `${c.nom} ${c.prenom}`);
      console.log("📝 Noms enfants :", childrenNames);

      // ✅ Dates
      const createdAt = new Date();
      const expiresAt = new Date(createdAt);
      if (plan === "MONTHLY") expiresAt.setMonth(expiresAt.getMonth() + 1);
      else expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      console.log("📅 Date de création :", createdAt);
      console.log("📅 Date d'expiration :", expiresAt);

      // ✅ Créer abonnement
      console.log("📝 Création abonnement...");
      const subscription = await prisma.subscription.create({
        data: {
          stripeSubId,
          parentId,
          plan,
          status: "ACTIVE",
        },
      });
      console.log("✅ Abonnement créé :", subscription);

      // ✅ Lier enfants
      console.log("🔗 Liaison enfants à l'abonnement...");
      const update = await prisma.children.updateMany({
        where: { id: { in: childrenIds } },
        data: { subscriptionId: subscription.id },
      });
      console.log("✅ Enfants mis à jour :", update);

      // ✅ Envoyer email
      console.log("📧 Envoi de l'email de confirmation...");
      try {
        await sendConfirmationEmail(
          parent.email,
          { id: subscription.id, plan, createdAt, expiresAt, price: pricePaid },
          childrenNames
        );
        console.log("✅ Email envoyé !");
      } catch (emailErr) {
        console.error("❌ Erreur envoi email :", emailErr);
      }

      // ✅ Mettre à jour emailSent
      console.log("📝 Mise à jour emailSent dans subscription...");
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { emailSent: true },
      });
      console.log("✅ emailSent mis à jour !");

      return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
      console.error("❌ Erreur traitement webhook :", error);
      return NextResponse.json(
        { error: "Erreur serveur webhook Stripe" },
        { status: 500 }
      );
    }
  }

  console.log("ℹ️ Événement ignoré :", event.type);
  return NextResponse.json({ message: "Event ignoré" }, { status: 200 });
}
