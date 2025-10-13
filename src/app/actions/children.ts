// app/actions/child.ts
"use server";
import { prisma } from "@/lib/prisma";

interface ChildInput {
  prenomEnfant: string;
  nomEnfant: string;
  adresse: string;
  homeLat: number;
  homeLong: number;
  photoUrl: string; // <-- on envoie l'URL au lieu du File
  parentId: string;
  schoolName: string;
  schoolAddress: string;
  schoolLat: number;
  schoolLong: number;
}

// 🔹 Fonction principale
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
