"use client";

import { useAuth } from "@/app/context/provider";
import { AlertCircle, User, Users, Bus } from "lucide-react";
import { useEffect, useState } from "react";
import { ScanLog, ScanType } from "../../../../../generated/prisma";
import Image from "next/image";
import { ChildWithRelations } from "@/lib/types/user-interface";

export default function ParentDashboard() {
  const { user, dbUser, loading } = useAuth();

  // Récupération enfants
  const [childrenInfo, setChildrenInfo] = useState<{
    list: ChildWithRelations[];
    count: number;
  } | null>(null);

  // Récupération des derniers scans
  const [scanLogs, setScanLogs] = useState<
    (ScanLog & { child: ChildWithRelations })[]
  >([]);
  const [scanError, setScanError] = useState<string | null>(null);

  // ============ FETCH CHILDREN ============
  useEffect(() => {
    const fetchChildren = async () => {
      if (!dbUser?.id) return;

      try {
        const res = await fetch(`/api/users/${dbUser.id}/children`);
        if (!res.ok) {
          setChildrenInfo(null);
          return;
        }

        const data: ChildWithRelations[] = await res.json();

        setChildrenInfo({
          list: Array.isArray(data) ? data : [],
          count: Array.isArray(data) ? data.length : 0,
        });
      } catch (err) {
        console.error("Erreur récupération enfants :", err);
        setChildrenInfo(null);
      }
    };

    fetchChildren();
  }, [dbUser?.id]);

  // ============ FETCH SCAN LOGS ============
  useEffect(() => {
    const fetchScanLogs = async () => {
      if (!dbUser?.id) return;

      try {
        const res = await fetch(`/api/users/${dbUser.id}/children`);
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des scans");
        }

        const children: (ChildWithRelations & { scanLogs?: ScanLog[] })[] =
          await res.json();

        // Tous les scans avec enfant rattaché
        const allScans: (ScanLog & { child: ChildWithRelations })[] =
          children.flatMap((child) =>
            (child.scanLogs || []).map((scan) => ({ ...scan, child }))
          );

        // Trie par date décroissante
        const sortedScans = allScans.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        // 5 derniers scans seulement
        setScanLogs(sortedScans.slice(0, 5));
      } catch (err) {
        if (err instanceof Error) setScanError(err.message);
        else setScanError("Impossible de récupérer les scans");
      }
    };

    fetchScanLogs();
  }, [dbUser?.id]);

  // ============ LOADING ============
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  // ============ NON CONNECTÉ ============
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <p className="text-gray-700 text-lg">
            Vous n&apos;êtes pas connecté.
          </p>
        </div>
      </div>
    );
  }

  // ============ DASHBOARD ============
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Bienvenue, {dbUser?.prenom}
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Suivez vos enfants et leurs déplacements en temps réel
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Nombre d'enfants */}
          <div className="group bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-border hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Nombre d&apos;enfants
                </p>
                <p className="text-4xl font-bold text-card-foreground mb-1">
                  {childrenInfo?.count ?? 0}
                </p>
              </div>
              <div className="p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 bg-blue-500/10 text-blue-500">
                <Users className="w-7 h-7" />
              </div>
            </div>
          </div>

          {/* Bus assigné - VERSION MINIMALISTE AVEC HOVER */}
          <div className="group bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-border hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Bus assigné
                </p>
                {childrenInfo?.list.some((child) => child.bus) ? (
                  <div className="space-y-2">
                    {childrenInfo.list
                      .filter((child) => child.bus)
                      .map((child, idx) => (
                        <div key={idx} className="relative">
                          <p className="text-4xl font-bold text-card-foreground">
                            {child.bus!.matricule}
                          </p>

                          {/* Détails au hover */}
                          <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-border p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            <div className="space-y-3">
                              {child.bus?.driver ? (
                                <>
                                  <div className="border-t border-border pt-3">
                                    <p className="text-xs text-muted-foreground mb-1">
                                      Chauffeur
                                    </p>
                                    <p className="text-sm font-medium text-card-foreground">
                                      {child.bus.driver.prenom}{" "}
                                      {child.bus.driver.nom}
                                    </p>
                                  </div>
                                  {child.bus.driver.phone && (
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">
                                        Téléphone
                                      </p>
                                      <p className="text-sm text-card-foreground">
                                        {child.bus.driver.phone}
                                      </p>
                                    </div>
                                  )}
                                  {child.bus.driver.email && (
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">
                                        Email
                                      </p>
                                      <p className="text-sm text-card-foreground truncate">
                                        {child.bus.driver.email}
                                      </p>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="border-t border-border pt-3">
                                  <p className="text-sm text-muted-foreground">
                                    Aucun chauffeur assigné
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-4xl font-bold text-card-foreground">—</p>
                )}
              </div>
              <div className="p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 bg-green-500/10 text-green-500">
                <Bus className="w-7 h-7" />
              </div>
            </div>
          </div>
        </div>

        {/* Children + Scans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Derniers scans */}
          <div className="lg:col-span-2 bg-white/50 border border-gray-200/50 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <Bus className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Derniers scans
              </h2>
            </div>

            {scanError && (
              <div className="p-4 rounded-xl bg-red-100 border border-red-200 mb-4">
                <p className="text-sm text-red-500">{scanError}</p>
              </div>
            )}

            {scanLogs.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                {scanLogs.map((scan) => (
                  <div
                    key={scan.id}
                    className="p-4 rounded-xl bg-muted/50 border border-border hover:border-muted-foreground/20 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {/* Image de l'enfant */}
                        <div
                          className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ${
                            scan.type === "BOARDING"
                              ? "bg-accent/20"
                              : "bg-secondary/20"
                          }`}
                        >
                          <Image
                            src={scan.child.imageprofile.url}
                            alt={`${scan.child.prenom} ${scan.child.nom}`}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-card-foreground">
                            {scan.child.prenom} {scan.child.nom}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(scan.createdAt).toLocaleString("fr-FR")}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          scan.type === "BOARDING"
                            ? "bg-accent/20 text-accent"
                            : "bg-secondary/20 text-secondary"
                        }`}
                      >
                        {scan.type === ScanType.BOARDING
                          ? "Montée"
                          : "Descente"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bus className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Aucun scan récent</p>
              </div>
            )}
          </div>

          {/* Profil */}
          <div className="bg-white/50 border border-gray-200/50 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Profil</h2>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/30 border border-gray-200">
                <p className="text-xs text-gray-500 uppercase mb-2">Nom</p>
                <p className="text-lg font-semibold text-gray-900">
                  {dbUser?.nom}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/30 border border-gray-200">
                <p className="text-xs text-gray-500 uppercase mb-2">Prénom</p>
                <p className="text-lg font-semibold text-gray-900">
                  {dbUser?.prenom}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 uppercase mb-2">
                  ID Utilisateur
                </p>
                <p className="text-xs font-mono text-gray-600 break-all bg-white/30 p-3 rounded-lg border border-gray-200">
                  {dbUser?.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
