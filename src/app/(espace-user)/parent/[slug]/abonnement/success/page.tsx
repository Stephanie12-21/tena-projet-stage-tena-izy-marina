"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

const SuccessSubscriptionPage = () => {
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
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Contenu principal */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h1 className="text-3xl font-bold text-gray-900">
            Abonnement confirmé !
          </h1>

          <p className="text-gray-600 text-lg">
            Votre abonnement a été effectué avec succès
          </p>

          {/* Carte d'information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-8 shadow-sm">
            <div className="flex items-center justify-center gap-3 text-gray-700">
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
                      className="text-green-600 transition-all duration-1000 ease-linear"
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

            <p className="text-sm text-gray-500 mt-4">
              Un email de confirmation vous a été envoyé
            </p>
          </div>

          {/* Bouton de redirection manuelle */}
          <button
            onClick={() => router.push(`/parent/${slug}/abonnement`)}
            className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2 group"
          >
            Accéder à mes abonnements
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessSubscriptionPage;
