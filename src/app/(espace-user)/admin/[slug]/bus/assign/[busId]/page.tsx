import AssignChildrenForm from "@/components/features/AssignChildrenForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Bus, ChildWithRelations } from "@/lib/types/user-interface";
interface BusPageProps {
  params: { busId: string };
}

export default async function BusAssignPage({ params }: BusPageProps) {
  // 🔹 Inclure toutes les relations pour children
  const busRaw = await prisma.bus.findUnique({
    where: { id: params.busId },
    include: {
      driver: true,
      children: {
        include: {
          school: true,
          imageprofile: true,
          parent: true,
        },
      },
    },
  });

  if (!busRaw) return notFound();

  // Prisma renvoie déjà toutes les relations, donc on peut caster
  const assignedChildren = busRaw.children as ChildWithRelations[];

  // Récupérer les enfants sans bus, avec relations
  const childrenWithoutBus = (await prisma.children.findMany({
    where: { busId: null },
    include: { school: true, imageprofile: true, parent: true },
  })) as ChildWithRelations[];

  // Construire le bus avec children correctement typés
  const bus: Bus & { children: ChildWithRelations[] } = {
    id: busRaw.id,
    matricule: busRaw.matricule,
    brand: busRaw.brand,
    seats: busRaw.seats,
    status: busRaw.status,
    driver: busRaw.driver,
    children: assignedChildren,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Assignation enfants au bus {bus.matricule} (
        {bus.seats - bus.children.length} places disponibles)
      </h1>

      <AssignChildrenForm bus={bus} busChildren={childrenWithoutBus} />
    </div>
  );
}
