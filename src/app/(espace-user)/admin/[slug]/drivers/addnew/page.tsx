"use client";

import { useState } from "react";
import { Loader2, Mail, CheckCircle, AlertCircle, Send } from "lucide-react";
import { useAuth } from "@/app/context/provider";

export default function InvitePage() {
  const { dbUser } = useAuth(); // récupère l'admin connecté
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email || !dbUser?.id) return; // s'assure qu'on a l'admin connecté
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          adminId: dbUser.id, // envoi l'ID de l'admin
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Invitation envoyée à ${email} !`);
        setEmail("");
      } else {
        setIsError(true);
        setMessage(data.error || "Une erreur est survenue.");
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
      setMessage("Une erreur réseau est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-[#C3875D] hover:bg-[#A86D49] bg-clip-text text-transparent mb-2">
            Ajouter un nouveau chauffeur
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20">
          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Adresse email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="exemple@entreprise.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C3875D] focus:border-[#C3875D] transition-all duration-200 bg-white/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleInvite()}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleInvite}
            disabled={loading || !email}
            className="w-full flex items-center justify-center gap-2 bg-[#C3875D] hover:bg-[#A86D49] text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:scale-100 shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Envoyer l&apos;invitation
              </>
            )}
          </button>

          {/* Message */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-lg flex items-center gap-3 transition-all duration-300 ${
                isError
                  ? "bg-red-50 border border-red-200 text-red-800"
                  : "bg-green-50 border border-green-200 text-green-800"
              }`}
            >
              {isError ? (
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
              ) : (
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
