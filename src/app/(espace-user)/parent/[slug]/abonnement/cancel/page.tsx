"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight, AlertTriangle, RefreshCw } from "lucide-react";

const FailedSubscriptionPage = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      router.push(`/parent/${slug}/abonnement`);
    }, 5000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [router, slug]);

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Contenu principal */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h1 className="text-3xl font-bold text-gray-900">Paiement échoué</h1>

          <p className="text-gray-600 text-lg">
            Votre abonnement n&apos;a pas pu être traité
          </p>

          {/* Carte d'information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-8 shadow-sm space-y-4">
            {/* Raisons possibles */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-left">
              <p className="text-sm font-semibold text-orange-900 mb-2">
                Raisons possibles :
              </p>
              <ul className="text-sm text-orange-800 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Fonds insuffisants sur votre carte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Informations de paiement incorrectes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Problème de connexion lors du paiement</span>
                </li>
              </ul>
            </div>

            {/* Compte à rebours */}
            <div className="flex items-center justify-center gap-3 text-gray-700 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Redirection automatique dans</span>
                <div className="relative w-12 h-12">
                  {/* Cercle de progression */}
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 20 * (1 - countdown / 5)
                      }`}
                      className="text-red-600 transition-all duration-1000 ease-linear"
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Chiffre du compte à rebours */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900">
                      {countdown}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3 mt-6">
            <button
              onClick={() => router.push(`/parent/${slug}/abonnement`)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Réessayer l&apos;abonnement
            </button>

            <button
              onClick={() => router.push(`/parent/${slug}/abonnement`)}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-xl font-medium transition-all duration-200 border border-gray-200 flex items-center justify-center gap-2 group"
            >
              Retour aux abonnements
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Message d'aide */}
        <div className="mt-12 text-center animate-in fade-in duration-1000 delay-500">
          <div className="inline-flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white rounded-full px-4 py-2 border border-gray-200">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span>Besoin d&apos;aide ? Contactez notre support</span>
            </div>
            <p className="text-xs text-gray-400">
              Aucun montant n&apos;a été débité de votre compte
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailedSubscriptionPage;
