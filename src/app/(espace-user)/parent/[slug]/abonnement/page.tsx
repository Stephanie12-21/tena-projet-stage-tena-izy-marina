"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plan } from "../../../../../../generated/prisma";
import { useAuth } from "@/app/context/provider";
import {
  cancelSubscription,
  createCheckoutSession,
} from "@/app/actions/subscription";

interface Child {
  id: string;
  prenom: string;
  nom: string;
  adresse: string;
  homeLat: number;
  homeLong: number;
  subscription?: {
    id: string;
    status: string;
    plan: string;
    cancelAtPeriodEnd: boolean;
  } | null;
}

export default function PricingCards() {
  const [billingPeriod, setBillingPeriod] = useState<Plan>("MONTHLY");
  const { dbUser, loading: authLoading } = useAuth();

  const [children, setChildren] = useState<Child[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(true);
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const subscribedChildren = children.filter((c) => c.subscription?.id);
  const availableChildren = children.filter((c) => !c.subscription?.id);

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
      window.location.href = sessionUrl;
    } catch (err) {
      console.error("Erreur checkout Stripe :", err);
      alert("Erreur lors de la création de la session de paiement.");
    } finally {
      setLoadingCheckout(false);
    }
  };

  const handleCancelSubscription = async (childId: string) => {
    try {
      const child = children.find((c) => c.id === childId);
      if (!child?.subscription?.id) return alert("Aucun abonnement trouvé.");

      await cancelSubscription(child.subscription?.id);
      alert("L'abonnement sera annulé à la fin de la période en cours.");
    } catch (err) {
      console.error("Erreur annulation:", err);
      alert("Impossible d'annuler l'abonnement.");
    }
  };

  const handleResumeSubscription = async (childId: string) => {
    // TODO: appeler une API pour reprendre l'abonnement de cet enfant
    console.log("Reprendre abonnement pour :", childId);
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

        {/* Carte principale pour abonnement des enfants disponibles */}
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
                {availableChildren.length === 0 ? (
                  <p className="text-center text-muted-foreground text-sm">
                    Aucun enfant disponible pour un nouvel abonnement.
                  </p>
                ) : (
                  availableChildren.map((child) => (
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

        {/* Tableau des enfants déjà abonnés */}
        {subscribedChildren.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Enfants déjà abonnés</h3>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border border-muted rounded-md">
                <thead className="bg-muted text-left">
                  <tr>
                    <th className="px-3 py-2">Nom</th>
                    <th className="px-3 py-2">Prénom</th>
                    <th className="px-3 py-2">Statut de l&apos;abonnement</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribedChildren.map((child) => (
                    <tr key={child.id} className="border-t border-muted">
                      <td className="px-3 py-2">{child.nom}</td>
                      <td className="px-3 py-2">{child.prenom}</td>
                      <td className="px-3 py-2">
                        {/* ✅ Affichage du statut avec style */}
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            child.subscription?.cancelAtPeriodEnd
                              ? "bg-yellow-100 text-yellow-700"
                              : child.subscription?.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {child.subscription?.cancelAtPeriodEnd
                            ? "Actif jusqu'à la fin de la période"
                            : child.subscription?.status === "active"
                            ? "Active"
                            : "Canceled"}
                        </span>
                      </td>
                      <td className="px-3 py-2 flex gap-2">
                        {/* Bouton Annuler */}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCancelSubscription(child.id)}
                          disabled={
                            child.subscription?.status === "active"
                              ? false
                              : true
                          }
                        >
                          Annuler
                        </Button>

                        {/* Bouton Reprendre */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleResumeSubscription(child.id)}
                          disabled={
                            child.subscription?.status === "active"
                              ? true
                              : false
                          }
                        >
                          Reprendre
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
