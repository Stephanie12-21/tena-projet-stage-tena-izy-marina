"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plan } from "../../../../../../generated/prisma";
import { useAuth } from "@/app/context/provider";
import { createCheckoutSession } from "@/app/actions/subscription";

interface Child {
  id: string;
  prenom: string;
  nom: string;
  adresse: string;
  homeLat: number;
  homeLong: number;
}

export default function PricingCards() {
  const [billingPeriod, setBillingPeriod] = useState<Plan>("MONTHLY");
  const { dbUser, loading: authLoading } = useAuth();

  const [children, setChildren] = useState<Child[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(true);
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  // Récupération des enfants
  useEffect(() => {
    if (!dbUser?.id || authLoading) return;

    const fetchChildren = async () => {
      try {
        setLoadingChildren(true);
        const res = await fetch(`/api/users/${dbUser.id}/children`);
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des enfants");
        const data: Child[] = await res.json();
        setChildren(data);
      } catch (err) {
        console.error("Erreur API enfants:", err);
      } finally {
        setLoadingChildren(false);
      }
    };

    fetchChildren();
  }, [dbUser?.id, authLoading]);

  const toggleChildSelection = (id: string) => {
    setSelectedChildren((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const priceIds = {
    MONTHLY: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
    YEARLY: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID!,
  };

  const unitPrices = {
    MONTHLY: 22500,
    YEARLY: 270000,
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-MG", { style: "decimal" }).format(price);

  const totalPrice = unitPrices[billingPeriod] * selectedChildren.length;

  // ✅ Server action call
  const handleSubscribe = async () => {
    if (
      selectedChildren.length === 0 ||
      !dbUser?.id ||
      !dbUser?.email ||
      !priceIds[billingPeriod]
    )
      return;

    setLoadingCheckout(true);

    try {
      const sessionUrl = await createCheckoutSession({
        priceId: priceIds[billingPeriod]!,
        childrenIds: selectedChildren,
        parentId: dbUser.id,
        email: dbUser.email,
      });

      window.location.href = sessionUrl; // ✅ une seule session
    } catch (err) {
      console.error("Erreur checkout Stripe :", err);
      alert("Erreur lors de la création de la session de paiement.");
    } finally {
      setLoadingCheckout(false);
    }
  };

  if (authLoading || loadingChildren) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Chargement des données...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 text-center">
        {/* Toggle mensuel / annuel */}
        <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setBillingPeriod("MONTHLY")}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
              billingPeriod === "MONTHLY"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBillingPeriod("YEARLY")}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
              billingPeriod === "YEARLY"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Annuel
          </button>
        </div>

        {/* Carte principale */}
        <Card className="max-w-md mx-auto shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Abonnement {billingPeriod === "MONTHLY" ? "Mensuel" : "Annuel"}
            </CardTitle>
            <CardDescription>
              Prix fixe par enfant — sans réduction
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 text-left">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2 text-center">
                Sélectionnez les enfants à abonner :
              </p>
              <div className="space-y-2">
                {children.length === 0 ? (
                  <p className="text-center text-muted-foreground text-sm">
                    Aucun enfant trouvé pour ce compte parent.
                  </p>
                ) : (
                  children.map((child) => (
                    <label
                      key={child.id}
                      className="flex items-center gap-2 border rounded-lg p-2 cursor-pointer hover:bg-muted transition"
                    >
                      <Checkbox
                        checked={selectedChildren.includes(child.id)}
                        onCheckedChange={() => toggleChildSelection(child.id)}
                      />
                      <span>
                        {child.prenom} {child.nom}
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>

            <div className="border-t pt-4 text-center">
              <p className="text-lg font-semibold">
                Total :{" "}
                <span className="text-primary font-bold">
                  {formatPrice(totalPrice)} MGA
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                pour {selectedChildren.length || 0}{" "}
                {selectedChildren.length > 1 ? "enfants" : "enfant"}
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              size="lg"
              disabled={selectedChildren.length === 0 || loadingCheckout}
              onClick={handleSubscribe}
            >
              {loadingCheckout ? "Redirection..." : "Confirmer l'abonnement"}
            </Button>
          </CardFooter>
        </Card>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>Tous les prix sont en Ariary Malgache (MGA).</p>
          <p>Chaque enfant nécessite un abonnement individuel.</p>
        </div>
      </div>
    </div>
  );
}
