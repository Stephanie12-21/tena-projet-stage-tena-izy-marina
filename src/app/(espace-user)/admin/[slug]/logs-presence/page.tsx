"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
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
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [filterType, setFilterType] = useState<"ALL" | "BOARDING" | "DROPOFF">(
    "ALL"
  );
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Fetch logs
  useEffect(() => {
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
  }, []);

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

  const totalPages = Math.ceil(filteredLogs.length / LOGS_PER_PAGE);
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * LOGS_PER_PAGE;
    return filteredLogs.slice(startIndex, startIndex + LOGS_PER_PAGE);
  }, [filteredLogs, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, startDate, endDate]);

  const totalBoarding = useMemo(
    () => filteredLogs.filter((l) => l.type === "BOARDING").length,
    [filteredLogs]
  );
  const totalDropoff = useMemo(
    () => filteredLogs.filter((l) => l.type === "DROPOFF").length,
    [filteredLogs]
  );

  const resetFilters = () => {
    setFilterType("ALL");
    setStartDate("");
    setEndDate("");
  };

  const hasActiveFilters = filterType !== "ALL" || startDate || endDate;

  if (loadingLogs) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-border rounded-full"></div>
            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-muted-foreground text-sm">
            Chargement des logs...
          </p>
        </div>
      </div>
    );
  }

  if (!logs.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-6">
        <div className="bg-card border border-border px-6 py-5 rounded-lg flex items-start gap-4 max-w-md">
          <div className="bg-muted p-2 rounded-md shrink-0">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-base mb-1 text-foreground">
              Aucun log disponible
            </h3>
            <p className="text-muted-foreground text-sm">
              Aucun log de présence n&apos;a été trouvé pour ce chauffeur.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header minimaliste */}
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <div className="p-3 rounded-lg bg-muted">
            <Clock className="w-6 h-6 text-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-foreground">
              Logs de Présence
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredLogs.length} log{filteredLogs.length > 1 ? "s" : ""}{" "}
              trouvé{filteredLogs.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Stats Cards minimalistes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg p-5 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">
                Total
              </span>
            </div>
            <p className="text-3xl font-semibold text-foreground">
              {filteredLogs.length}
            </p>
          </div>

          <div className="bg-card rounded-lg p-5 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <ArrowUp className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground font-medium">
                Montées
              </span>
            </div>
            <p className="text-3xl font-semibold text-green-600">
              {totalBoarding}
            </p>
          </div>

          <div className="bg-card rounded-lg p-5 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <ArrowDown className="w-5 h-5 text-red-600" />
              <span className="text-sm text-muted-foreground font-medium">
                Descentes
              </span>
            </div>
            <p className="text-3xl font-semibold text-red-600">
              {totalDropoff}
            </p>
          </div>
        </div>

        {/* Filtres minimalistes */}
        <div className="bg-card rounded-lg p-5 border border-border">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">
                Filtres
              </h2>
              {hasActiveFilters && (
                <span className="px-2 py-0.5 text-xs font-medium rounded bg-primary/10 text-primary">
                  Actifs
                </span>
              )}
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
                Réinitialiser
              </button>
            )}
          </div>
          <div className="flex items-end gap-4 w-full">
            {/* Boutons */}
            <button
              onClick={() => setFilterType("ALL")}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterType === "ALL"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Tous
            </button>

            <button
              onClick={() => setFilterType("BOARDING")}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
                filterType === "BOARDING"
                  ? "bg-green-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Montées</span>
            </button>

            <button
              onClick={() => setFilterType("DROPOFF")}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
                filterType === "DROPOFF"
                  ? "bg-red-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Descentes</span>
            </button>

            {/* Date début */}
            <div className="flex-1 flex flex-col">
              <label className="text-xs font-medium text-muted-foreground mb-1.5">
                Date de début
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full"
              />
            </div>

            {/* Date fin */}
            <div className="flex-1 flex flex-col">
              <label className="text-xs font-medium text-muted-foreground mb-1.5">
                Date de fin
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full"
              />
            </div>
          </div>
        </div>

        {/* Table des logs minimaliste */}
        {filteredLogs.length === 0 ? (
          <div className="bg-card border border-border rounded-lg px-6 py-12 text-center">
            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-base text-foreground mb-1">
              Aucun résultat
            </h3>
            <p className="text-sm text-muted-foreground">
              Aucun log ne correspond aux filtres sélectionnés.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="bg-muted px-6 py-3 border-b border-border">
                <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted-foreground">
                  <div className="col-span-3">Enfant</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Bus</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-3">Heure</div>
                </div>
              </div>

              <div className="divide-y divide-border">
                {paginatedLogs.map((log) => (
                  <div
                    key={log.id}
                    className="px-6 py-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-border">
                          {log.child.imageprofile?.url ? (
                            <Image
                              width={36}
                              height={36}
                              src={log.child.imageprofile.url}
                              alt={`${log.child.prenom} ${log.child.nom}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                              {log.child.prenom[0]}
                              {log.child.nom[0]}
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-sm text-foreground">
                          {log.child.prenom} {log.child.nom}
                        </span>
                      </div>

                      <div className="col-span-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                            log.type === "BOARDING"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
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

                      <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
                        <Bus className="w-4 h-4" />
                        <span className="font-medium text-sm text-foreground">
                          {log.bus.matricule}
                        </span>
                      </div>

                      <div className="col-span-2 text-sm text-muted-foreground">
                        {formatDateShort(log.createdAt)}
                      </div>

                      <div className="col-span-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {formatTime(log.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination minimaliste */}
            {totalPages > 1 && (
              <div className="bg-card rounded-lg border border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Page{" "}
                    <span className="font-medium text-foreground">
                      {currentPage}
                    </span>{" "}
                    sur{" "}
                    <span className="font-medium text-foreground">
                      {totalPages}
                    </span>{" "}
                    • {(currentPage - 1) * LOGS_PER_PAGE + 1}-
                    {Math.min(currentPage * LOGS_PER_PAGE, filteredLogs.length)}{" "}
                    sur {filteredLogs.length}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
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
                              <span className="px-2 text-muted-foreground">
                                ...
                              </span>
                            )}
                            <button
                              onClick={() => setCurrentPage(page)}
                              className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                                currentPage === page
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-muted text-muted-foreground"
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
                      className="p-2 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LogsPresences;
