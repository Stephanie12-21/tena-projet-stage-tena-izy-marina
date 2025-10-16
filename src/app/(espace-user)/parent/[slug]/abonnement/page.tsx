"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

type BillingPeriod = "monthly" | "annual";

interface PricingTier {
  children: string;
  discount: number;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    children: "1-2",
    discount: 0,
    monthlyPrice: 22500,
    annualPrice: 270000,
  },
  {
    children: "3-5",
    discount: 10,
    monthlyPrice: 20250,
    annualPrice: 243000,
    popular: true,
  },
  {
    children: "6-10",
    discount: 20,
    monthlyPrice: 18000,
    annualPrice: 216000,
  },
  {
    children: "11+",
    discount: 35,
    monthlyPrice: 14625,
    annualPrice: 175500,
  },
];

export default function PricingCards() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                billingPeriod === "annual"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annuel
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {pricingTiers.map((tier, index) => {
            const price =
              billingPeriod === "monthly"
                ? tier.monthlyPrice
                : tier.annualPrice;
            const savings =
              billingPeriod === "annual"
                ? tier.monthlyPrice * 12 - tier.annualPrice
                : 0;

            return (
              <Card
                key={index}
                className={`relative flex flex-col transition-all hover:shadow-lg ${
                  tier.popular ? "border-primary shadow-md scale-105" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground px-4 py-1">
                      Populaire
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-6">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Nombre d&apos;enfants
                    </span>
                  </div>
                  <CardTitle className="text-3xl font-bold">
                    {tier.children}
                  </CardTitle>
                  {tier.discount > 0 && (
                    <CardDescription className="mt-2">
                      <Badge variant="secondary" className="text-xs">
                        -{tier.discount}% de réduction
                      </Badge>
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="flex-1 space-y-6">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        {formatPrice(price)}
                      </span>
                      <span className="text-sm text-muted-foreground">MGA</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      par enfant / {billingPeriod === "monthly" ? "mois" : "an"}
                    </p>
                    {billingPeriod === "annual" && savings > 0 && (
                      <p className="text-xs text-accent font-medium mt-2">
                        Économisez {formatPrice(savings)} MGA/an
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Accès complet à la plateforme
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Suivi personnalisé
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Support prioritaire
                      </span>
                    </div>
                    {tier.discount > 0 && (
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          Réduction familiale
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-4">
                  <Button
                    className={`w-full ${
                      tier.popular
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                    size="lg"
                  >
                    Choisir ce plan
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-sm text-muted-foreground">
            Tous les prix sont en Ariary Malgache (MGA)
          </p>
          <p className="text-sm text-muted-foreground">
            Les réductions sont automatiquement appliquées selon le nombre
            d&apos;enfants inscrits
          </p>
        </div>
      </div>
    </div>
  );
}
