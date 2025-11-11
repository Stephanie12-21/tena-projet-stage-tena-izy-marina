"use client";

import { useAuth } from "@/app/context/provider";
import { useDriverSupabaseRealtime } from "@/hooks/useDriverWebSocket";
import { MapPin, AlertCircle, User, Bus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Children, ScanLog } from "../../../../../generated/prisma";

export default function DriverDashboard() {
  const { user, dbUser, loading } = useAuth();
  const { position } = useDriverSupabaseRealtime(dbUser?.id);
  const [mounted, setMounted] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<string>("—");
  const [scanLogs, setScanLogs] = useState<(ScanLog & { child: Children })[]>(
    []
  );
  const [scanError, setScanError] = useState<string | null>(null);
  const [busInfo, setBusInfo] = useState<{
    numero: string;
    passengersCount: number;
  } | null>(null);

  useEffect(() => setMounted(true), []);

  // Récupération bus
  useEffect(() => {
    const fetchBusInfo = async () => {
      if (!dbUser?.id) return;
      try {
        const response = await fetch(`/api/users/driver/${dbUser.id}`);
        if (!response.ok) return;
        const data = await response.json();
        if (data.bus) {
          setBusInfo({
            numero: data.bus.matricule,
            passengersCount: data.bus.children?.length || 0,
          });
        } else setBusInfo(null);
      } catch {
        setBusInfo(null);
      }
    };
    fetchBusInfo();
  }, [dbUser?.id]);

  // Récupération logs de scan
  useEffect(() => {
    const fetchScanLogs = async () => {
      if (!dbUser?.id) return;
      try {
        const response = await fetch(`/api/get-scanlog?driverId=${dbUser.id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des scans");
        }

        // Typage correct pour inclure la relation `child`
        const data: { logs: (ScanLog & { child: Children })[] } =
          await response.json();
        setScanLogs(data.logs || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setScanError(err.message);
        } else {
          setScanError("Impossible de récupérer les scans");
        }
      }
    };

    fetchScanLogs();
  }, [dbUser?.id]);

  // Récupération adresse via Geoapify
  useEffect(() => {
    const fetchAddress = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`
        );
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          setCurrentAddress(data.features[0].properties.formatted);
        } else {
          setCurrentAddress("Adresse introuvable");
        }
      } catch {
        setCurrentAddress("Erreur récupération adresse");
      }
    };

    if (position) {
      fetchAddress(position.lat, position.lon);
    }
  }, [position]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="fixed inset-0 bg-linear-to-br from-orange-50 via-transparent to-purple-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Bienvenue, {dbUser?.prenom || "Driver"}
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Gérez vos trajets et consultez vos données en temps réel
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Adresse actuelle */}
          <div className="group relative overflow-hidden bg-white/50 border border-gray-200/50 rounded-2xl p-6 hover:border-gray-300 transition-all duration-300">
            <div className="absolute inset-0 bg-linear-to-br from-green-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">Adresse actuelle</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentAddress}
              </p>
            </div>
          </div>

          {/* Bus Number */}
          <div className="group relative overflow-hidden bg-white/50 border border-gray-200/50 rounded-2xl p-6 hover:border-gray-300 transition-all duration-300">
            <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">Bus assigné</p>
              <p className="text-2xl font-bold text-gray-900">
                {busInfo?.numero || "N/A"}
              </p>
            </div>
          </div>

          {/* Passengers Count */}
          <div className="group relative overflow-hidden bg-white/50 border border-gray-200/50 rounded-2xl p-6 hover:border-gray-300 transition-all duration-300">
            <div className="absolute inset-0 bg-linear-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">Passagers</p>
              <p className="text-2xl font-bold text-gray-900">
                {busInfo?.passengersCount ?? "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Position + Profil */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Derniers scans */}
          <div className="lg:col-span-2 bg-white/50 border border-gray-200/50 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-500" />
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
              <ul className="space-y-2">
                {scanLogs.map((scan) => (
                  <li
                    key={scan.id}
                    className="p-4 rounded-xl bg-white/30 border border-gray-200 flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-900">
                      {scan.child?.prenom ?? ""} {scan.child?.nom ?? ""}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(scan.createdAt).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {scan.type === "BOARDING" ? "Montée" : "Descente"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Aucun scan récent.</p>
            )}
          </div>

          {/* User Details Card */}
          <div className="bg-white/50 border border-gray-200/50 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Profil</h2>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/30 border border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Nom
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {dbUser?.nom}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/30 border border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Prénom
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {dbUser?.prenom}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
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
