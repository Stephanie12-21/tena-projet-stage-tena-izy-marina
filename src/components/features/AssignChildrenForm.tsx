"use client";

import { ChildWithRelations, Bus } from "@/lib/types/user-interface";
import { useRouter } from "next/navigation";

interface AssignChildrenFormProps {
  bus: Bus & { children?: ChildWithRelations[] };
  busChildren: ChildWithRelations[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AssignChildrenForm({
  bus,
  busChildren,
  selected,
  setSelected,
}: AssignChildrenFormProps) {
  const router = useRouter();

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const alreadyAssigned = bus.children?.length ?? 0;
  const availableSeats = bus.seats - alreadyAssigned - selected.length;

  if (!Array.isArray(busChildren)) busChildren = []; // ✅ fallback

  const handleAssign = async () => {
    if (selected.length === 0) return alert("Sélectionnez au moins un enfant");

    const res = await fetch("/api/bus/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ busId: bus.id, childrenIds: selected }),
    });

    if (res.ok) {
      alert("Enfants assignés avec succès !");
      router.back();
    } else {
      const data = await res.json();
      alert(data.error || "Erreur lors de l'assignation");
    }
  };

  return (
    <div>
      <ul className="space-y-2">
        {busChildren.map((child) => (
          <li
            key={child.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <div>
              {child.prenom} {child.nom} - {child.adresse}
            </div>
            <input
              type="checkbox"
              checked={selected.includes(child.id)}
              onChange={() => toggleSelect(child.id)}
              disabled={availableSeats <= 0 && !selected.includes(child.id)}
            />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between items-center">
        <span>Places restantes après sélection: {availableSeats}</span>
        <button
          onClick={handleAssign}
          disabled={selected.length === 0 || availableSeats < 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Assigner au bus
        </button>
      </div>
    </div>
  );
}
