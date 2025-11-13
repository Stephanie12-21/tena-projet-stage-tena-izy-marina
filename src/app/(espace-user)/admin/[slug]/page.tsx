"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/provider";
import { ProtectedRoute } from "@/app/context/protectedtoute";
import { Users, UserCircle, Bus, Baby, Bell, User } from "lucide-react";

const MainPageAsParent = () => {
  const { user, dbUser, loading } = useAuth();

  // États pour les statistiques
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalChildren: 0,
    totalBuses: 0,
  });

  // Simulation du chargement des statistiques
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
      }
    };

    if (user) fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Vous n&apos;êtes pas connecté.</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Utilisateurs",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Chauffeurs",
      value: stats.totalDrivers,
      icon: UserCircle,
      color: "bg-green-500",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Enfants",
      value: stats.totalChildren,
      icon: Baby,
      color: "bg-purple-500",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Bus",
      value: stats.totalBuses,
      icon: Bus,
      color: "bg-orange-500",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        {/* En-tête */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Tableau de bord
                </h1>
                <p className="text-gray-600 mt-1">
                  Bienvenue, {dbUser?.prenom} {dbUser?.nom}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.bgLight} p-3 rounded-lg`}>
                      <Icon className={`${stat.textColor} w-8 h-8`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Informations utilisateur */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Mes informations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <User className="text-gray-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nom complet</p>
                  <p className="font-medium text-gray-900">
                    {dbUser?.prenom} {dbUser?.nom}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Bell className="text-gray-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{dbUser?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Users className="text-gray-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium text-gray-900">{dbUser?.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <UserCircle className="text-gray-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rôle</p>
                  <p className="font-medium text-gray-900">{dbUser?.role}</p>
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
