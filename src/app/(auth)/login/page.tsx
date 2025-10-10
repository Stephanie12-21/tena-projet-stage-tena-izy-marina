"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Ici tu ajouteras la logique d'authentification
    console.log(formData);
    setIsLoading(false);
  };

  //pour aller à la page de connexion
  const handleGoRegister = () => router.push("/register");

  //pour le bouton retour
  const handleGoBack = () => router.back();

  //pour les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Formulaire */}
      <div className="flex w-full md:w-1/2 flex-col p-8 relative z-10">
        {/* Haut : Bouton retour + Logo */}
        <div className="flex justify-between items-center mb-20">
          <Button
            variant="outline"
            className="group hover:scale-105 transition-all duration-300"
            onClick={handleGoBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Retour
          </Button>

          <Image src="/logo.png" alt="Smart Ride" width={50} height={50} />
        </div>

        {/* Milieu : Formulaire */}
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Bienvenue</h1>
            <p className="text-base font-medium">
              Connectez-vous à <span className="font-bold">SmartRide</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
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
            </div>

            {/* Password */}
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
            </div>

            {/* Mot de passe oublié */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-base hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Boutons */}
            <div className="flex flex-col space-y-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl"
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t">
                <span className="bg-background relative z-10 px-2">ou</span>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full py-3 rounded-lg font-semibold shadow-sm hover:shadow-md"
                onClick={handleGoRegister}
              >
                Créer un compte
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Image côté droit */}
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
