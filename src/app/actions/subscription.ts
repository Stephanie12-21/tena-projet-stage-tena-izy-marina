"use server";

import stripe from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

interface CreateCheckoutSessionInput {
  parentId: string;
  childrenIds: string[];
  priceId: string;
  email: string;
}

export async function createCheckoutSession({
  parentId,
  childrenIds,
  priceId,
  email,
}: CreateCheckoutSessionInput) {
  if (!childrenIds || childrenIds.length === 0) {
    throw new Error("Aucun enfant sélectionné");
  }

  // ✅ Récupérer le parent depuis la DB
  const parent = await prisma.users.findUnique({
    where: { id: parentId },
  });

  if (!parent) {
    throw new Error("Parent introuvable");
  }

  // ✅ Générer le slug à partir du prénom et nom du parent
  const slug = `${parent.prenom}-${parent.nom}`
    .toLowerCase()
    .replace(/\s+/g, "-")
    .normalize("NFD") // pour retirer les accents
    .replace(/[\u0300-\u036f]/g, ""); // supprimer les diacritiques

  console.log("🔗 Slug parent :", slug);

  // ✅ Créer la session Stripe
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: childrenIds.length,
      },
    ],
    metadata: {
      parentId,
      childrenIds: childrenIds.join(","),
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/parent/${slug}/abonnement/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/parent/${slug}/abonnement/cancel`,
    customer_email: email,
  });

  if (!session.url) {
    throw new Error("Erreur Stripe : session sans URL");
  }

  return session.url;
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    // 1️⃣ Récupérer l'abonnement en DB
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId }, // ID Prisma
    });

    if (!subscription) {
      throw new Error("Abonnement introuvable en base");
    }

    if (!subscription.stripeSubId) {
      throw new Error("Aucun ID Stripe associé à cet abonnement");
    }

    // 2️⃣ Annulation à la fin de la période côté Stripe
    const updatedStripeSub = await stripe.subscriptions.update(
      subscription.stripeSubId,
      {
        cancel_at_period_end: true,
      }
    );

    // 3️⃣ Mettre à jour la DB avec le status réel de Stripe
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelAtPeriodEnd: updatedStripeSub.cancel_at_period_end,
        status: updatedStripeSub.status, // ⚡ status réel de Stripe
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur annulation abonnement:", error);
    throw new Error("Impossible d'annuler l'abonnement.");
  }
}
