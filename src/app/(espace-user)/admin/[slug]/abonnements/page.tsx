"use client";

import React, { useEffect, useState } from "react";
import { CreditCard, Calendar, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

// Types EXACTEMENT comme ton API les retourne
type Subscription = {
  id: string;
  plan: "MONTHLY" | "YEARLY" | string;
  status: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;

  parent: {
    nom: string;
    prenom: string;
    email: string;
    phone: string;
  };

  child: {
    nom: string;
    prenom: string;
    adresse: string;
    arrivalTime: string;
    departureTime: string;
    imageprofile?: {
      url: string;
    };
    school?: {
      nom: string;
      adresse: string;
    };
  } | null;
};

const AbonnementPage = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Subscription | null>(null);

  const openModal = (sub: Subscription) => {
    setSelected(sub);
    setOpen(true);
  };

  // Chargement API
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch("/api/subscriptions");
        const data = await res.json();
        setSubscriptions(data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  // Style statut
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      case "past_due":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "Actif";
      case "canceled":
        return "Annulé";
      case "past_due":
        return "En retard";
      default:
        return status;
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des abonnements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Gestion des abonnements
        </h1>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-4">Abonnement</th>
                  <th className="px-6 py-4">Parent</th>
                  <th className="px-6 py-4">Enfant</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4">Date création</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    {/* ID */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {sub.id.substring(0, 8)}...
                          </p>

                          {sub.cancelAtPeriodEnd && (
                            <span className="inline-flex items-center text-xs text-orange-600">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Annulation prévue
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Parent */}
                    <td className="px-6 py-4">
                      <p className="font-medium">
                        {sub.parent.nom} {sub.parent.prenom}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {sub.parent.email}
                      </p>
                    </td>

                    {/* Enfant */}
                    <td className="px-6 py-4">
                      {sub.child ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {sub.child.nom} {sub.child.prenom}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">Aucun</span>
                      )}
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-50 border text-blue-700">
                        {sub.plan === "YEARLY"
                          ? "Annuel"
                          : sub.plan === "MONTHLY"
                          ? "Mensuel"
                          : sub.plan}
                      </span>
                    </td>

                    {/* Statut */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full border text-sm ${getStatusColor(
                          sub.status
                        )}`}
                      >
                        {getStatusLabel(sub.status)}
                      </span>
                    </td>

                    {/* Date création */}
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(sub.createdAt).toLocaleDateString("fr-FR")}
                      </div>
                    </td>

                    {/* Bouton modal */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openModal(sub)}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {subscriptions.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Aucun abonnement trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* ---- MODAL ---- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Détails de l’abonnement</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-6 text-sm">
              {/* PARENT */}
              <div>
                <h3 className="font-semibold text-lg mb-1">Parent</h3>
                <p>
                  {selected.parent.nom} {selected.parent.prenom}
                </p>
                <p className="text-gray-500">{selected.parent.email}</p>
                <p className="text-gray-500">{selected.parent.phone}</p>
              </div>

              {/* ENFANT */}
              <div>
                <h3 className="font-semibold text-lg mb-1">Enfant</h3>

                {selected.child ? (
                  <div className="p-4 border rounded-xl flex gap-5">
                    {/* PHOTO */}
                    {selected.child.imageprofile?.url ? (
                      <Image
                        width={100}
                        height={100}
                        src={selected.child.imageprofile.url}
                        alt="Photo enfant"
                        className="w-24 h-24 rounded-lg object-cover border"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                        Aucune photo
                      </div>
                    )}

                    <div className="space-y-2">
                      <p className="font-semibold text-base">
                        {selected.child.nom} {selected.child.prenom}
                      </p>

                      <p>
                        <span className="font-semibold">Adresse :</span>
                        <br />
                        {selected.child.adresse}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Heure d&apos;arrivée :
                        </span>{" "}
                        {selected.child.arrivalTime}
                      </p>

                      <p>
                        <span className="font-semibold">Heure de départ :</span>{" "}
                        {selected.child.departureTime}
                      </p>

                      {selected.child.school && (
                        <div>
                          <p className="font-semibold">École :</p>
                          <p>{selected.child.school.nom}</p>
                          <p className="text-gray-500">
                            {selected.child.school.adresse}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Aucun enfant associé</p>
                )}
              </div>

              {/* ABONNEMENT */}
              <div>
                <h3 className="font-semibold text-lg mb-1">Abonnement</h3>

                <p>
                  Type :{" "}
                  <b>
                    {selected.plan === "YEARLY"
                      ? "Annuel"
                      : selected.plan === "MONTHLY"
                      ? "Mensuel"
                      : selected.plan}
                  </b>
                </p>

                <p>
                  Statut : <b>{getStatusLabel(selected.status)}</b>
                </p>

                {/* Dates */}
                <p>
                  Début :{" "}
                  {new Date(selected.createdAt).toLocaleDateString("fr-FR")}
                </p>

                <p>
                  Fin :{" "}
                  {(() => {
                    const start = new Date(selected.createdAt);
                    const end = new Date(start);
                    if (selected.plan === "MONTHLY")
                      end.setMonth(end.getMonth() + 1);
                    if (selected.plan === "YEARLY")
                      end.setFullYear(end.getFullYear() + 1);
                    return end.toLocaleDateString("fr-FR");
                  })()}
                </p>

                <p>
                  Renouvellement :
                  {selected.cancelAtPeriodEnd ? (
                    <span className="text-red-600"> Désactivé</span>
                  ) : (
                    <span className="text-green-600"> Activé</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AbonnementPage;
