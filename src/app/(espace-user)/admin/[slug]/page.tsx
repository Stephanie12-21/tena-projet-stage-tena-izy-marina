"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/provider";
import { ProtectedRoute } from "@/app/context/protectedtoute";
import { Users, UserCircle, Bus, User, MapPin } from "lucide-react";
import { ScanLog } from "../../../../../generated/prisma";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { ChildWithRelations } from "@/lib/types/user-interface";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  totalUsers: number;
  totalDrivers: number;
  totalChildren: number;
  totalBuses: number;
}

interface HistoryItem {
  date: string;
  newUsers: number;
  newChildren: number;
  activeSubscriptions: number;
}

interface ApiDailyResponse {
  totalChildren: number;
  totalParents: number;
  totalBuses: number;
  totalAnomalies: number;
  childrenByDay: { date: string; count: number }[];
  usersByDay: { date: string; count: number }[];
  activeSubscriptionsByMonth: { month: string; count: number }[];
}

const MainPageAsParent = () => {
  const { user, dbUser, loading } = useAuth();
  const [scanLogs, setScanLogs] = useState<
    (ScanLog & { child: ChildWithRelations })[]
  >([]);
  const [scanError, setScanError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDrivers: 0,
    totalChildren: 0,
    totalBuses: 0,
  });
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  const filteredHistory = historyData.filter(
    (item) => item.date.slice(0, 7) === selectedMonth
  );

  // Fetch scans
  useEffect(() => {
    const fetchScanLogs = async () => {
      if (!dbUser?.id) return;
      try {
        const response = await fetch(`/api/get-scanlog/all`);
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des scans");
        const data: { logs: (ScanLog & { child: ChildWithRelations })[] } =
          await response.json();
        setScanLogs(data.logs || []);
      } catch (err: unknown) {
        if (err instanceof Error) setScanError(err.message);
        else setScanError("Impossible de récupérer les scans");
      }
    };
    fetchScanLogs();
  }, [dbUser?.id]);

  // Fetch global stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data: Stats = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
      }
    };
    if (user) fetchStats();
  }, [user]);

  // Fetch daily stats for chart
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/stats/daily");
        const data: ApiDailyResponse = await res.json();

        const datesSet = new Set<string>([
          ...data.usersByDay.map((u) => u.date),
          ...data.childrenByDay.map((c) => c.date),
        ]);

        const history: HistoryItem[] = Array.from(datesSet)
          .sort()
          .map((date) => {
            const userDay = data.usersByDay.find((u) => u.date === date);
            const childrenDay = data.childrenByDay.find((c) => c.date === date);
            const month = date.slice(0, 7);
            const subscription = data.activeSubscriptionsByMonth.find(
              (s) => s.month === month
            );

            return {
              date,
              newUsers: userDay?.count ?? 0,
              newChildren: childrenDay?.count ?? 0,
              activeSubscriptions: subscription?.count ?? 0,
            };
          });

        setHistoryData(history);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des statistiques historiques:",
          error
        );
        setHistoryData([]);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-8">
          {/* Header skeleton */}
          <div className="bg-card shadow-sm border-b border-border rounded-2xl p-6 mb-8">
            <Skeleton className="h-10 w-1/3 mb-2" />
            <Skeleton className="h-5 w-1/4" />
          </div>

          {/* Stat cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-2xl" />
            ))}
          </div>

          {/* Chart skeleton */}
          <Skeleton className="h-80 w-full rounded-2xl mb-8" />

          {/* Derniers scans skeleton */}
          <div className="lg:col-span-2 bg-card rounded-2xl p-8 shadow-sm border border-border mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/5 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            ))}
          </div>

          {/* Profil utilisateur skeleton */}
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
            <Skeleton className="h-6 w-1/2 mb-4" />
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center bg-card p-8 rounded-2xl shadow-lg border border-border">
          <p className="text-muted-foreground">
            Vous n&apos;êtes pas connecté.
          </p>
        </div>
      </div>
    );

  const statCards = [
    {
      title: "Utilisateurs",
      value: stats.totalUsers,
      icon: Users,
      colorClass: "text-blue-500",
      bgClass: "bg-blue-500/10",
    },
    {
      title: "Chauffeurs",
      value: stats.totalDrivers,
      icon: UserCircle,
      colorClass: "text-accent",
      bgClass: "bg-accent/10",
    },
    {
      title: "Élèves",
      value: stats.totalChildren,
      icon: Users,
      colorClass: "text-primary",
      bgClass: "bg-primary/10",
    },
    {
      title: "Bus",
      value: stats.totalBuses,
      icon: Bus,
      colorClass: "text-orange-400",
      bgClass: "bg-orange-400/10",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  Tableau de bord
                </h1>
                <p className="text-muted-foreground mt-2 flex items-center gap-2">
                  Bienvenue, {dbUser?.prenom} {dbUser?.nom}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-border hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        {stat.title}
                      </p>
                      <p className="text-4xl font-bold text-card-foreground mb-1">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`${stat.bgClass} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`${stat.colorClass} w-7 h-7`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="mt-8 bg-card p-8 rounded-2xl shadow-sm border border-border">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-card-foreground flex items-center gap-2">
                  Aperçu graphique
                </h2>
              </div>
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl border border-border">
                <label className="text-sm font-medium text-muted-foreground">
                  Mois :
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border-none bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={filteredHistory}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient
                    id="colorChildren"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="date"
                  className="text-muted-foreground"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  allowDecimals={false}
                  domain={[0, "dataMax"]}
                  className="text-muted-foreground"
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="circle"
                />
                <Bar
                  dataKey="newUsers"
                  name="Utilisateurs créés"
                  fill="url(#colorUsers)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="newChildren"
                  name="Enfants ajoutés"
                  fill="url(#colorChildren)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="activeSubscriptions"
                  name="Abonnements actifs"
                  fill="url(#colorSubs)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Derniers scans */}
            <div className="lg:col-span-2 bg-card rounded-2xl p-8 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-card-foreground">
                    Derniers scans
                  </h2>
                </div>
              </div>

              {scanError && (
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 mb-4">
                  <p className="text-sm text-destructive">{scanError}</p>
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
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden ${
                              scan.type === "BOARDING"
                                ? "bg-accent/20"
                                : "bg-secondary/20"
                            }`}
                          >
                            {scan.child?.imageprofile?.url ? (
                              <Image
                                height={40}
                                width={40}
                                src={scan.child.imageprofile.url}
                                alt={`${scan.child.prenom} ${scan.child.nom}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User
                                className={`w-5 h-5 ${
                                  scan.type === "BOARDING"
                                    ? "text-accent"
                                    : "text-secondary"
                                }`}
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-card-foreground">
                              {scan.child?.prenom ?? ""} {scan.child?.nom ?? ""}
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
                          {scan.type === "BOARDING" ? "Montée" : "Descente"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Aucun scan récent</p>
                </div>
              )}
            </div>

            {/* User Details Card */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-card-foreground">
                    Profil utilisateur
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    Nom
                  </p>
                  <p className="text-lg font-semibold text-card-foreground">
                    {dbUser?.nom}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    Prénom
                  </p>
                  <p className="text-lg font-semibold text-card-foreground">
                    {dbUser?.prenom}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    ID Utilisateur
                  </p>
                  <p className="text-xs font-mono text-muted-foreground break-all bg-muted/50 p-3 rounded-lg border border-border">
                    {dbUser?.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MainPageAsParent;
