"use server";

import { prisma } from "@/lib/prisma";
import { BusStatus } from "../../../generated/prisma";

type PrismaError = {
  code?: string;
  message?: string;
};

export async function createBusAction(data: {
  matricule: string;
  brand: string;
  seats: number;
  driverId: string;
  status: BusStatus;
}) {
  try {
    if (!data.matricule || !data.brand || !data.seats || !data.driverId) {
      return {
        success: false,
        message: "Tous les champs obligatoires doivent être remplis.",
      };
    }

    const existingBus = await prisma.bus.findUnique({
      where: { matricule: data.matricule },
    });

    if (existingBus) {
      return {
        success: false,
        message: "Un bus avec cette immatriculation existe déjà.",
      };
    }

    const newBus = await prisma.bus.create({
      data,
    });

    return {
      success: true,
      message: "Bus créé avec succès ✅",
      bus: newBus,
    };
  } catch (error: unknown) {
    console.error("Erreur lors de la création du bus :", error);

    // ✅ Type sécurisé pour erreurs Prisma
    const err = error as PrismaError;

    if (err.code === "P2003") {
      return {
        success: false,
        message:
          "Impossible d'assigner ce chauffeur (id introuvable ou supprimé).",
      };
    }

    if (err.code === "P2002") {
      return {
        success: false,
        message: "Cette immatriculation est déjà utilisée.",
      };
    }

    return {
      success: false,
      message: "Erreur serveur inconnue. Veuillez réessayer.",
      error: err.message || String(error),
    };
  }
}

interface UpdateBusInput {
  id: string;
  matricule: string;
  brand: string;
  seats: number;
  driverId: string;
  status: BusStatus;
}

export async function updateBusAction(data: UpdateBusInput) {
  try {
    // Vérifier que le bus existe
    const existingBus = await prisma.bus.findUnique({
      where: { id: data.id },
    });

    if (!existingBus) {
      return { success: false, message: "Bus introuvable" };
    }

    // Mettre à jour le bus
    const updatedBus = await prisma.bus.update({
      where: { id: data.id },
      data: {
        matricule: data.matricule,
        brand: data.brand,
        seats: data.seats,
        driverId: data.driverId,
        status: data.status,
      },
    });

    return { success: true, bus: updatedBus };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";

    console.error("Erreur updateBusAction:", error);
    return { success: false, message };
  }
}

export async function deleteBusAction(busId: string) {
  try {
    await prisma.bus.delete({
      where: { id: busId },
    });
    return { success: true };
  } catch (error) {
    console.error("Erreur suppression bus:", error);
    return { success: false, message: "Impossible de supprimer le bus." };
  }
}
