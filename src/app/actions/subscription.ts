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
