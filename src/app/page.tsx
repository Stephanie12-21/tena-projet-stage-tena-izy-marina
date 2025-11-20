"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Shield,
  Bell,
  ArrowRight,
  UserPlus,
  QrCode,
  Activity,
  Check,
} from "lucide-react";
import Link from "next/link";

import { Menu, X } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/provider";
import { toast } from "react-toastify";
import Image from "next/image";

const menuItems = [
  { name: "À propos", href: "#about" },
  { name: "Services", href: "#service" },
  { name: "Comment ça marche", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export default function HomePage() {
  const monthlyPrice = 22500;
  const annualPrice = 270000;
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { user, dbUser, logout, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Génère un slug propre : "nom-prenom" sans accents ni majuscules
  const makeSlug = (nom: string, prenom: string) => {
    return `${nom}-${prenom}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // supprime les accents
      .replace(/\s+/g, "-") // remplace les espaces par des tirets
      .replace(/[^a-z0-9-]/g, ""); // supprime caractères spéciaux
  };
  // 🔹 Redirection dynamique selon rôle
  const handleRedirect = () => {
    if (!dbUser) return;

    const role = dbUser.role;
    const slug = makeSlug(dbUser.nom, dbUser.prenom);

    if (role === "ADMIN") {
      router.push(`/admin/${slug}/`);
    } else if (role === "PARENT") {
      router.push(`/parent/${slug}/`);
    } else if (role === "DRIVER") {
      router.push(`/driver/${slug}/`);
    } else {
      toast.error("Vous n'êtes pas autorisé à accéder à cet espace.");
    }
  };
  return (
    <main>
      <header>
        <nav
          data-state={menuState && "active"}
          className="fixed z-20 w-full px-2"
        >
          <div
            className={cn(
              "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
              isScrolled &&
                "bg-background/50 max-w-5xl rounded-2xl border backdrop-blur-lg lg:px-5"
            )}
          >
            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2"
                >
                  <Image
                    height={40}
                    width={40}
                    src="/logo.png"
                    alt="SmartRide Logo"
                    className="h-10 w-10 object-contain"
                  />

                  <span className="text-xl font-medium text-primary">
                    SmartRide
                  </span>
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="m-auto size-6 duration-200" />
                  <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              {/* Menu principal */}
              <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                <ul className="flex gap-8 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-[#252C37] hover:text-primary block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Boutons utilisateur */}
              <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none">
                {!loading && user ? (
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleRedirect}
                    >
                      Mon espace
                    </Button>
                    <Button
                      size="sm"
                      onClick={logout}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Se déconnecter
                    </Button>
                  </div>
                ) : (
                  <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className={cn(isScrolled && "lg:hidden")}
                    >
                      <Link href="/login">Se connecter</Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className={cn(isScrolled && "lg:hidden")}
                    >
                      <Link href="/register/as-parent">S&apos;inscrire</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="min-h-screen bg-white pt-24">
        {/* Hero Section */}
        <section className="px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Suivez vos enfants
              <br />
              <span className="text-orange-500">en toute sérénité</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Une solution simple pour suivre le trajet de vos enfants entre la
              maison et l&apos;école
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Link href="/register/as-parent">
                  Commencer maintenant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-orange-500 mb-4">
                Nos Services
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-balance">
                Services adaptés à{" "}
                <span className="text-orange-500">vos besoins</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Suivi GPS</h3>
                <p className="text-sm text-gray-600">
                  Suivez en temps réel la position exacte du bus de vos enfants
                  sur une carte interactive
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Notifications</h3>
                <p className="text-sm text-gray-600">
                  Recevez des alertes instantanées lors des montées et descentes
                  du bus
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sécurité</h3>
                <p className="text-sm text-gray-600">
                  Données cryptées et sécurisées pour protéger la vie privée de
                  vos enfants
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-orange-500 mb-4">
                Simple et Rapide
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-balance">
                Comment <span className="text-orange-500">ça marche ?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                    <UserPlus className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-orange-500/20 rounded-full -z-10"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Créez votre compte</h3>
                <p className="text-gray-600">
                  Inscrivez-vous en quelques secondes et ajoutez les
                  informations de vos enfants
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                    <QrCode className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-orange-500/20 rounded-full -z-10"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Générez le QR code</h3>
                <p className="text-gray-600">
                  Un code unique est créé pour chaque enfant pour faciliter le
                  scan lors des trajets
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-orange-500/20 rounded-full -z-10"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Suivez en temps réel</h3>
                <p className="text-gray-600">
                  Accédez à votre tableau de bord et recevez des notifications
                  instantanées
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-3xl font-medium text-orange-500 mb-4">
                Tarification
              </p>
              <h2 className="text- md:text-4xl font-bold text-balance mb-8">
                Nos offres d&apos;
                <span className="text-orange-500">abonnement disponibles</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Monthly */}
              <Card className="p-8 transition-all ring-2 ring-orange-500 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-4">Plan Mensuel</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-slate-950">
                      {(monthlyPrice / 1000).toFixed(1) + "K"}
                    </span>
                    <span className="text-gray-600 font-medium">par mois</span>
                  </div>
                  <p className="text-gray-600 text-sm">par enfant / mois</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Suivi du trajet en temps réel
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Notifications instantanées
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Historique des scans (montées et descentes)
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  <Link href="/register/as-parent">Commencer maintenant</Link>
                </Button>
              </Card>

              {/* Annual */}
              <Card className="p-8 transition-all relative ring-2 ring-orange-500 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-4">Accès Annuel</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-slate-950">
                      {(annualPrice / 1000).toFixed(0) + "K"}
                    </span>
                    <span className="text-gray-600 font-medium">par an</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Suivi du trajet en temps réel
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Notifications instantanées
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Historique des scans (montées et descentes)
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  <Link href="/register/as-parent">Commencer maintenant</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 bg-slate-950 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Prêt à commencer ?
            </h2>
            <p className="text-gray-300 mb-8">
              Rejoignez les parents qui font confiance à notre solution
            </p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/register/as-parent">
                Créer mon compte gratuitement
              </Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                © 2025 SmartRide. Tous droits réservés.
              </p>
              <div className="flex gap-6 text-sm text-gray-500">
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  Confidentialité
                </Link>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  Conditions
                </Link>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
