"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Child {
  id: string;
  nom: string;
  prenom: string;
}

interface SchoolWithChildren {
  id: string;
  nom: string;
  schoolLat: number;
  schoolLong: number;
  children: Child[];
}

export default function AssignChildrenPage() {
  const params = useParams();
  const busId = params?.busId as string;
  const router = useRouter();

  const [schools, setSchools] = useState<SchoolWithChildren[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/children/group-by-school");
        if (!res.ok) throw new Error("Erreur lors du chargement des écoles");

        const data: SchoolWithChildren[] = await res.json();
        setSchools(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const handleAssignSchool = async (schoolId: string) => {
    setAssigning(true);
    try {
      const res = await fetch("/api/bus/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ busId, schoolId }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'affectation");

      alert("Tous les enfants de l'école ont été affectés !");
      // Optionnel : retirer cette école de la liste
      setSchools((prev) => prev.filter((s) => s.id !== schoolId));
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'affectation");
    } finally {
      setAssigning(false);
    }
  };

  if (loading) return <p className="p-6">Chargement...</p>;

  return (
    <div className="p-6">
      <Button onClick={() => router.back()}>⬅ Retour</Button>
      <h1 className="text-2xl font-bold mt-4">Affecter des élèves au bus</h1>

      {schools.length === 0 ? (
        <p className="mt-4 text-gray-500">
          Aucune école avec des enfants disponibles.
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {schools.map((school) => (
            <Card key={school.id} className="p-4">
              <p>
                <strong>École :</strong> {school.nom}
              </p>
              <p>
                <strong>Enfants disponibles :</strong> {school.children.length}
              </p>
              <ul className="mt-2 ml-4 list-disc">
                {school.children.map((child) => (
                  <li key={child.id}>
                    {child.nom} {child.prenom}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-4"
                onClick={() => handleAssignSchool(school.id)}
                disabled={assigning}
              >
                {assigning
                  ? "Affectation en cours..."
                  : "✅ Affecter tous les enfants au bus"}
              </Button>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
