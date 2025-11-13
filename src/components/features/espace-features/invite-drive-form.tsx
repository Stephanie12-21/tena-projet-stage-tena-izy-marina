"use client";

import { useState } from "react";
import { Loader2, Mail, Send } from "lucide-react";
import { useAuth } from "@/app/context/provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function InviteForm({ onSuccess }: { onSuccess?: () => void }) {
  const { dbUser } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInvite = async () => {
    if (!email || !dbUser?.id) return;
    setLoading(true);

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          adminId: dbUser.id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Invitation envoyée à ${email}`, {
          position: "top-right",
          autoClose: 3000,
        });
        setEmail("");
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.error || " Une erreur est survenue.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(" Une erreur réseau est survenue.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Champ email avec animation */}
      <div className="mb-6">
        <Label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-3"
        >
          Adresse email
        </Label>
        <div className="relative group">
          {/* Effet de bordure animé */}
          <div
            className={`absolute -inset-0.5 bg-linear-to-r from-[#C3875D] to-[#8B6F47] rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300 ${
              isFocused ? "opacity-40" : ""
            }`}
          />

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail
                className={`h-5 w-5 transition-colors duration-200 ${
                  isFocused ? "text-[#C3875D]" : "text-gray-400"
                }`}
              />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="exemple@entreprise.com"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C3875D]/20 focus:border-[#C3875D] transition-all duration-200 bg-white text-gray-900 placeholder:text-gray-400 hover:border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInvite()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </div>

        {/* Indicateur de validation */}
        {email && (
          <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
            {email.includes("@") && email.includes(".") ? (
              <>
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Email valide
              </>
            ) : (
              <>
                <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Vérifiez le format de l&apos;email
              </>
            )}
          </p>
        )}
      </div>

      {/* Bouton avec effet gradient */}
      <Button
        onClick={handleInvite}
        disabled={loading || !email}
        className="w-full relative group overflow-hidden  text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none shadow-lg"
      >
        {/* Effet de brillance au survol */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

        <span className="relative flex items-center justify-center gap-3">
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              <span>Envoyer l&apos;invitation</span>
            </>
          )}
        </span>
      </Button>
    </div>
  );
}
