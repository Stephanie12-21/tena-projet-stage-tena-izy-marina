// "use client";

// import React from "react";
// import { useAuth } from "@/app/context/provider";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { ProtectedRoute } from "@/app/context/protectedtoute";
// import { signOut } from "@/app/actions/auth";
// import { useDriverSupabaseRealtime } from "@/hooks/useDriverWebSocket";

// const MainPageAsdriver = () => {
//   const { user, dbUser, loading } = useAuth();
//   const router = useRouter();

//   const { position, error, isConnected } = useDriverSupabaseRealtime(
//     dbUser?.id
//   );

//   if (loading) return <div className="p-6">Chargement...</div>;
//   if (!user) return <div className="p-6">Vous n’êtes pas connecté.</div>;

//   const slug = `${dbUser?.prenom}-${dbUser?.nom}`
//     .toLowerCase()
//     .replace(/\s+/g, "-");

//   const goTo = (path: string) => {
//     if (!slug) return;
//     router.push(`/driver/${slug}/${path}`);
//   };

//   const handleSignOut = async () => {
//     await signOut();
//     router.push("/login");
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <ProtectedRoute>
//         <h1 className="text-2xl font-semibold mb-4">
//           Bienvenue, {dbUser?.nom || user.user_metadata?.full_name || "driver"}
//         </h1>

//         <div className="bg-white shadow rounded-xl p-4 mb-6">
//           <h2 className="text-lg font-medium mb-2">Mes informations</h2>
//           <p>
//             <strong>Nom :</strong> {dbUser?.nom}
//           </p>
//           <p>
//             <strong>Email :</strong> {dbUser?.email}
//           </p>
//           <p>
//             <strong>Rôle :</strong> {dbUser?.role}
//           </p>

//           <div className="mt-3 p-2 rounded bg-gray-50">
//             <p className="flex items-center gap-2">
//               <span
//                 className={`inline-block w-2 h-2 rounded-full ${
//                   isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
//                 }`}
//               ></span>
//               <strong>État:</strong>{" "}
//               {isConnected ? "Connecté au suivi" : "Déconnecté"}
//             </p>
//           </div>

//           {position ? (
//             <div className="mt-3 p-2 rounded bg-blue-50">
//               <p>
//                 <strong>Position actuelle :</strong>
//               </p>
//               <p className="font-mono text-sm">
//                 Lat: {position.lat.toFixed(6)}
//                 <br />
//                 Lon: {position.lon.toFixed(6)}
//               </p>
//             </div>
//           ) : (
//             <p className="mt-3 text-gray-600">
//               {error || "Récupération de la position..."}
//             </p>
//           )}

//           {error && (
//             <div className="mt-3 p-2 rounded bg-red-50 text-red-700">
//               <p className="text-sm">{error}</p>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           <Button
//             onClick={() => goTo("anomalies")}
//             className="w-full py-6 text-lg"
//           >
//             Les anomalies
//           </Button>
//           <Button
//             onClick={() => goTo("trajets")}
//             className="w-full py-6 text-lg"
//           >
//             Mes trajets
//           </Button>
//           <Button
//             onClick={() => goTo("logs-presence")}
//             className="w-full py-6 text-lg"
//           >
//             Les logs de présence
//           </Button>
//           <Button
//             onClick={() => goTo("profil")}
//             className="w-full py-6 text-lg"
//           >
//             Profil utilisateur
//           </Button>
//           <Button
//             onClick={handleSignOut}
//             className="w-full py-6 text-lg bg-red-100 hover:bg-red-200 text-red-700"
//           >
//             Déconnexion
//           </Button>
//         </div>
//       </ProtectedRoute>
//     </div>
//   );
// };

// export default MainPageAsdriver;
// "use client";
// import { useAuth } from "@/app/context/provider";
// import { useRouter } from "next/navigation";
// import { ProtectedRoute } from "@/app/context/protectedtoute";
// import { signOut } from "@/app/actions/auth";
// import { useDriverSupabaseRealtime } from "@/hooks/useDriverWebSocket";
// import { MapPin, AlertCircle, Navigation, LogOut, Menu } from "lucide-react";
// import { useState } from "react";

// const DriverDashboard = () => {
//   const { user, dbUser, loading } = useAuth();
//   const router = useRouter();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const { position, error, isConnected } = useDriverSupabaseRealtime(
//     dbUser?.id
//   );

//   if (loading) return <div className="p-6">Chargement...</div>;
//   if (!user) return <div className="p-6">Vous n&apos;êtes pas connecté.</div>;

//   const slug = `${dbUser?.prenom}-${dbUser?.nom}`
//     .toLowerCase()
//     .replace(/\s+/g, "-");

//   const goTo = (path: string) => {
//     if (!slug) return;
//     router.push(`/driver/${slug}/${path}`);
//   };

//   const handleSignOut = async () => {
//     await signOut();
//     router.push("/login");
//   };

//   const menuItems = [
//     {
//       label: "Les anomalies",
//       onClick: () => goTo("anomalies"),
//       icon: AlertCircle,
//       color: "from-color-web-orange-400 to-color-web-orange-500",
//     },
//     {
//       label: "Mes trajets",
//       onClick: () => goTo("trajets"),
//       icon: Navigation,
//       color: "from-color-web-orange-500 to-color-web-orange-600",
//     },
//     {
//       label: "Les logs de présence",
//       onClick: () => goTo("logs-presence"),
//       icon: MapPin,
//       color: "from-color-web-orange-500 to-color-web-orange-700",
//     },
//     {
//       label: "Profil utilisateur",
//       onClick: () => goTo("profil"),
//       icon: MapPin,
//       color: "from-color-web-orange-400 to-color-web-orange-600",
//     },
//   ];

//   return (
//     <ProtectedRoute>
//       <div className="flex h-screen bg-background">
//         <div
//           className={`${
//             sidebarOpen ? "w-64" : "w-20"
//           } bg-linear-to-b from-color-web-orange-950 to-color-web-orange-900 text-foreground transition-all duration-300 flex flex-col`}
//         >
//           <div className="p-6 flex items-center justify-between">
//             {sidebarOpen && (
//               <h2 className="text-xl font-bold text-color-web-orange-400">
//                 Driver
//               </h2>
//             )}
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 hover:bg-color-web-orange-800 rounded-lg"
//             >
//               <Menu size={20} />
//             </button>
//           </div>

//           <nav className="flex-1 px-4 space-y-2">
//             {menuItems.map((item) => (
//               <button
//                 key={item.label}
//                 onClick={item.onClick}
//                 className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-color-web-orange-800 transition-colors"
//                 title={item.label}
//               >
//                 <item.icon size={20} className="text-color-web-orange-400" />
//                 {sidebarOpen && <span className="text-sm">{item.label}</span>}
//               </button>
//             ))}
//           </nav>

//           <div className="p-4 border-t border-color-web-orange-800">
//             <button
//               onClick={handleSignOut}
//               className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-color-web-orange-800 transition-colors text-color-web-orange-300"
//             >
//               <LogOut size={20} />
//               {sidebarOpen && <span className="text-sm">Déconnexion</span>}
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-auto">
//           <div className="p-8">
//             <div className="mb-8">
//               <h1 className="text-4xl font-bold text-foreground mb-2">
//                 Bienvenue, {dbUser?.prenom || "Driver"}
//               </h1>
//               <p className="text-muted-foreground">
//                 Gérez vos trajets et consultez vos données en temps réel
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {/* Connection Status */}
//               <div className="bg-card border border-border rounded-xl p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-sm font-medium text-muted-foreground">
//                     État de connexion
//                   </h3>
//                   <div
//                     className={`w-3 h-3 rounded-full ${
//                       isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
//                     }`}
//                   ></div>
//                 </div>
//                 <p className="text-2xl font-bold text-foreground">
//                   {isConnected ? "En ligne" : "Hors ligne"}
//                 </p>
//               </div>

//               {/* User Info */}
//               <div className="bg-card border border-border rounded-xl p-6">
//                 <h3 className="text-sm font-medium text-muted-foreground mb-4">
//                   Rôle
//                 </h3>
//                 <p className="text-2xl font-bold text-foreground">
//                   {dbUser?.role || "Driver"}
//                 </p>
//               </div>

//               {/* Email */}
//               <div className="bg-card border border-border rounded-xl p-6 md:col-span-2 lg:col-span-2">
//                 <h3 className="text-sm font-medium text-muted-foreground mb-4">
//                   Email
//                 </h3>
//                 <p className="text-lg font-semibold text-foreground truncate">
//                   {dbUser?.email}
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Position Card */}
//               <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
//                 <h2 className="text-xl font-bold text-foreground mb-6">
//                   Localisation actuelle
//                 </h2>
//                 {position ? (
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3 p-4 rounded-lg bg-background">
//                       <MapPin size={20} className="text-color-web-orange-500" />
//                       <div>
//                         <p className="text-sm text-muted-foreground">
//                           Latitude
//                         </p>
//                         <p className="text-lg font-mono text-foreground">
//                           {position.lat.toFixed(6)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3 p-4 rounded-lg bg-background">
//                       <MapPin size={20} className="text-color-web-orange-500" />
//                       <div>
//                         <p className="text-sm text-muted-foreground">
//                           Longitude
//                         </p>
//                         <p className="text-lg font-mono text-foreground">
//                           {position.lon.toFixed(6)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <p className="text-muted-foreground">
//                       {error || "Récupération de la position..."}
//                     </p>
//                   </div>
//                 )}
//                 {error && (
//                   <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
//                     <p className="text-sm text-destructive">{error}</p>
//                   </div>
//                 )}
//               </div>

//               {/* User Details Card */}
//               <div className="bg-card border border-border rounded-xl p-6">
//                 <h2 className="text-xl font-bold text-foreground mb-6">
//                   Profil
//                 </h2>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">Nom</p>
//                     <p className="font-semibold text-foreground">
//                       {dbUser?.nom}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">Prénom</p>
//                     <p className="font-semibold text-foreground">
//                       {dbUser?.prenom}
//                     </p>
//                   </div>
//                   <div className="pt-4 border-t border-border">
//                     <p className="text-xs text-muted-foreground">
//                       ID Utilisateur
//                     </p>
//                     <p className="text-xs font-mono text-foreground mt-1 break-all">
//                       {dbUser?.id}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <h2 className="text-lg font-bold text-foreground mb-4">
//                 Actions rapides
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {menuItems.map((item) => (
//                   <button
//                     key={item.label}
//                     onClick={item.onClick}
//                     className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-linear-to-r from-color-web-orange-500 to-color-web-orange-600 hover:from-color-web-orange-600 hover:to-color-web-orange-700 text-white font-semibold transition-all"
//                   >
//                     <item.icon size={18} />
//                     {item.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default DriverDashboard;
"use client";

import { useAuth } from "@/app/context/provider";
import { useDriverSupabaseRealtime } from "@/hooks/useDriverWebSocket";
import { MapPin, AlertCircle, Navigation } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DriverDashboard() {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();
  const { position, error, isConnected } = useDriverSupabaseRealtime(
    dbUser?.id
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) return <div className="p-6">Chargement...</div>;
  if (!user) return <div className="p-6">Vous n&apos;êtes pas connecté.</div>;

  const slug = `${dbUser?.prenom}-${dbUser?.nom}`
    .toLowerCase()
    .replace(/\s+/g, "-");

  const goTo = (path: string) => {
    if (!slug) return;
    router.push(`/driver/${slug}/${path}`);
  };

  const menuItems = [
    {
      label: "Les anomalies",
      onClick: () => goTo("anomalies"),
      icon: AlertCircle,
    },
    {
      label: "Mes trajets",
      onClick: () => goTo("trajets"),
      icon: Navigation,
    },
    {
      label: "Les logs de présence",
      onClick: () => goTo("logs-presence"),
      icon: MapPin,
    },
    {
      label: "Profil utilisateur",
      onClick: () => goTo("profil"),
      icon: MapPin,
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Bienvenue, {dbUser?.prenom || "Driver"}
        </h1>
        <p className="text-muted-foreground">
          Gérez vos trajets et consultez vos données en temps réel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Connection Status */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              État de connexion
            </h3>
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
              }`}
            ></div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {isConnected ? "En ligne" : "Hors ligne"}
          </p>
        </div>

        {/* User Info */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Rôle
          </h3>
          <p className="text-2xl font-bold text-foreground">
            {dbUser?.role || "Driver"}
          </p>
        </div>

        {/* Email */}
        <div className="bg-card border border-border rounded-xl p-6 md:col-span-2 lg:col-span-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Email
          </h3>
          <p className="text-lg font-semibold text-foreground truncate">
            {dbUser?.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Position Card */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Localisation actuelle
          </h2>
          {position ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background">
                <MapPin size={20} className="text-color-web-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Latitude</p>
                  <p className="text-lg font-mono text-foreground">
                    {position.lat.toFixed(6)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background">
                <MapPin size={20} className="text-color-web-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Longitude</p>
                  <p className="text-lg font-mono text-foreground">
                    {position.lon.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {error || "Récupération de la position..."}
              </p>
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>

        {/* User Details Card */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Profil</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Nom</p>
              <p className="font-semibold text-foreground">{dbUser?.nom}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Prénom</p>
              <p className="font-semibold text-foreground">{dbUser?.prenom}</p>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">ID Utilisateur</p>
              <p className="text-xs font-mono text-foreground mt-1 break-all">
                {dbUser?.id}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-linear-to-r from-color-web-orange-500 to-color-web-orange-600 hover:from-color-web-orange-600 hover:to-color-web-orange-700 text-white font-semibold transition-all"
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
