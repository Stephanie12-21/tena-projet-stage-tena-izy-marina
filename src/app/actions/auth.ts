"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
    const user = await prisma.users.create({
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

//pour la création de compte parent
export async function signUpAsParent(formData: FormData) {
  console.log("=== Début de la fonction signUp ===");

  //  Création du client Supabase (serveur)
  const supabase = await createClient();
  console.log(" Client Supabase serveur créé");

  // Extraction des données du formulaire
  const userData = {
    nom: (formData.get("nom") as string)?.trim(),
    prenom: (formData.get("prenom") as string)?.trim(),
    email: (formData.get("email") as string)?.trim(),
    phone: (formData.get("phone") as string)?.trim(),
    password: (formData.get("password") as string)?.trim(),
  };
  console.log(" Données utilisateur reçues :", userData);

  // 🧾 Vérification des champs requis
  const allUserFieldsFilled = Object.values(userData).every(Boolean);
  if (!allUserFieldsFilled) {
    console.warn(" Champs manquants :", userData);
    return {
      status: "Tous les champs sont obligatoires.",
      user: null,
    };
  }

  // 🔐 Création du compte dans Supabase Auth
  console.log(" Tentative de création du compte Supabase...");
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

  console.log(" Résultat de signUp Supabase :", { data, error });

  if (error) {
    console.error(" Erreur Supabase :", error.message);
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
  console.log(" Nouvel utilisateur Supabase créé avec ID :", userId);

  //  Insertion de l’utilisateur dans ta base Prisma
  try {
    console.log(" Tentative d'enregistrement Prisma...");
    const user = await prisma.users.create({
      data: {
        id: userId,
        nom: userData.nom,
        prenom: userData.prenom,
        email: userData.email,
        phone: userData.phone,
        role: "PARENT",
      },
    });

    console.log(" Utilisateur enregistré dans Prisma :", user);
    await revalidatePath("/", "layout");
    console.log(" Revalidation du cache Next terminée.");

    return { status: "success", user };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error(" Erreur Prisma :", errorMsg);

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
  const user = await prisma.users.findUnique({ where: { email } });

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

//pour l'envoi de l'email de réinitialisation du mot de passe
export async function sendResetPasswordEmail(email: string) {
  if (!email) {
    return { success: false, message: "Email invalide" };
  }

  // 🧩 Création du client Supabase (serveur)
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, message: `Erreur: ${error.message}` };
    }

    return {
      success: true,
      message:
        "Un email de réinitialisation a été envoyé. Vérifiez votre boîte mail (et vos spams).",
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      success: false,
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
    };
  }
}

//pour se déconnecter
export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/login");
}

//pour la modification du profil
export async function updateParentProfile({
  nom,
  prenom,
  email,
  phone,
}: {
  nom: string;
  prenom: string;
  email: string;
  phone: string;
}) {
  try {
    const supabase = createClient();

    // ✅ On récupère l'utilisateur connecté
    const {
      data: { user },
    } = await (await supabase).auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "Non autorisé. Veuillez vous connecter.",
      };
    }

    // ✅ Vérifier s'il y a déjà un compte avec le même email (anti duplication)
    const emailExists = await prisma.users.findFirst({
      where: { email, NOT: { id: user.id } },
    });

    if (emailExists) {
      return { success: false, message: "Cet email est déjà utilisé !" };
    }

    // ✅ 1. Mettre à jour dans Supabase Auth
    const { error: authError } = await (
      await supabase
    ).auth.updateUser({
      email,
      data: { nom, prenom, phone },
    });

    if (authError) {
      return {
        success: false,
        message: `Erreur Supabase: ${authError.message}`,
      };
    }

    // ✅ 2. Mettre à jour dans Prisma
    await prisma.users.update({
      where: { id: user.id },
      data: { nom, prenom, email, phone },
    });

    return { success: true, message: "Profil mis à jour avec succès ✅" };
  } catch (error: unknown) {
    console.error("Unexpected error:", error);

    // Vérifie si c’est bien une instance de Error pour accéder à message
    const message = error instanceof Error ? error.message : "Erreur inconnue";

    return { success: false, message: `Erreur serveur: ${message}` };
  }
}
