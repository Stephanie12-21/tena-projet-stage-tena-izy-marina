"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function signUp(formData: FormData) {
  const supabase = createClient();

  const userData = {
    nom: formData.get("nom") as string,
    prenom: formData.get("prenom") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    password: formData.get("password") as string,
  };

  // Vérifier que tous les champs sont remplis
  const allUserFieldsFilled = Object.values(userData).every(
    (value) => value && value.trim() !== ""
  );

  if (!allUserFieldsFilled) {
    return {
      status:
        "Tous les champs sont obligatoires. Veuillez remplir toutes les informations.",
      user: null,
    };
  }

  // Création du compte Supabase Auth
  const { data, error } = await (
    await supabase
  ).auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        nom: userData.nom,
        prenom: userData.prenom,
        phone: userData.phone,
      },
    },
  });

  if (error) {
    return { status: error.message, user: null };
  }

  // Vérifie si l'utilisateur existe déjà
  if (!data.user || data.user.identities?.length === 0) {
    return {
      status: "Utilisateur déjà existant, veuillez vous connecter directement.",
      user: null,
    };
  }

  const userId = data.user.id;

  try {
    // Création du User en base
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

    revalidatePath("/", "layout");

    return { status: "success", user };
  } catch (err: unknown) {
    return {
      status:
        "Erreur lors de l'enregistrement en base : " +
        (err instanceof Error ? err.message : String(err)),
      user: null,
    };
  }
}
