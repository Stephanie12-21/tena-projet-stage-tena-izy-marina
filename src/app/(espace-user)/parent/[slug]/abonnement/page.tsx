"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/app/context/provider";
import {
  cancelSubscription,
  createCheckoutSession,
  resumeSubscription,
} from "@/app/actions/subscription";
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  X,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [billingPeriod, setBillingPeriod] = useState<"MONTHLY" | "YEARLY">(
    "MONTHLY"
  );
  const { dbUser, loading: authLoading } = useAuth();

  const [children, setChildren] = useState<Child[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(true);
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const [cancelModal, setCancelModal] = useState<{
    isOpen: boolean;
    child: Child | null;
  }>({ isOpen: false, child: null });
  const [isCancelling, setIsCancelling] = useState(false);

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
        toast.error("Impossible de charger les enfants");
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

  const priceIds: Record<"MONTHLY" | "YEARLY", string> = {
    MONTHLY: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
    YEARLY: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID!,
  };

  const unitPrices: Record<"MONTHLY" | "YEARLY", number> = {
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
      toast.error("Erreur lors de la création de la session de paiement.");
    } finally {
      setLoadingCheckout(false);
    }
  };

  const openCancelModal = (child: Child) => {
    setCancelModal({ isOpen: true, child });
  };

  const closeCancelModal = () => {
    setCancelModal({ isOpen: false, child: null });
  };

  const handleCancelSubscription = async () => {
    if (!cancelModal.child?.subscription?.id) return;

    setIsCancelling(true);
    try {
      await cancelSubscription(cancelModal.child.subscription.id);
      toast.success(
        "L'abonnement sera annulé à la fin de la période en cours."
      );

      const res = await fetch(`/api/users/${dbUser?.id}/children`);
      const data: Child[] = await res.json();
      setChildren(data);

      closeCancelModal();
    } catch (err) {
      console.error("Erreur annulation:", err);
      toast.error("Impossible d'annuler l'abonnement.");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleResumeSubscription = async (childId: string) => {
    try {
      const res = await resumeSubscription(childId);

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success(res.message || "Abonnement repris avec succès ✅");

      const response = await fetch(`/api/users/${dbUser?.id}/children`);
      const data: Child[] = await response.json();
      setChildren(data);
    } catch (err) {
      console.error("Erreur reprise abonnement:", err);
      toast.error("Impossible de reprendre l'abonnement ❌");
    }
  };

  const getPlanLabel = (plan?: string) => {
    if (plan === "MONTHLY") return "Abonnement mensuel";
    if (plan === "YEARLY") return "Abonnement annuel";
    return "Aucun abonnement";
  };

  if (authLoading || loadingChildren) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-border">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Abonnements
          </h1>
          <p className="text-sm text-muted-foreground">
            Gérez les abonnements de vos enfants
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche - Configuration (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Toggle période */}
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Période de facturation
              </h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={billingPeriod === "MONTHLY" ? "default" : "outline"}
                  onClick={() => setBillingPeriod("MONTHLY")}
                  className="flex-1"
                >
                  Mensuel
                </Button>
                <Button
                  size="sm"
                  variant={billingPeriod === "YEARLY" ? "default" : "outline"}
                  onClick={() => setBillingPeriod("YEARLY")}
                  className="flex-1"
                >
                  Annuel
                </Button>
              </div>
            </Card>

            {/* Sélection des enfants */}
            {availableChildren.length > 0 && (
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Sélectionner les enfants ({availableChildren.length})
                </h3>
                <div className="space-y-2">
                  {availableChildren.map((child) => (
                    <label
                      key={child.id}
                      className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedChildren.includes(child.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <Checkbox
                        checked={selectedChildren.includes(child.id)}
                        onCheckedChange={() => toggleChildSelection(child.id)}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {child.prenom} {child.nom}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {child.adresse}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </Card>
            )}

            {/* Abonnements actifs */}
            {subscribedChildren.length > 0 && (
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Abonnements actifs ({subscribedChildren.length})
                </h3>
                <div className="space-y-3">
                  {subscribedChildren.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {child.prenom} {child.nom}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {getPlanLabel(child.subscription?.plan)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {child.subscription?.cancelAtPeriodEnd ? (
                          <span className="text-xs px-2 py-1 rounded-md bg-orange-500/10 text-orange-600">
                            <Clock className="w-3 h-3 inline mr-1" />
                            Expire à la fin de la période
                          </span>
                        ) : child.subscription?.status?.toLowerCase() ===
                          "active" ? (
                          <span className="text-sm px-2 py-1 rounded-md bg-green-500/10 text-green-600">
                            <CheckCircle2 className="w-3 h-3 inline mr-1" />
                            Actif
                          </span>
                        ) : (
                          <span className="text-sm px-2 py-1 rounded-md bg-red-500/10 text-red-600">
                            <XCircle className="w-3 h-3 inline mr-1" />
                            Inactif
                          </span>
                        )}

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openCancelModal(child)}
                          disabled={
                            !(
                              child.subscription?.status?.toLowerCase() ===
                                "active" &&
                              child.subscription?.cancelAtPeriodEnd === false
                            )
                          }
                        >
                          <XCircle className="w-4 h-4" />
                          Annuler
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleResumeSubscription(child.id)}
                          disabled={
                            !(
                              (child.subscription?.status?.toLowerCase() ===
                                "active" &&
                                child.subscription?.cancelAtPeriodEnd ===
                                  true) ||
                              child.subscription?.status?.toLowerCase() !==
                                "active"
                            )
                          }
                        >
                          <RefreshCw className="w-4 h-4" />
                          Reprendre
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Colonne droite - Récapitulatif (1/3) */}
          <div className="lg:col-span-1">
            <Card className="p-5 sticky top-8">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Récapitulatif
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Période</span>
                    <span className="font-medium text-foreground">
                      {billingPeriod === "MONTHLY" ? "Mensuel" : "Annuel"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Prix unitaire</span>
                    <span className="font-medium text-foreground">
                      {formatPrice(unitPrices[billingPeriod])} MGA
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Enfants</span>
                    <span className="font-medium text-foreground">
                      {selectedChildren.length}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-2xl font-semibold text-foreground">
                      {formatPrice(totalPrice)} MGA
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    disabled={selectedChildren.length === 0 || loadingCheckout}
                    onClick={handleSubscribe}
                  >
                    {loadingCheckout ? "Redirection..." : "Confirmer"}
                  </Button>
                </div>

                {selectedChildren.length === 0 && (
                  <p className="text-xs text-center text-muted-foreground pt-2">
                    Sélectionnez des enfants pour continuer
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal d'annulation */}
      {cancelModal.isOpen && cancelModal.child && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeCancelModal}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Annuler l&apos;abonnement
                  </CardTitle>
                  <button
                    onClick={closeCancelModal}
                    className="p-1 rounded-lg hover:bg-muted"
                    disabled={isCancelling}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Confirmer l&apos;annulation pour{" "}
                  <span className="font-semibold text-foreground">
                    {cancelModal.child.prenom} {cancelModal.child.nom}
                  </span>{" "}
                  ?
                </p>

                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {cancelModal.child.prenom} {cancelModal.child.nom}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {cancelModal.child.adresse}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  L&apos;abonnement restera actif jusqu&apos;à la fin de la
                  période en cours.
                </p>
              </CardContent>

              <CardFooter className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={closeCancelModal}
                  className="flex-1"
                  disabled={isCancelling}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                  variant="destructive"
                  className="flex-1"
                >
                  {isCancelling ? "Annulation..." : "Confirmer"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}
