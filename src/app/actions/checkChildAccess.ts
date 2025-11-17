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
  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) return { allowed: false };

  const child = await prisma.children.findUnique({
    where: { id: childId },
    include: {
      parent: true,
      school: true,
      bus: { include: { driver: true } },
      imageprofile: true,
      scanLogs: true,
    },
  });

  if (!child) return { allowed: false };

  const isAdmin = user.role === "ADMIN";
  const isParent = child.parentId === user.id;

  const isDriver = child.bus?.driver?.id === user.id;

  if (isAdmin || isParent || isDriver) {
    return { allowed: true, child };
  }

  return { allowed: false };
}
