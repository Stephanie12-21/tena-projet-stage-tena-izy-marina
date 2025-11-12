"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useAuth } from "@/app/context/provider";
import {
  Clock,
  Bus,
  ArrowUp,
  ArrowDown,
  Calendar,
  AlertCircle,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

interface ScanLog {
  id: string;
  childId: string;
  busId: string;
  driverId: string;
  type: "BOARDING" | "DROPOFF";
  lat: number;
  long: number;
  createdAt: string;
  child: {
    id: string;
    nom: string;
    prenom: string;
    adresse: string;
    homeLat: number;
    homeLong: number;
    arrivalTime: string;
    departureTime: string;
    schoolId: string;
    imageprofileId: string;
    parentId: string;
    subscriptionId: string;
    busId: string;
    createdAt: string;
    updatedAt: string;
    imageprofile?: {
      id: string;
      url: string;
    } | null;
  };
  bus: {
    id: string;
    matricule: string;
    brand: string;
    seats: number;
    status: string;
    driverId: string;
    createdAt: string;
    updatedAt: string;
  };
  driver: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

const LOGS_PER_PAGE = 10;

const LogsPresences = () => {
  const { dbUser, loading } = useAuth();
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtres
  const [filterType, setFilterType] = useState<"ALL" | "BOARDING" | "DROPOFF">(
    "ALL"
  );
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // === Fetch data ============================================================
  useEffect(() => {
    if (loading || !dbUser) return;

    const controller = new AbortController();

    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/get-scanlog/all`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Impossible de récupérer les logs");
        const data = await res.json();
        setLogs(data.logs || []);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          console.error(err);
        }
      } finally {
        setLoadingLogs(false);
      }
    };

    fetchLogs();
    return () => controller.abort();
  }, [dbUser, loading]);

  // === Utils ================================================================

  const formatDateShort = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  const formatTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  // === Filtrage des logs ====================================================
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (filterType !== "ALL" && log.type !== filterType) return false;

      const logDate = new Date(log.createdAt);
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (logDate < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (logDate > end) return false;
      }

      return true;
    });
  }, [logs, filterType, startDate, endDate]);

  // === Pagination ===========================================================
  const totalPages = Math.ceil(filteredLogs.length / LOGS_PER_PAGE);
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * LOGS_PER_PAGE;
    return filteredLogs.slice(startIndex, startIndex + LOGS_PER_PAGE);
  }, [filteredLogs, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, startDate, endDate]);

  const totalBoarding = useMemo(
    () => filteredLogs.filter((l) => l.type === "BOARDING").length,
    [filteredLogs]
  );
  const totalDroppoff = useMemo(
    () => filteredLogs.filter((l) => l.type === "DROPOFF").length,
    [filteredLogs]
  );

  const resetFilters = () => {
    setFilterType("ALL");
    setStartDate("");
    setEndDate("");
  };

  const hasActiveFilters = filterType !== "ALL" || startDate || endDate;

  // === Render states ========================================================
  if (loading || loadingLogs) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-slate-600 font-medium">Chargement des logs...</p>
        </div>
      </div>
    );
  }

  if (!logs.length) {
    return (
      <div className="flex items-center justify-center min-h-[500px] p-6">
        <div className="bg-slate-50 border border-slate-200 text-slate-700 px-6 py-5 rounded-2xl flex items-start gap-4 max-w-md">
          <div className="bg-slate-200 p-2 rounded-lg shrink-0">
            <AlertCircle className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Aucun log disponible</h3>
            <p className="text-slate-600 text-sm">
              Aucun log de présence n&apos;a été trouvé pour ce chauffeur.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // === Main render ==========================================================
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">
              Logs de Présence
            </h1>
            <p className="text-orange-100">
              {filteredLogs.length} log{filteredLogs.length > 1 ? "s" : ""}{" "}
              trouvé{filteredLogs.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-slate-600 font-medium">Total</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {filteredLogs.length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <ArrowUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-slate-600 font-medium">Montées</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{totalBoarding}</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 p-2 rounded-lg">
              <ArrowDown className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-slate-600 font-medium">
              Descentes
            </span>
          </div>
          <p className="text-3xl font-bold text-red-600">{totalDroppoff}</p>
        </div>
      </div>

      {/* Filtres - Design amélioré */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Filter className="w-4 h-4 text-orange-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Filtres</h2>
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                Actif
              </span>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all font-medium"
            >
              <X className="w-4 h-4" />
              Réinitialiser
            </button>
          )}
        </div>

        {/* Filtres sur une seule ligne */}
        <div className="flex flex-wrap items-end gap-4">
          {/* Filtre par type */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType("ALL")}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                filterType === "ALL"
                  ? "bg-orange-600 text-white shadow-md scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilterType("BOARDING")}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                filterType === "BOARDING"
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Montées</span>
            </button>
            <button
              onClick={() => setFilterType("DROPOFF")}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                filterType === "DROPOFF"
                  ? "bg-red-600 text-white shadow-md scale-105"
                  : "bg-red-50 text-red-700 hover:bg-red-100"
              }`}
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Descentes</span>
            </button>
          </div>

          {/* Date de début */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Date de début
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-sm bg-white"
            />
          </div>

          {/* Date de fin */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Date de fin
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-sm bg-white"
            />
          </div>
        </div>
      </div>

      {/* Table des logs - Layout optimisé */}
      {filteredLogs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl px-6 py-12 text-center">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-semibold text-lg text-slate-900 mb-1">
            Aucun résultat
          </h3>
          <p className="text-slate-500 text-sm">
            Aucun log ne correspond aux filtres sélectionnés.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header du tableau */}
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
              <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                <div className="col-span-3">Enfant</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Bus</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-3">Heure</div>
              </div>
            </div>

            {/* Corps du tableau */}
            <div className="divide-y divide-slate-100">
              {paginatedLogs.map((log) => (
                <div
                  key={log.id}
                  className="px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Enfant */}
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                      {log.child.imageprofile?.url ? (
                        <Image
                          width={32}
                          height={32}
                          src={log.child.imageprofile.url}
                          alt={`${log.child.prenom} ${log.child.nom}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                          {log.child.prenom}
                          {log.child.nom}
                        </div>
                      )}
                    </div>

                    {/* Type */}
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          log.type === "BOARDING"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {log.type === "BOARDING" ? (
                          <>
                            <ArrowUp className="w-3.5 h-3.5" />
                            Montée
                          </>
                        ) : (
                          <>
                            <ArrowDown className="w-3.5 h-3.5" />
                            Descente
                          </>
                        )}
                      </span>
                    </div>

                    {/* Bus */}
                    <div className="col-span-2 flex items-center gap-2 text-slate-600">
                      <Bus className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{log.bus.matricule}</span>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 text-slate-600 text-sm">
                      {formatDateShort(log.createdAt)}
                    </div>

                    {/* Heure */}
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-semibold text-slate-700">
                          {formatTime(log.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Page{" "}
                  <span className="font-semibold text-slate-900">
                    {currentPage}
                  </span>{" "}
                  sur{" "}
                  <span className="font-semibold text-slate-900">
                    {totalPages}
                  </span>{" "}
                  • Affichage de{" "}
                  <span className="font-semibold text-slate-900">
                    {(currentPage - 1) * LOGS_PER_PAGE + 1}
                  </span>{" "}
                  à{" "}
                  <span className="font-semibold text-slate-900">
                    {Math.min(currentPage * LOGS_PER_PAGE, filteredLogs.length)}
                  </span>{" "}
                  sur{" "}
                  <span className="font-semibold text-slate-900">
                    {filteredLogs.length}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        return (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        );
                      })
                      .map((page, idx, arr) => (
                        <React.Fragment key={page}>
                          {idx > 0 && arr[idx - 1] !== page - 1 && (
                            <span className="px-2 text-slate-400">...</span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                              currentPage === page
                                ? "bg-orange-600 text-white shadow-md"
                                : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LogsPresences;
