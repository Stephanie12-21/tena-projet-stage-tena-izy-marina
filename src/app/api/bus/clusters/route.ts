import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { kmeans } from "ml-kmeans";
import fetch from "node-fetch";

// -------------------- TYPES --------------------
type Point = { lat: number; lon: number };

type OsrmTableResponse = {
  distances: number[][];
  durations?: number[][];
  sources?: { location: [number, number]; name?: string }[];
  destinations?: { location: [number, number]; name?: string }[];
};

type ChildOrder = {
  id: string;
  nom: string;
  prenom: string;
  school?: string;
};

type BusAssignment = {
  busId: string;
  busMatricule: string;
  driver: string;
  pickupOrder: ChildOrder[];
  dropOrder: ChildOrder[];
};

// -------------------- FONCTIONS UTILITAIRES --------------------

// Crée la matrice de distances via OSRM avec validation stricte
async function getDistanceMatrix(points: Point[]): Promise<number[][]> {
  if (points.length < 2) return [[0]];

  const coords = points.map((p) => `${p.lon},${p.lat}`).join(";");
  const url = `http://router.project-osrm.org/table/v1/driving/${coords}?annotations=distance`;

  const res = await fetch(url);
  const rawData: unknown = await res.json();

  function isOsrmTableResponse(obj: unknown): obj is OsrmTableResponse {
    if (typeof obj !== "object" || obj === null) return false;
    if (!("distances" in obj)) return false;
    const distances = (obj as OsrmTableResponse).distances;
    return (
      Array.isArray(distances) &&
      distances.every(
        (row) => Array.isArray(row) && row.every((v) => typeof v === "number")
      )
    );
  }

  if (!isOsrmTableResponse(rawData)) {
    throw new Error("Erreur OSRM: distances manquantes ou type invalide");
  }

  return rawData.distances;
}

// TSP heuristique (Nearest Neighbor)
function tspRouteMatrix(matrix: number[][], startIdx = 0): number[] {
  const n = matrix.length;
  const visited = new Set<number>();
  const route: number[] = [startIdx];
  visited.add(startIdx);
  let current = startIdx;

  while (route.length < n) {
    let nearest = -1;
    let minDist = Infinity;
    for (let i = 0; i < n; i++) {
      if (!visited.has(i) && matrix[current][i] < minDist) {
        minDist = matrix[current][i];
        nearest = i;
      }
    }
    route.push(nearest);
    visited.add(nearest);
    current = nearest;
  }

  return route;
}

// -------------------- API --------------------
export async function POST() {
  try {
    // 1️⃣ Récupérer tous les enfants avec écoles
    const children = await prisma.children.findMany({
      include: { school: true },
    });
    if (!children.length)
      return NextResponse.json(
        { message: "Aucun enfant trouvé" },
        { status: 404 }
      );

    // 2️⃣ Récupérer les bus disponibles
    const buses = await prisma.bus.findMany({
      where: { status: "ACTIF" },
      include: { driver: true },
    });
    if (!buses.length)
      return NextResponse.json(
        { message: "Aucun bus disponible" },
        { status: 400 }
      );

    // 3️⃣ Clustering géographique (nombre de clusters = nombre de bus)
    const coords = children.map((c) => [c.homeLat, c.homeLong]);
    const k = Math.min(buses.length, children.length);
    const { clusters } = kmeans(coords, k, {});

    const busAssignments: BusAssignment[] = [];

    for (let i = 0; i < k; i++) {
      const bus = buses[i];
      const clusterChildren = children.filter((_, idx) => clusters[idx] === i);

      // 4️⃣ Calcul TSP ramassage (maisons)
      const pickupPoints: Point[] = clusterChildren.map((c) => ({
        lat: c.homeLat,
        lon: c.homeLong,
      }));
      const pickupMatrix = await getDistanceMatrix(pickupPoints);
      const pickupOrderIdx = tspRouteMatrix(pickupMatrix);
      const pickupOrder: ChildOrder[] = pickupOrderIdx.map((idx: number) => {
        const c = clusterChildren[idx];
        return { id: c.id, nom: c.nom, prenom: c.prenom };
      });

      // 5️⃣ Calcul TSP dépôt (écoles)
      const dropPoints: Point[] = clusterChildren.map((c) => ({
        lat: c.school.schoolLat,
        lon: c.school.schoolLong,
      }));
      const dropMatrix = await getDistanceMatrix(dropPoints);
      const dropOrderIdx = tspRouteMatrix(dropMatrix);
      const dropOrder: ChildOrder[] = dropOrderIdx.map((idx: number) => {
        const c = clusterChildren[idx];
        return { id: c.id, nom: c.nom, prenom: c.prenom, school: c.school.nom };
      });

      // 6️⃣ Mise à jour bus en base (batch)
      await prisma.children.updateMany({
        where: { id: { in: clusterChildren.map((c) => c.id) } },
        data: { busId: bus.id },
      });

      busAssignments.push({
        busId: bus.id,
        busMatricule: bus.matricule,
        driver: bus.driver?.nom ?? "Non assigné",
        pickupOrder,
        dropOrder,
      });
    }

    return NextResponse.json({
      message: "Routes calculées avec distances réelles",
      clusters: busAssignments,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
