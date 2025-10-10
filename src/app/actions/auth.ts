"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

//pour la création de compte
export async function signUp(formData: FormData) {
  console.log("=== Début de la fonction signUp ===");

  // 🧩 Création du client Supabase (serveur)
  const supabase = await createClient();
  console.log("✅ Client Supabase serveur créé");

  // 🧠 Extraction des données du formulaire
  const userData = {
    nom: (formData.get("nom") as string)?.trim(),
    prenom: (formData.get("prenom") as string)?.trim(),
    email: (formData.get("email") as string)?.trim(),
    phone: (formData.get("phone") as string)?.trim(),
    password: (formData.get("password") as string)?.trim(),
  };
  console.log("📥 Données utilisateur reçues :", userData);

  // 🧾 Vérification des champs requis
  const allUserFieldsFilled = Object.values(userData).every(Boolean);
  if (!allUserFieldsFilled) {
    console.warn("❌ Champs manquants :", userData);
    return {
      status: "Tous les champs sont obligatoires.",
      user: null,
    };
  }

  // 🔐 Création du compte dans Supabase Auth
  console.log("🚀 Tentative de création du compte Supabase...");
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        nom: userData.nom,
        prenom: userData.prenom,
        phone: userData.phone,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  console.log("📡 Résultat de signUp Supabase :", { data, error });

  if (error) {
    console.error("❌ Erreur Supabase :", error.message);
    return { status: `Erreur Supabase : ${error.message}`, user: null };
  }

  // ⚠️ Vérifie si un utilisateur existe déjà
  if (!data.user || data.user.identities?.length === 0) {
    console.warn("⚠️ Utilisateur déjà existant.");
    return {
      status: "Utilisateur déjà existant. Veuillez vous connecter.",
      user: null,
    };
  }

  const userId = data.user.id;
  console.log("✅ Nouvel utilisateur Supabase créé avec ID :", userId);

  // 💾 Insertion de l’utilisateur dans ta base Prisma
  try {
    console.log("💽 Tentative d'enregistrement Prisma...");
    const user = await prisma.user.create({
      data: {
        id: userId,
        nom: userData.nom,
        prenom: userData.prenom,
        email: userData.email,
        phone: userData.phone,
        role: "ADMIN",
      },
    });

    console.log("✅ Utilisateur enregistré dans Prisma :", user);
    await revalidatePath("/", "layout");
    console.log("♻️ Revalidation du cache Next terminée.");

    return { status: "success", user };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error("❌ Erreur Prisma :", errorMsg);

    return {
      status: `Erreur lors de l'enregistrement Prisma : ${errorMsg}`,
      user: null,
    };
  }
}

//pourla connexion au compte
export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Vérifier si l'utilisateur existe dans ta propre DB
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return {
      status: "error",
      reason: "user_not_found",
      user: null,
      session: null,
      email: null,
    };
  }

  // Tentative de connexion avec Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Gestion fine des erreurs de Supabase
  if (error) {
    const msg = (error.message || "").toLowerCase();

    if (msg.includes("email not confirmed") || /confirm/i.test(msg)) {
      return {
        status: "error",
        reason: "email_not_confirmed",
        user,
        session: null,
        email,
      };
    }

    return {
      status: "error",
      reason: "invalid_credentials",
      user: null,
      session: null,
      email: null,
    };
  }

  // Sécurité : si jamais la connexion réussit mais l'email n’est pas confirmé
  if (!data.user?.email_confirmed_at && !data.user?.confirmed_at) {
    return {
      status: "error",
      reason: "email_not_confirmed",
      user,
      session: null,
      email,
    };
  }

  // Récupérer la session si tout est bon
  const {
    data: { session },
  } = await supabase.auth.getSession();

  revalidatePath("/", "layout");

  return {
    status: "success",
    user,
    session,
    email,
  };
}

//pour le renvoi de l'email de confirmation
export async function resendConfirmationEmail(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message: "Email de confirmation renvoyé avec succès.",
  };
}
