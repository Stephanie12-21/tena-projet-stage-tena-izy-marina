"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resendConfirmationEmail, signIn } from "@/app/actions/auth";
import Image from "next/image";
import z from "zod";

// ✅ Schéma de validation Zod
const signinSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setUnconfirmedEmail(null);

    // Validation Zod
    const result = signinSchema.safeParse(formData);
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

    try {
      const formData = new FormData(event.currentTarget);
      const result = await signIn(formData);

      if (result.status === "success" && result.email) {
        try {
          const response = await fetch("/api/get-slug", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: result.email }),
          });

          const data = await response.json();

          if (!data?.slug || !data?.role) {
            setError("Impossible de récupérer votre espace personnel.");
            toast.error(
              "Vous ne semblez pas avoir de compte utilisateur, veuillez vous connecter d'abord."
            );
            return;
          }

          const role = data.role.toUpperCase();

          toast.success("Connexion réussie ! Redirection en cours...");
          setRedirecting(true);

          setTimeout(() => {
            if (role === "ADMIN") {
              router.push(`/admin/${data.slug}/`);
            } else if (role === "PARENT") {
              router.push(`/parent/${data.slug}/`);
            } else if (role === "DRIVER") {
              router.push(`/driver/${data.slug}/`);
            } else {
              setError(
                "Vous n'êtes pas autorisé à accéder à cet espace. Veuillez contacter l'administrateur."
              );
              console.log("Erreur:", error);
              toast.error(
                "Vous n'êtes pas autorisé à accéder à cet espace. Veuillez contacter l'administrateur."
              );
              setRedirecting(false);
            }
          }, 3000);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
            toast.error(err.message);
          } else {
            setError("Erreur lors de la récupération des données.");
            toast.error("Erreur lors de la récupération des données.");
          }
        }
      } else if (result.status === "error") {
        switch (result.reason) {
          case "invalid_credentials":
            toast.error("Les données saisies semblent incorrectes.");
            break;
          case "user_not_found":
            toast.error("Cet utilisateur n'existe pas.");
            break;
          case "email_not_confirmed":
            toast.error(
              "Votre email n'est pas encore vérifié. Veuillez vérifier votre boîte de réception."
            );
            setUnconfirmedEmail(result.email);
            break;
          default:
            toast.error("Une erreur est survenue lors de la connexion.");
        }
        setError(result.reason || "Erreur inconnue");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => router.back();

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* --- FORMULAIRE --- */}
      <div className="flex w-full md:w-1/2 flex-col p-4 relative z-10">
        {/* --- Haut : Bouton retour + Logo --- */}
        <div className="flex justify-between items-center mb-20">
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
            <h1 className="text-4xl font-bold">Bienvenue</h1>
            <p className="text-base font-medium">
              Connecter-vous sur votre compte{" "}
              <span className="font-bold">SmartRide</span>
            </p>
          </div>

          {/* --- Formulaire --- */}

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="exemple@smartride.com"
                className="bg-white/80 backdrop-blur-sm pl-4 pr-4 py-3 rounded-lg shadow-sm focus:shadow-lg"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-medium">
                  Mot de passe
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm  hover:underline transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="bg-white/80 backdrop-blur-sm pl-4 pr-12 py-3 rounded-lg shadow-sm focus:shadow-lg"
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
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <Button
                type="submit"
                disabled={loading || redirecting}
                className="w-full py-3 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl"
              >
                {loading ? "Connexion en cours..." : "Se connecter"}
              </Button>

              {redirecting && (
                <p className="text-sm text-center font-medium">
                  Redirection en cours...
                </p>
              )}

              {unconfirmedEmail && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full "
                  onClick={async () => {
                    const res = await resendConfirmationEmail(unconfirmedEmail);
                    if (res.status === "success") {
                      toast.success(res.message);
                    } else {
                      toast.error(res.message);
                    }
                  }}
                >
                  Renvoyer l&apos;email de confirmation
                </Button>
              )}

              <p className="text-sm text-center text-gray-600">
                Vous n&apos;avez pas encore de compte ?{" "}
                <Link
                  href="/register/as-parent"
                  className="hover:underline font-medium transition-colors"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </form>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
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
};

export default LoginPage;
