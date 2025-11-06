"use server";
import { prisma } from "@/lib/prisma";
import { ChildInput, UpdateChildInput } from "@/lib/types/user-interface";

// création des données enfants
export async function createChild(data: ChildInput) {
  // 1️⃣ Récupérer ou créer l'école
  let school = await prisma.school.findFirst({
    where: { nom: data.schoolName },
  });

  if (!school) {
    school = await prisma.school.create({
      data: {
        nom: data.schoolName,
        adresse: data.schoolAddress,
        schoolLat: data.schoolLat,
        schoolLong: data.schoolLong,
      },
    });
  }

  // 2️⃣ Créer l'enfant
  const child = await prisma.children.create({
    data: {
      prenom: data.prenomEnfant,
      nom: data.nomEnfant,
      adresse: data.adresse,
      homeLat: data.homeLat,
      homeLong: data.homeLong,
      arrivalTime: data.arrivalTime,
      departureTime: data.departureTime,
      parent: { connect: { id: data.parentId } },
      imageprofile: {
        create: {
          url: data.photoUrl,
        },
      },
      school: { connect: { id: school.id } },
    },
    include: {
      imageprofile: true,
      school: true,
    },
  });

  return child;
}

// modification des données enfants
export async function updateChild(data: UpdateChildInput) {
  const {
    id,
    prenom,
    nom,
    adresse,
    homeLat,
    homeLong,
    schoolNom,
    schoolAdresse,
    schoolLat,
    schoolLong,
    arrivalTime,
    departureTime,
    imageUrl,
  } = data;

  try {
    const updatedChild = await prisma.children.update({
      where: { id },
      data: {
        prenom,
        nom,
        adresse,
        homeLat,
        homeLong,
        arrivalTime,
        departureTime,
        // 🔹 Mise à jour de l'image
        imageprofile: {
          upsert: {
            update: { url: imageUrl },
            create: { url: imageUrl },
          },
        },
        // 🔹 Mise à jour de l'école via relation
        school: schoolNom
          ? {
              update: {
                nom: schoolNom,
                adresse: schoolAdresse ?? "",
                schoolLat: schoolLat ?? 0,
                schoolLong: schoolLong ?? 0,
              },
            }
          : undefined,
      },
      include: {
        imageprofile: true,
        school: true,
      },
    });

    return { status: "success", data: updatedChild };
  } catch (error) {
    console.error("❌ Erreur updateChild:", error);
    return {
      status: "error",
      message: "Erreur lors de la mise à jour de l'enfant",
    };
  }
}

// suppression des données enfants
export async function deleteChild(childId: string) {
  try {
    // Vérifie si l'enfant existe
    const existingChild = await prisma.children.findUnique({
      where: { id: childId },
    });

    if (!existingChild) {
      throw new Error("Enfant introuvable");
    }

    // Supprime l'enfant (les relations cascade avec parent/image sont déjà gérées par Prisma)
    await prisma.children.delete({
      where: { id: childId },
    });

    return { success: true, message: "Enfant supprimé avec succès" };
  } catch (err: unknown) {
    console.error("Erreur lors de la suppression :", err);

    const message =
      err instanceof Error ? err.message : "Erreur lors de la suppression";

    return { success: false, message };
  }
}
