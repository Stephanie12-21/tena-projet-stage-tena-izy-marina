"use server";
import { prisma } from "@/lib/prisma";

interface ChildInput {
  prenomEnfant: string;
  nomEnfant: string;
  adresse: string;
  homeLat: number;
  homeLong: number;
  photoUrl: string;
  parentId: string;
  schoolName: string;
  schoolAddress: string;
  schoolLat: number;
  schoolLong: number;
}

// création de données enfants
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

export interface UpdateChildInput {
  id: string;
  prenom: string;
  nom: string;
  adresse: string;
  homeLat: number;
  homeLong: number;
  schoolNom?: string;
  schoolAdresse?: string;
  schoolLat?: number;
  schoolLong?: number;
  imageUrl: string;
}

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
