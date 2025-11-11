"use client";

import { useAuth } from "@/app/context/provider";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import {
  AlertCircle,
  Navigation,
  MapPin,
  LogOut,
  User,
  X,
  HomeIcon,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";

interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
}

export function DashboardSidebar() {
  const { dbUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Génération d’un slug sans accents ni espaces
  const slug = useMemo(() => {
    if (!dbUser?.prenom || !dbUser?.nom) return "";
    return `${dbUser.prenom}-${dbUser.nom}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
  }, [dbUser]);

  // ✅ Ajout du slash au début pour cohérence avec Next Router
  const menuItems: MenuItem[] = useMemo(
    () => [
      { label: "Dashboard", path: "/", icon: HomeIcon },
      { label: "Anomalies", path: "/anomalies", icon: AlertCircle },
      { label: "Mes trajets", path: "/trajets", icon: Navigation },
      { label: "Logs de présence", path: "/logs-presence", icon: MapPin },
      { label: "Mon profil", path: "/profil", icon: User },
    ],
    []
  );

  // ✅ Ferme le menu mobile lors d’un changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // ✅ Empêche le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const goTo = (path: string) => {
    if (!slug) return;
    router.push(`/driver/${slug}${path}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const isActiveRoute = (path: string) => {
    if (!slug) return false;
    const fullPath = `/driver/${slug}${path === "/" ? "" : path}`;
    return pathname === fullPath;
  };

  const getInitials = () => {
    if (!dbUser?.prenom || !dbUser?.nom) return "**";
    return `${dbUser.prenom[0]}${dbUser.nom[0]}`.toUpperCase();
  };

  return (
    <>
      {/* ✅ Header mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-slate-950 border-b border-slate-800/50 backdrop-blur-xl">
        <div className="h-full px-4 flex items-center justify-between">
          {dbUser && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shrink-0">
                {getInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {dbUser.prenom} {dbUser.nom}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  Chauffeur de bus scolaire
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 flex items-center justify-center transition-all duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-slate-400" />
            ) : (
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ✅ Overlay mobile */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ✅ Sidebar */}
      <aside
        className={`lg:w-72 fixed lg:static inset-y-0 left-0 z-50 w-72
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          bg-slate-950 border-r border-slate-800/50 backdrop-blur-xl text-slate-100 
          transition-all duration-300 flex flex-col lg:mt-0 mt-16`}
      >
        {/* ✅ Overlay de fond */}
        <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        {/* ✅ Contenu principal */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Profil utilisateur (desktop uniquement) */}
          <div className="hidden lg:block p-6">
            {dbUser && (
              <div className="px-4 py-5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shrink-0">
                    {getInitials()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {dbUser.prenom} {dbUser.nom}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      Chauffeur de bus scolaire
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ✅ Navigation */}
          <nav
            className="flex-1 px-4 space-y-1 overflow-y-auto lg:mt-0 mt-6"
            aria-label="Navigation principale"
          >
            {menuItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden
                    ${
                      isActive
                        ? "bg-linear-to-r from-orange-500/20 to-orange-600/10 text-white shadow-lg shadow-orange-500/10"
                        : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-200"
                    }`}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-orange-400 to-orange-600 rounded-r-full" />
                  )}

                  <item.icon
                    size={20}
                    className={`shrink-0 transition-all duration-200 ${
                      isActive
                        ? "text-orange-400"
                        : "text-slate-500 group-hover:text-slate-300 group-hover:scale-110"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium truncate ${
                      isActive ? "text-white" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-500/20 text-orange-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* ✅ Bouton de déconnexion */}
          <div className="p-4 border-t border-slate-800/50">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group bg-slate-900/30 hover:bg-red-500/10 border border-slate-800/50 hover:border-red-500/30 text-slate-400 hover:text-red-400"
              aria-label="Se déconnecter"
            >
              <LogOut
                size={18}
                className="shrink-0 group-hover:scale-110 transition-transform"
              />
              <span className="text-sm font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
