// "use client";

// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/app/context/provider";
// import {
//   Clock,
//   User,
//   Bus as BusIcon,
//   ArrowUp,
//   ArrowDown,
//   Calendar,
//   AlertCircle,
// } from "lucide-react";

// interface ScanLog {
//   id: string;
//   type: "BOARDING" | "DROPOFF";
//   createdAt: string;
//   child: { prenom: string; nom: string };
//   bus: { matricule: string };
// }

// const LogsPresences = () => {
//   const { dbUser, loading } = useAuth();
//   const [logs, setLogs] = useState<ScanLog[]>([]);
//   const [loadingLogs, setLoadingLogs] = useState(true);

//   useEffect(() => {
//     if (loading || !dbUser) return;

//     const fetchLogs = async () => {
//       try {
//         const res = await fetch(`/api/get-scanlog?driverId=${dbUser.id}`);
//         if (!res.ok) throw new Error("Impossible de récupérer les logs");
//         const data = await res.json();
//         setLogs(data.logs);
//       } catch (err: unknown) {
//         console.error(err);
//       } finally {
//         setLoadingLogs(false);
//       }
//     };

//     fetchLogs();
//   }, [dbUser, loading]);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);

//     const isToday = date.toDateString() === today.toDateString();
//     const isYesterday = date.toDateString() === yesterday.toDateString();

//     if (isToday) {
//       return `Aujourd'hui à ${date.toLocaleTimeString("fr-FR", {
//         hour: "2-digit",
//         minute: "2-digit",
//       })}`;
//     } else if (isYesterday) {
//       return `Hier à ${date.toLocaleTimeString("fr-FR", {
//         hour: "2-digit",
//         minute: "2-digit",
//       })}`;
//     } else {
//       return date.toLocaleString("fr-FR", {
//         day: "2-digit",
//         month: "short",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     }
//   };

//   const groupLogsByDate = (logs: ScanLog[]) => {
//     const grouped: { [key: string]: ScanLog[] } = {};

//     logs.forEach((log) => {
//       const date = new Date(log.createdAt);
//       const dateKey = date.toLocaleDateString("fr-FR", {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       });

//       if (!grouped[dateKey]) {
//         grouped[dateKey] = [];
//       }
//       grouped[dateKey].push(log);
//     });

//     return grouped;
//   };

//   if (loading || loadingLogs) {
//     return (
//       <div className="flex items-center justify-center min-h-[500px]">
//         <div className="flex flex-col items-center gap-4">
//           <div className="relative">
//             <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
//             <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
//           </div>
//           <p className="text-slate-600 font-medium">Chargement des logs...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!logs.length) {
//     return (
//       <div className="flex items-center justify-center min-h-[500px] p-6">
//         <div className="bg-slate-50 border border-slate-200 text-slate-700 px-6 py-5 rounded-2xl flex items-start gap-4 max-w-md">
//           <div className="bg-slate-200 p-2 rounded-lg shrink-0">
//             <AlertCircle className="w-6 h-6 text-slate-600" />
//           </div>
//           <div>
//             <h3 className="font-semibold text-lg mb-1">Aucun log disponible</h3>
//             <p className="text-slate-600 text-sm">
//               Aucun log de présence n&apos;a été trouvé pour ce chauffeur.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const groupedLogs = groupLogsByDate(logs);

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
//       {/* Header */}
//       <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
//         <div className="flex items-center gap-4">
//           <div className="bg-linear-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg">
//             <Clock className="w-8 h-8 text-white" />
//           </div>
//           <div className="flex-1">
//             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
//               Logs de Présence
//             </h1>
//             <p className="text-slate-600">
//               Historique des montées et descentes -{" "}
//               <span className="font-semibold">
//                 {logs.length} entrée{logs.length > 1 ? "s" : ""}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="bg-green-100 p-2 rounded-lg">
//               <ArrowUp className="w-5 h-5 text-green-600" />
//             </div>
//             <span className="text-sm text-slate-600 font-medium">Montées</span>
//           </div>
//           <p className="text-3xl font-bold text-slate-900">
//             {logs.filter((log) => log.type === "BOARDING").length}
//           </p>
//         </div>

//         <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="bg-red-100 p-2 rounded-lg">
//               <ArrowDown className="w-5 h-5 text-red-600" />
//             </div>
//             <span className="text-sm text-slate-600 font-medium">
//               Descentes
//             </span>
//           </div>
//           <p className="text-3xl font-bold text-slate-900">
//             {logs.filter((log) => log.type === "DROPOFF").length}
//           </p>
//         </div>
//       </div>

//       {/* Logs by Date */}
//       <div className="space-y-6">
//         {Object.entries(groupedLogs).map(([date, dateLogs]) => (
//           <div
//             key={date}
//             className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
//           >
//             {/* Date Header */}
//             <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
//               <div className="flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-slate-600" />
//                 <h2 className="text-lg font-bold text-slate-900 capitalize">
//                   {date}
//                 </h2>
//                 <span className="ml-auto bg-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
//                   {dateLogs.length} log{dateLogs.length > 1 ? "s" : ""}
//                 </span>
//               </div>
//             </div>

//             {/* Logs List */}
//             <div className="divide-y divide-slate-100">
//               {dateLogs.map((log) => (
//                 <div
//                   key={log.id}
//                   className="p-5 hover:bg-slate-50 transition-colors"
//                 >
//                   <div className="flex items-start justify-between gap-4">
//                     {/* Left side - Info */}
//                     <div className="flex-1 space-y-3">
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`p-2 rounded-lg ${
//                             log.type === "BOARDING"
//                               ? "bg-green-100"
//                               : "bg-red-100"
//                           }`}
//                         >
//                           {log.type === "BOARDING" ? (
//                             <ArrowUp
//                               className={`w-5 h-5 ${
//                                 log.type === "BOARDING"
//                                   ? "text-green-600"
//                                   : "text-red-600"
//                               }`}
//                             />
//                           ) : (
//                             <ArrowDown
//                               className={`w-5 h-5 ${
//                                 log.type === "BOARDING"
//                                   ? "text-green-600"
//                                   : "text-red-600"
//                               }`}
//                             />
//                           )}
//                         </div>
//                         <span
//                           className={`text-lg font-bold ${
//                             log.type === "BOARDING"
//                               ? "text-green-700"
//                               : "text-red-700"
//                           }`}
//                         >
//                           {log.type === "BOARDING" ? "Montée" : "Descente"}
//                         </span>
//                       </div>

//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-slate-700">
//                           <User className="w-4 h-4 text-slate-500" />
//                           <span className="font-semibold">
//                             {log.child.prenom} {log.child.nom}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2 text-slate-600">
//                           <BusIcon className="w-4 h-4 text-slate-500" />
//                           <span className="text-sm">
//                             Bus {log.bus.matricule}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Right side - Time */}
//                     <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
//                       <Clock className="w-4 h-4 text-orange-500" />
//                       <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
//                         {formatDate(log.createdAt)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LogsPresences;
"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useAuth } from "@/app/context/provider";
import {
  Clock,
  User,
  Bus as BusIcon,
  ArrowUp,
  ArrowDown,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface ScanLog {
  id: string;
  type: "BOARDING" | "DROPOFF";
  createdAt: string;
  child: { prenom: string; nom: string };
  bus: { matricule: string };
}

const LogsPresences = () => {
  const { dbUser, loading } = useAuth();
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  // === Fetch data ============================================================
  useEffect(() => {
    if (loading || !dbUser) return;

    const controller = new AbortController();

    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/get-scanlog?driverId=${dbUser.id}`, {
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
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) return `Aujourd'hui à ${time}`;
    if (isYesterday) return `Hier à ${time}`;
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const groupedLogs = useMemo(() => {
    return logs.reduce<Record<string, ScanLog[]>>((acc, log) => {
      const dateKey = new Date(log.createdAt).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      acc[dateKey] ??= [];
      acc[dateKey].push(log);
      return acc;
    }, {});
  }, [logs]);

  const totalBoarding = useMemo(
    () => logs.filter((l) => l.type === "BOARDING").length,
    [logs]
  );
  const totalDroppoff = useMemo(
    () => logs.filter((l) => l.type === "DROPOFF").length,
    [logs]
  );

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
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-linear-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Logs de Présence
            </h1>
            <p className="text-slate-600">
              Historique des montées et descentes —{" "}
              <span className="font-semibold">
                {logs.length} entrée{logs.length > 1 ? "s" : ""}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          icon={<ArrowUp className="w-5 h-5 text-green-600" />}
          title="Montées"
          value={totalBoarding}
          bgColor="bg-green-100"
        />
        <StatCard
          icon={<ArrowDown className="w-5 h-5 text-red-600" />}
          title="Descentes"
          value={totalDroppoff}
          bgColor="bg-red-100"
        />
      </div>

      {/* Logs by Date */}
      {Object.entries(groupedLogs).map(([date, dateLogs]) => (
        <div
          key={date}
          className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
        >
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-bold text-slate-900 capitalize">
              {date}
            </h2>
            <span className="ml-auto bg-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
              {dateLogs.length} log{dateLogs.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {dateLogs.map((log) => (
              <div
                key={log.id}
                className="p-5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          log.type === "BOARDING"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {log.type === "BOARDING" ? (
                          <ArrowUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowDown className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <span
                        className={`text-lg font-bold ${
                          log.type === "BOARDING"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {log.type === "BOARDING" ? "Montée" : "Descente"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-700">
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="font-semibold">
                          {log.child.prenom} {log.child.nom}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <BusIcon className="w-4 h-4 text-slate-500" />
                        <span className="text-sm">Bus {log.bus.matricule}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                      {formatDate(log.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// === Small component for cards =============================================
const StatCard = ({
  icon,
  title,
  value,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  bgColor: string;
}) => (
  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md">
    <div className="flex items-center gap-3 mb-2">
      <div className={`${bgColor} p-2 rounded-lg`}>{icon}</div>
      <span className="text-sm text-slate-600 font-medium">{title}</span>
    </div>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
  </div>
);

export default LogsPresences;
