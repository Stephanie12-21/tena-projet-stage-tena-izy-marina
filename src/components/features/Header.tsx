"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/provider";
import { toast, ToastContainer } from "react-toastify";

const menuItems = [
  { name: "À propos", href: "#about" },
  { name: "Services", href: "#service" },
  { name: "Comment ça marche", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
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
      router.push(`/admin/${slug}/dashboard`);
    } else if (role === "PARENT") {
      router.push(`/parent/${slug}/`);
    } else if (role === "DRIVER") {
      router.push(`/driver/${slug}/`);
    } else {
      toast.error("Vous n'êtes pas autorisé à accéder à cet espace.");
    }
  };

  return (
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
                  <Button size="sm" variant="outline" onClick={handleRedirect}>
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
                    <Link href="/register/asParent">S&apos;inscrire</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </nav>
    </header>
  );
};
