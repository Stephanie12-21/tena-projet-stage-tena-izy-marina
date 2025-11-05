"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AssignChildrenForm from "@/components/features/AssignChildrenForm";
import { Bus, ChildWithRelations } from "@/lib/types/user-interface";

export default function BusAssignPage() {
  const params = useParams();
  const id = params.busId;

  const [bus, setBus] = useState<
    (Bus & { children: ChildWithRelations[] }) | null
  >(null);
  const [childrenWithoutBus, setChildrenWithoutBus] = useState<
    ChildWithRelations[]
  >([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBusAndChildren = async () => {
      setLoading(true);
      try {
        // 🔹 Bus
        const busRes = await fetch(`/api/bus/${id}`, { cache: "no-store" });
        if (!busRes.ok) throw new Error("Erreur API bus");
        const busJson = await busRes.json();
        setBus(busJson);

        // 🔹 Enfants avec abonnement actif et sans bus
        const childrenRes = await fetch(`/api/children/available`, {
          cache: "no-store",
        });
        if (!childrenRes.ok) throw new Error("Erreur API enfants disponibles");

        const childrenJson = await childrenRes.json();
        setChildrenWithoutBus(
          Array.isArray(childrenJson.children) ? childrenJson.children : []
        );
        console.log("Enfants disponibles :", childrenJson.children);

        console.log("Bus :", busJson);
        console.log("Enfants disponibles :", childrenJson);
      } catch (err) {
        console.error(err);
        setBus(null);
        setChildrenWithoutBus([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusAndChildren();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!bus) return <p>Bus introuvable.</p>;
  console.log("Enfants disponibles pour le bus :", childrenWithoutBus);

  const availableSeats =
    bus.seats - (bus.children?.length ?? 0) - selected.length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Assignation enfants au bus {bus.matricule} ({availableSeats} places
        disponibles)
      </h1>
      <AssignChildrenForm
        bus={bus}
        busChildren={childrenWithoutBus}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}
