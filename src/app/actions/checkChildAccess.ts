// "use server";

// import { prisma } from "@/lib/prisma";
// import { ChildWithRelations } from "@/lib/types/user-interface";

// export type CheckChildAccessResult = {
//   allowed: boolean;
//   child?: ChildWithRelations;
// };

// export async function checkChildAccess(
//   userId: string,
//   childId: string
// ): Promise<CheckChildAccessResult> {
//   // 🔹 Récupération de l'utilisateur
//   const user = await prisma.users.findUnique({ where: { id: userId } });
//   if (!user) return { allowed: false };

//   // 🔹 Récupération de l’enfant avec relations
//   const child = await prisma.children.findUnique({
//     where: { id: childId },
//     include: {
//       parent: true,
//       school: true,
//       bus: { include: { driver: true } },
//       imageprofile: true,
//     },
//   });

//   if (!child) return { allowed: false };

//   // 🔹 Vérifications d'autorisation
//   if (user.role === "ADMIN") return { allowed: true, child };
//   if (child.parentId === user.id) return { allowed: true, child };
//   if (child.bus?.driverId === user.id) return { allowed: true, child };

//   // 🔹 Accès refusé
//   return { allowed: false };
// }
"use server";

import { prisma } from "@/lib/prisma";
import { ChildWithRelations } from "@/lib/types/user-interface";

export type CheckChildAccessResult = {
  allowed: boolean;
  child?: ChildWithRelations;
};

export async function checkChildAccess(
  userId: string,
  childId: string
): Promise<CheckChildAccessResult> {
  // 🔹 Récupération de l'utilisateur
  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) return { allowed: false };

  // 🔹 Récupération de l’enfant avec ses relations
  const child = await prisma.children.findUnique({
    where: { id: childId },
    include: {
      parent: true,
      school: true,
      bus: { include: { driver: true } },
      imageprofile: true,
      scanLogs: true, // si nécessaire
    },
  });

  if (!child) return { allowed: false };

  // 🔹 Vérifications d'autorisation
  const isAdmin = user.role === "ADMIN";
  const isParent = child.parentId === user.id;
  const isDriver = child.bus?.driverId === user.id;

  if (isAdmin || isParent || isDriver) {
    return { allowed: true, child };
  }

  // 🔹 Accès refusé
  return { allowed: false };
}
