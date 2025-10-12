"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { signUp } from "@/app/actions/auth";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Schéma de validation Zod
const signupSchema = z
  .object({
    prenom: z.string().min(1, "Le prénom est requis"),
    nom: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    phone: z
      .string()
      .regex(/^\+?[0-9\s]{7,15}$/, "Numéro de téléphone invalide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string().min(1, "Veuillez confirmer le mot de passe"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Gestion du formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Validation Zod
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    setErrors({});

    try {
      // ✅ On crée une nouvelle instance de FormData
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      const result = await signUp(form);

      if (result.status === "success") {
        toast.success("Compte créé avec succès !");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        alert("Erreur : " + result.status);
        setErrors({ global: result.status });
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      toast.error("Une erreur inattendue est survenue.");
      setErrors({ global: "Une erreur inattendue est survenue." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => router.back();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* --- FORMULAIRE --- */}
      <div className="flex w-full md:w-1/2 flex-col p-4 relative z-10">
        {/* --- Haut : Bouton retour + Logo --- */}
        <div className="flex justify-between items-center mb-2">
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
              Créez un compte pour <span className="font-bold">SmartRide</span>
            </p>
          </div>

          {/* --- Formulaire --- */}
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            {/* Prénom et Nom */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Prénom */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="prenom" className="font-medium">
                  Prénom
                </Label>
                <Input
                  id="prenom"
                  name="prenom"
                  type="text"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  placeholder="Votre prénom"
                  className="bg-white/80 backdrop-blur-sm pl-4 pr-4 py-3 rounded-lg shadow-sm focus:shadow-lg"
                  required
                />
                {errors.prenom && (
                  <p className="text-red-500 text-sm">{errors.prenom}</p>
                )}
              </div>

              {/* Nom */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="nom" className="font-medium">
                  Nom
                </Label>
                <Input
                  id="nom"
                  name="nom"
                  type="text"
                  value={formData.nom}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                  className="bg-white/80 backdrop-blur-sm pl-4 pr-4 py-3 rounded-lg shadow-sm focus:shadow-lg"
                  required
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm">{errors.nom}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Adresse email
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

            {/* Téléphone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium">
                Téléphone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+33 6 12 34 56 78"
                className="bg-white/80 backdrop-blur-sm pl-4 pr-4 py-3 rounded-lg shadow-sm focus:shadow-lg"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium">
                Mot de passe
              </Label>
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

            {/* Confirmation mot de passe */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-medium">
                Confirmer le mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="bg-white/80 backdrop-blur-sm pl-4 pr-12 py-3 rounded-lg shadow-sm focus:shadow-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Bouton */}
            <div className="flex flex-col space-y-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl"
              >
                {isLoading ? "Création en cours..." : "Créer un compte"}
              </Button>
              <p className="text-sm text-center text-gray-600">
                Vous avez déjà un compte ?{" "}
                <Link
                  href="/login"
                  className="hover:underline font-medium transition-colors"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        toastStyle={{
          width: "500px",
        }}
      />
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
