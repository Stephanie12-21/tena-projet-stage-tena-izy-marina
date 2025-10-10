"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import z from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendResetPasswordEmail } from "@/app/actions/auth";

// ✅ Schéma de validation Zod
const emailSchema = z.object({
  email: z.string().email("Email invalide"),
});

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // ✅ Validation Zod
    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Veuillez entrer un email valide !");
      setIsLoading(false);
      return;
    }

    setErrors({});

    try {
      const res = await sendResetPasswordEmail(email);

      if (res.success) {
        toast.success("Email de réinitialisation envoyé avec succès !");
      } else {
        toast.error(res.message || "Une erreur est survenue.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
    }

    setIsLoading(false);
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
              Entrez votre adresse e-mail pour recevoir le lien de
              réinitialisation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@smartride.com"
                className="bg-white/80 backdrop-blur-sm pl-4 pr-4 py-3 rounded-lg shadow-sm focus:shadow-lg"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl"
              >
                {isLoading
                  ? "Envoi en cours..."
                  : "Envoyer l'email de réinitialisation"}
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
};

export default ForgotPasswordPage;
