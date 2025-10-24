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
import { signUpAsParent } from "@/app/actions/auth";
import ParentForm from "@/components/features/authform/ParentForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SchoolForm from "@/components/features/authform/SchoolForm";
import ChildrenForm from "@/components/features/authform/ChildForm";
import { SignUpFormData } from "@/lib/types/user-interface";
import { createChild } from "@/app/actions/children";
import { uploadToCloudinary } from "@/app/actions/upload";

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
    adresse: z.string().min(1, "L'adresse de l'enfant est requise"),

    schoolName: z.string().min(1, "Le nom de l'école est requis"),
    schoolAddress: z.string().min(1, "L'adresse de l'école est requise"),
    schoolLat: z.coerce.number().min(-90).max(90, "Latitude invalide"),
    schoolLong: z.coerce.number().min(-180).max(180, "Longitude invalide"),

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

  const [formData, setFormData] = useState<SignUpFormData>({
    //pour le parent
    prenom: "",
    nom: "",
    email: "",
    phone: "",
    //pour l'enfant
    prenomEnfant: "",
    nomEnfant: "",
    adresse: "",
    photoEnfant: null,
    //pour l'école de l'enfant
    schoolName: "",
    schoolAddress: "",
    schoolLat: 0,
    schoolLong: 0,
    //pour le mot de passe du compte parent
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
    console.log("=== handleSubmit déclenché ===");
    setIsLoading(true);

    console.log("FormData actuel :", formData);

    // ✅ Validation Zod
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      console.log("Validation échouée :", result.error.issues);
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Certains champs sont invalides. Vérifie le formulaire.");
      setIsLoading(false);
      return;
    }

    console.log("Validation réussie !");
    setErrors({});

    try {
      // 1️⃣ Création du parent
      console.log("Création du parent...");
      const form = new FormData();
      form.append("nom", formData.nom ?? "");
      form.append("prenom", formData.prenom ?? "");
      form.append("email", formData.email ?? "");
      form.append("phone", formData.phone ?? "");
      form.append("password", formData.password ?? "");

      const resParent = await signUpAsParent(form);
      console.log("Réponse signUp :", resParent);

      if (resParent.status !== "success" || !resParent.user) {
        toast.error("Erreur lors de la création du compte parent.");
        setIsLoading(false);
        return;
      }

      const parentId = resParent.user.id;
      toast.success("Compte parent créé avec succès !");

      // 2️⃣ Vérifier la photo
      if (!formData.photoEnfant) {
        toast.warning("Vous devez fournir une photo de l'enfant !");
        setIsLoading(false);
        return;
      }

      // 3️⃣ Conversion du fichier photo
      const arrayBuffer = await formData.photoEnfant.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // 4️⃣ Upload de la photo
      toast.info("Upload de la photo de l'enfant en cours...");
      const uploadedUrl = await uploadToCloudinary(uint8Array);
      console.log("✅ Photo uploadée :", uploadedUrl);
      toast.success("Photo de l'enfant uploadée avec succès !");

      // 5️⃣ Préparer les données de l'enfant
      const childData = {
        prenomEnfant: formData.prenomEnfant!,
        nomEnfant: formData.nomEnfant!,
        adresse: formData.adresse!,
        homeLat: formData.homeLat ?? 0,
        homeLong: formData.homeLong ?? 0,
        parentId,
        schoolName: formData.schoolName!,
        schoolAddress: formData.schoolAddress!,
        schoolLat: formData.schoolLat!,
        schoolLong: formData.schoolLong!,
        photoUrl: uploadedUrl,
      };

      // 6️⃣ Création de l'enfant
      const resChild = await createChild(childData);
      console.log("Réponse createChild :", resChild);

      toast.success("Compte complet créé avec succès ");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      console.error("❌ Erreur lors de l'inscription :", err);
      toast.error("Une erreur inattendue est survenue. Réessaie plus tard.");
    } finally {
      setIsLoading(false);
      console.log("=== handleSubmit terminé ===");
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
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Informations du parent
                </h2>

                <ParentForm
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  handleNext={handleNext}
                />
              </div>
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

            {/* Étape 3 : Infos école */}
            {step === 3 && (
              <SchoolForm
                formData={formData}
                errors={errors}
                handleNext={handleNext}
                handleBack={handleBack}
                setFormData={setFormData}
              />
            )}

            {/* Étape 4 : Mot de passe */}
            {step === 4 && (
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
