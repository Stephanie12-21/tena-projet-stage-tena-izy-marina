"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import z from "zod";

// ✅ Schéma de validation Zod
const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("Prêt pour la réinitialisation du mot de passe");
      }
    });
  }, [supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation Zod
    const result = passwordSchema.safeParse({ password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    setErrors({});
    if (!password) {
      toast.error("Veuillez saisir un mot de passe");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(`Erreur: ${error.message}`);
    } else {
      toast.success(
        "Mot de passe mis à jour avec succès ! Vous pouvez maintenant vous connecter."
      );
      setTimeout(() => {
        router.push("/login");
      }, 3000);
      setPassword("");
    }

    setLoading(false);
  };

  const handleGoBack = () => router.back();

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* --- FORMULAIRE --- */}
      <div className="flex w-full md:w-1/2 flex-col p-4 relative z-10">
        {/* --- Haut : Bouton retour + Logo --- */}
        <div className="flex justify-between items-center mb-30">
          <Button
            variant="outline"
            className="group hover:scale-105 transition-all duration-300"
            onClick={handleGoBack}
            type="button"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Retour
          </Button>
          <Image src="/logo.png" alt="Smart Ride" width={50} height={50} />
        </div>

        {/* --- Milieu : Formulaire --- */}
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Mot de passe oublié</h1>
            <p className="text-base font-medium">
              Entrez votre nouveau mot de passe.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div className="space-y-4 relative">
              <Label htmlFor="password" className="font-medium">
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="••••••••"
                  className="bg-white/80 backdrop-blur-sm pl-4 pr-12 py-3 rounded-lg shadow-sm focus:shadow-lg"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <div className="flex flex-col space-y-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl"
              >
                {loading ? "Réinitialisation en cours..." : "Réinitialiser"}
              </Button>
            </div>
          </form>

          {/* ✅ Container Toast */}
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            toastStyle={{
              width: "420px",
            }}
          />
        </div>
      </div>

      {/* --- Image à droite --- */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <Image
          src="/illustration.jpg"
          alt="Illustration Login"
          fill
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
