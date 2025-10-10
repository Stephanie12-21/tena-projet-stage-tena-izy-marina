"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { signUp } from "@/app/actions/auth";
import ParentForm from "@/components/features/authform/ParentForm";
import ChildrenForm, {
  type SignUpFormData,
} from "@/components/features/authform/ChildForm";

// ✅ Validation du formulaire complet
const signupSchema = z
  .object({
    prenom: z.string().min(1, "Le prénom est requis"),
    nom: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    phone: z
      .string()
      .regex(/^\+?[0-9\s]{7,15}$/, "Numéro de téléphone invalide"),
    prenomEnfant: z.string().min(1, "Le prénom de l'enfant est requis"),
    nomEnfant: z.string().min(1, "Le nom de l'enfant est requis"),
    adresse: z.string().min(1, "L'adresse est requise"),
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
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ FormData typé (compatible avec ChildrenForm)
  const [formData, setFormData] = useState<SignUpFormData>({
    prenom: "",
    nom: "",
    email: "",
    phone: "",
    prenomEnfant: "",
    nomEnfant: "",
    adresse: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleGoBack = () => router.back();
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

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
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        form.append(key, String(value ?? ""))
      );

      const res = await signUp(form);

      if (res.status === "success") {
        alert("Compte créé avec succès !");
        router.push("/login");
      } else {
        alert("Erreur : " + res.status);
        setErrors({ global: res.status });
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      alert("Une erreur inattendue est survenue.");
      setErrors({ global: "Une erreur inattendue est survenue." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* --- FORMULAIRE --- */}
      <div className="flex w-full md:w-1/2 flex-col p-4 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <Button
            variant="outline"
            className="group hover:scale-105 transition-all"
            onClick={handleGoBack}
            type="button"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour
          </Button>
          <Image src="/logo.png" alt="Smart Ride" width={50} height={50} />
        </div>

        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Bienvenue</h1>
            <p className="text-base font-medium">
              Créez un compte pour <span className="font-bold">SmartRide</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            {/* Étape 1 : Infos parent */}
            {step === 1 && (
              <ParentForm
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                handleNext={handleNext}
              />
            )}

            {/* Étape 2 : Infos enfant */}
            {step === 2 && (
              <ChildrenForm
                formData={formData}
                errors={errors}
                handleNext={handleNext}
                handleBack={handleBack}
                setFormData={setFormData}
              />
            )}

            {/* Étape 3 : Mot de passe */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Mot de passe</h2>

                {/* Mot de passe */}
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password ?? ""}
                      onChange={handleInputChange}
                      placeholder="••••••••"
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

                {/* Confirmation */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirmer le mot de passe
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword ?? ""}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex justify-between flex-col md:flex-row gap-4">
                  <Button type="button" onClick={handleBack}>
                    Retour
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Création en cours..." : "Créer un compte"}
                  </Button>
                </div>

                <p className="text-sm text-center text-gray-600 mt-2">
                  Vous avez déjà un compte ?{" "}
                  <Link href="/login" className="hover:underline font-medium">
                    Se connecter
                  </Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* --- Illustration --- */}
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
