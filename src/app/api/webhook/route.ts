import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { sendConfirmationEmail } from "@/app/actions/sendConfirmationEmail";
import { sendCancellationEmail } from "@/app/actions/sendCancellationEmail";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: Request) {
  console.log("💡 Webhook reçu");

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    console.warn("⚠️ Signature manquante !");
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Signature invalide :", (err as Error).message);
    return NextResponse.json(
      { error: `Signature invalide : ${(err as Error).message}` },
      { status: 400 }
    );
  }

  // ────────────── Checkout session completed ──────────────
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const parentId = session.metadata?.parentId;
      const childrenList = session.metadata?.childrenIds;
      const stripeSubId = session.subscription?.toString();
      const priceId = session.metadata?.priceId;
      const pricePaid = session.amount_total || 0;

      if (!parentId || !childrenList || !stripeSubId) {
        throw new Error(
          "Metadata parentId, childrenIds ou stripeSubId manquant."
        );
      }

      const plan =
        priceId === process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID
          ? "YEARLY"
          : "MONTHLY";

      const parent = await prisma.users.findUnique({ where: { id: parentId } });
      if (!parent) throw new Error("Parent introuvable.");

      const childrenIds = childrenList.split(",");
      const children = await prisma.children.findMany({
        where: { id: { in: childrenIds } },
      });

      const childrenNames = children.map((c) => `${c.nom} ${c.prenom}`);

      const createdAt = new Date();
      const expiresAt = new Date(createdAt);
      if (plan === "MONTHLY") expiresAt.setMonth(expiresAt.getMonth() + 1);
      else expiresAt.setFullYear(expiresAt.getFullYear() + 1);

      const stripeSubscription = await stripe.subscriptions.retrieve(
        stripeSubId
      );
      // Créer abonnement
      const subscription = await prisma.subscription.create({
        data: {
          stripeSubId,
          parentId,
          plan,
          status: stripeSubscription.status,
        },
      });

      // Lier enfants
      await prisma.children.updateMany({
        where: { id: { in: childrenIds } },
        data: { subscriptionId: subscription.id },
      });

      // Envoyer email
      try {
        await sendConfirmationEmail(
          parent.email,
          { id: subscription.id, plan, createdAt, expiresAt, price: pricePaid },
          childrenNames
        );
      } catch (emailErr) {
        console.error("❌ Erreur envoi email confirmation :", emailErr);
      }

      // Marquer email envoyé
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { emailSent: true },
      });

      return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
      console.error("❌ Erreur traitement checkout.session.completed :", error);
      return NextResponse.json(
        { error: "Erreur serveur webhook Stripe" },
        { status: 500 }
      );
    }
  }

  // ────────────── Subscription updated ──────────────
  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;

    try {
      const updatedSub = await prisma.subscription.update({
        where: { stripeSubId: subscription.id },
        data: {
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          status: subscription.status, // ⚡ status réel de Stripe
        },
        include: {
          parent: true,
          children: true,
        },
      });

      // Envoi email si annulation programmée
      if (subscription.cancel_at_period_end && !updatedSub.emailSent) {
        try {
          await sendCancellationEmail(
            updatedSub.parent.email,
            updatedSub.children.map((c) => `${c.prenom} ${c.nom}`)
          );

          await prisma.subscription.update({
            where: { id: updatedSub.id },
            data: { emailSent: true },
          });

          console.log("✅ Email d'annulation envoyé !");
        } catch (emailErr) {
          console.error("❌ Erreur envoi email annulation :", emailErr);
        }
      }

      return NextResponse.json({ received: true }, { status: 200 });
    } catch (err) {
      console.error("❌ Erreur update subscription:", err);
      return NextResponse.json(
        { error: "Erreur webhook Stripe cancellation" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Event ignoré" }, { status: 200 });
}
