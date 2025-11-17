"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Bus, ChildWithRelations, Driver } from "@/lib/types/user-interface";
import { useAuth } from "@/app/context/provider";
import { reportAnomaly } from "@/app/actions/reportAnomaly";
import Image from "next/image";
import {
  Bus as BusIcon,
  MapPin,
  Clock,
  GraduationCap,
  User,
  AlertCircle,
  X,
  Send,
  Loader2,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Trajets() {
  const { dbUser, loading: authLoading } = useAuth();
  const [bus, setBus] = useState<
    (Bus & { children: ChildWithRelations[] }) | null
  >(null);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Fetch driver and bus data */
  const fetchDriverBus = useCallback(
    async (driverId: string, controller: AbortController) => {
      try {
        const res = await fetch(`/api/users/driver/${driverId}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération du bus");

        const data = (await res.json()) as {
          bus: Bus & { children: ChildWithRelations[] };
          driver: Driver;
        };

        setDriver(data.driver);
        setBus(data.bus);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return; // ignore canceled fetch
        console.error("Erreur API Trajets :", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /** Initial data loading */
  useEffect(() => {
    if (authLoading || !dbUser || dbUser.role !== "DRIVER") return;
    const controller = new AbortController();
    fetchDriverBus(dbUser.id, controller);
    return () => controller.abort();
  }, [authLoading, dbUser, fetchDriverBus]);

  /** Modal handlers */
  const openModal = useCallback(() => {
    setDescription("");
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setDescription("");
    setIsModalOpen(false);
  }, []);

  /** Handle anomaly submission */
  const handleSubmitAnomaly = useCallback(async () => {
    if (!dbUser || !bus || !description.trim() || bus.children.length === 0)
      return;

    setIsSubmitting(true);
    try {
      await Promise.all(
        bus.children.map((child) =>
          reportAnomaly(dbUser.id, bus.id, child.id, description)
        )
      );
      toast.success(
        "Anomalie signalée avec succès ! Les parents ont été informés."
      );
      setDescription("");
      setTimeout(closeModal, 2000);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? "Erreur lors du traitement : " + err.message
          : "Une erreur inconnue est survenue"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [dbUser, bus, description, closeModal]);

  /** Memoized child cards to avoid full re-render */
  const childrenList = useMemo(() => {
    if (!bus?.children?.length)
      return (
        <div className="text-center py-12">
          <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500">Aucun enfant assigné à ce bus.</p>
        </div>
      );

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {bus.children.map((child) => (
          <div
            key={child.id}
            className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all"
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="shrink-0">
                {child.imageprofile ? (
                  <Image
                    width={80}
                    height={80}
                    src={child.imageprofile.url}
                    alt={`Photo de ${child.prenom} ${child.nom}`}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-slate-200"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {child.prenom[0]}
                    {child.nom[0]}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {child.prenom} {child.nom}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{child.adresse}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-slate-700">
                      Arrivée :{" "}
                      <span className="font-semibold text-slate-900">
                        {child.arrivalTime}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-xs text-slate-700">
                      Sortie :{" "}
                      <span className="font-semibold text-slate-900">
                        {child.departureTime}
                      </span>
                    </span>
                  </div>
                </div>

                {child.school && (
                  <div className="flex items-start gap-2 text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <GraduationCap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-slate-700">
                      <p className="font-semibold text-slate-900">
                        {child.school.nom}
                      </p>
                      <p className="text-xs text-slate-600">
                        {child.school.adresse}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }, [bus?.children]);

  /** --- Loading states --- */
  if (authLoading || loading)
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-slate-600 font-medium">
            Chargement des trajets...
          </p>
        </div>
      </div>
    );

  if (!bus)
    return (
      <div className="flex items-center justify-center min-h-[500px] p-6">
        <div className="bg-orange-50 border border-orange-200 text-orange-900 px-6 py-5 rounded-2xl flex items-start gap-4 max-w-md">
          <div className="bg-orange-500/20 p-2 rounded-lg shrink-0">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Aucun bus assigné</h3>
            <p className="text-orange-800/80 text-sm">
              Aucun bus n&apos;a été trouvé pour ce chauffeur. Contactez
              l&apos;administrateur.
            </p>
          </div>
        </div>
      </div>
    );

  /** --- Main Render --- */
  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="bg-linear-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg">
                <BusIcon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  Trajet du jour
                </h1>
                <p className="text-slate-600">
                  Conducteur :{" "}
                  <span className="font-semibold text-slate-900">
                    {driver?.prenom} {driver?.nom}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={openModal}
              disabled={!bus || bus.children.length === 0}
              className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-red-500/25 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
            >
              <AlertCircle className="w-5 h-5" />
              Signaler une anomalie
            </button>
          </div>
        </div>

        {/* Bus Info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BusIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Informations du bus
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Matricule", value: bus.matricule },
              { label: "Marque", value: bus.brand },
              { label: "Places disponibles", value: `${bus.seats} sièges` },
            ].map((info) => (
              <div
                key={info.label}
                className="bg-slate-50 rounded-xl p-4 border border-slate-200"
              >
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1 font-medium">
                  {info.label}
                </p>
                <p className="text-lg font-bold text-slate-900">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Children List */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Passagers à récupérer
              </h2>
            </div>
            <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
              <span className="text-2xl font-bold text-slate-900">
                {bus.children.length}
              </span>
              <span className="text-sm text-slate-600 ml-1">
                enfant{bus.children.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {childrenList}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="relative bg-linear-to-br from-red-500 via-red-600 to-red-700 p-5 rounded-t-2xl">
              <div className="absolute inset-0 bg-black/5 rounded-t-2xl"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Signaler une anomalie
                    </h2>
                    <p className="text-red-50/90 text-sm">
                      Bus {bus?.matricule}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-1.5 rounded-lg transition-all"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <BusIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-900">
                    Bus {bus?.matricule}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-orange-100 px-2.5 py-1 rounded-lg">
                  <User className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-semibold text-slate-900">
                    {bus?.children.length} enfant
                    {bus && bus.children.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Description de l&apos;incident
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-32 px-3 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none text-sm text-slate-900 placeholder:text-slate-400"
                  placeholder="Décrivez l'incident (retard, panne, accident, etc.)..."
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold py-2.5 px-4 rounded-lg transition-all text-sm"
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmitAnomaly}
                  className="flex-1 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  disabled={isSubmitting || !description.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Envoi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Envoyer</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}
