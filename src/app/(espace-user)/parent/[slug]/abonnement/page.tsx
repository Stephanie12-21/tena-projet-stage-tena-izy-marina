// "use client";

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardFooter,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Plan } from "../../../../../../generated/prisma";
// import { useAuth } from "@/app/context/provider";
// import {
//   cancelSubscription,
//   createCheckoutSession,
//   resumeSubscription,
// } from "@/app/actions/subscription";

// interface Child {
//   id: string;
//   prenom: string;
//   nom: string;
//   adresse: string;
//   homeLat: number;
//   homeLong: number;
//   subscription?: {
//     id: string;
//     status: string;
//     plan: string;
//     cancelAtPeriodEnd: boolean;
//   } | null;
// }

// export default function PricingCards() {
//   const [billingPeriod, setBillingPeriod] = useState<Plan>("MONTHLY");
//   const { dbUser, loading: authLoading } = useAuth();

//   const [children, setChildren] = useState<Child[]>([]);
//   const [loadingChildren, setLoadingChildren] = useState(true);
//   const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
//   const [loadingCheckout, setLoadingCheckout] = useState(false);

//   const subscribedChildren = children.filter((c) => c.subscription?.id);
//   const availableChildren = children.filter((c) => !c.subscription?.id);

//   useEffect(() => {
//     if (!dbUser?.id || authLoading) return;

//     const fetchChildren = async () => {
//       try {
//         setLoadingChildren(true);
//         const res = await fetch(`/api/users/${dbUser.id}/children`);
//         if (!res.ok)
//           throw new Error("Erreur lors de la récupération des enfants");
//         const data: Child[] = await res.json();
//         setChildren(data);
//       } catch (err) {
//         console.error("Erreur API enfants:", err);
//       } finally {
//         setLoadingChildren(false);
//       }
//     };

//     fetchChildren();
//   }, [dbUser?.id, authLoading]);

//   const toggleChildSelection = (id: string) => {
//     setSelectedChildren((prev) =>
//       prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
//     );
//   };

//   const priceIds = {
//     MONTHLY: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
//     YEARLY: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID!,
//   };

//   const unitPrices = {
//     MONTHLY: 22500,
//     YEARLY: 270000,
//   };

//   const formatPrice = (price: number) =>
//     new Intl.NumberFormat("fr-MG", { style: "decimal" }).format(price);

//   const totalPrice = unitPrices[billingPeriod] * selectedChildren.length;

//   const handleSubscribe = async () => {
//     if (
//       selectedChildren.length === 0 ||
//       !dbUser?.id ||
//       !dbUser?.email ||
//       !priceIds[billingPeriod]
//     )
//       return;

//     setLoadingCheckout(true);
//     try {
//       const sessionUrl = await createCheckoutSession({
//         priceId: priceIds[billingPeriod]!,
//         childrenIds: selectedChildren,
//         parentId: dbUser.id,
//         email: dbUser.email,
//       });
//       window.location.href = sessionUrl;
//     } catch (err) {
//       console.error("Erreur checkout Stripe :", err);
//       alert("Erreur lors de la création de la session de paiement.");
//     } finally {
//       setLoadingCheckout(false);
//     }
//   };

//   const handleCancelSubscription = async (childId: string) => {
//     try {
//       const child = children.find((c) => c.id === childId);
//       if (!child?.subscription?.id) return alert("Aucun abonnement trouvé.");

//       await cancelSubscription(child.subscription?.id);
//       alert("L'abonnement sera annulé à la fin de la période en cours.");
//     } catch (err) {
//       console.error("Erreur annulation:", err);
//       alert("Impossible d'annuler l'abonnement.");
//     }
//   };

//   const handleResumeSubscription = async (childId: string) => {
//     console.log("id enfant reprise :", childId);
//     try {
//       const res = await resumeSubscription(childId);

//       if (res.error) {
//         alert(res.error);
//         return;
//       }

//       alert(res.message || "Abonnement repris avec succès ✅");
//     } catch (err) {
//       console.error("Erreur reprise abonnement:", err);
//       alert("Impossible de reprendre l'abonnement ❌");
//     }
//   };

//   if (authLoading || loadingChildren) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-muted-foreground text-sm">
//           Chargement des données...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto space-y-8 text-center">
//         <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
//           <button
//             onClick={() => setBillingPeriod("MONTHLY")}
//             className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
//               billingPeriod === "MONTHLY"
//                 ? "bg-primary text-primary-foreground shadow-sm"
//                 : "text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             Mensuel
//           </button>
//           <button
//             onClick={() => setBillingPeriod("YEARLY")}
//             className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
//               billingPeriod === "YEARLY"
//                 ? "bg-primary text-primary-foreground shadow-sm"
//                 : "text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             Annuel
//           </button>
//         </div>

//         <Card className="max-w-md mx-auto shadow-md hover:shadow-lg transition-all">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold">
//               Abonnement {billingPeriod === "MONTHLY" ? "Mensuel" : "Annuel"}
//             </CardTitle>
//             <CardDescription>
//               Prix fixe par enfant — sans réduction
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-6 text-left">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground mb-2 text-center">
//                 Sélectionnez les enfants à abonner :
//               </p>
//               <div className="space-y-2">
//                 {availableChildren.length === 0 ? (
//                   <p className="text-center text-muted-foreground text-sm">
//                     Aucun enfant disponible pour un nouvel abonnement.
//                   </p>
//                 ) : (
//                   availableChildren.map((child) => (
//                     <label
//                       key={child.id}
//                       className="flex items-center gap-2 border rounded-lg p-2 cursor-pointer hover:bg-muted transition"
//                     >
//                       <Checkbox
//                         checked={selectedChildren.includes(child.id)}
//                         onCheckedChange={() => toggleChildSelection(child.id)}
//                       />
//                       <span>
//                         {child.prenom} {child.nom}
//                       </span>
//                     </label>
//                   ))
//                 )}
//               </div>
//             </div>

//             <div className="border-t pt-4 text-center">
//               <p className="text-lg font-semibold">
//                 Total :{" "}
//                 <span className="text-primary font-bold">
//                   {formatPrice(totalPrice)} MGA
//                 </span>
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 pour {selectedChildren.length || 0}{" "}
//                 {selectedChildren.length > 1 ? "enfants" : "enfant"}
//               </p>
//             </div>
//           </CardContent>

//           <CardFooter>
//             <Button
//               className="w-full"
//               size="lg"
//               disabled={selectedChildren.length === 0 || loadingCheckout}
//               onClick={handleSubscribe}
//             >
//               {loadingCheckout ? "Redirection..." : "Confirmer l'abonnement"}
//             </Button>
//           </CardFooter>
//         </Card>

//         {subscribedChildren.length > 0 && (
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold mb-2">Enfants déjà abonnés</h3>
//             <div className="overflow-x-auto">
//               <table className="table-auto w-full border border-muted rounded-md">
//                 <thead className="bg-muted text-left">
//                   <tr>
//                     <th className="px-3 py-2">Nom</th>
//                     <th className="px-3 py-2">Prénom</th>
//                     <th className="px-3 py-2">Statut</th>
//                     <th className="px-3 py-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {subscribedChildren.map((child) => (
//                     <tr key={child.id} className="border-t border-muted">
//                       <td className="px-3 py-2">{child.nom}</td>
//                       <td className="px-3 py-2">{child.prenom}</td>
//                       <td className="px-3 py-2">
//                         <span
//                           className={`px-2 py-1 text-xs rounded ${
//                             child.subscription?.cancelAtPeriodEnd
//                               ? "bg-yellow-100 text-yellow-700"
//                               : child.subscription?.status?.toLowerCase() ===
//                                 "active"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-red-100 text-red-700"
//                           }`}
//                         >
//                           {child.subscription?.cancelAtPeriodEnd
//                             ? "Actif jusqu'à la fin de la période"
//                             : child.subscription?.status?.toLowerCase() ===
//                               "active"
//                             ? "Actif"
//                             : "Annulé"}
//                         </span>
//                       </td>
//                       <td className="px-3 py-2 flex gap-2">
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => handleCancelSubscription(child.id)}
//                           disabled={
//                             !(
//                               child.subscription?.status?.toLowerCase() ===
//                                 "active" &&
//                               child.subscription?.cancelAtPeriodEnd === false
//                             )
//                           }
//                         >
//                           Annuler
//                         </Button>

//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => handleResumeSubscription(child.id)}
//                           disabled={
//                             !(
//                               (child.subscription?.status?.toLowerCase() ===
//                                 "active" &&
//                                 child.subscription?.cancelAtPeriodEnd ===
//                                   true) ||
//                               child.subscription?.status?.toLowerCase() !==
//                                 "active"
//                             )
//                           }
//                         >
//                           Reprendre
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
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
  resumeSubscription,
} from "@/app/actions/subscription";
import {
  CreditCard,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  RefreshCw,
} from "lucide-react";

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
    try {
      const res = await resumeSubscription(childId);

      if (res.error) {
        alert(res.error);
        return;
      }

      alert(res.message || "Abonnement repris avec succès ✅");
    } catch (err) {
      console.error("Erreur reprise abonnement:", err);
      alert("Impossible de reprendre l'abonnement ❌");
    }
  };

  if (authLoading || loadingChildren) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement de vos données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Tarification simple et transparente
          </div>
          <h1 className="text-5xl font-bold text-gray-900">
            Choisissez votre formule
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un tarif fixe par enfant, sans surprise. Annulez à tout moment.
          </p>
        </div>

        {/* Toggle période */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 p-1.5 bg-white rounded-xl shadow-sm border border-gray-200">
            <button
              onClick={() => setBillingPeriod("MONTHLY")}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                billingPeriod === "MONTHLY"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod("YEARLY")}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                billingPeriod === "YEARLY"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annuel
            </button>
          </div>
        </div>

        {/* Carte de tarification principale */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 opacity-10 rounded-full blur-3xl"></div>

            <CardHeader className="relative pb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                {billingPeriod === "YEARLY" && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Populaire
                  </span>
                )}
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                Abonnement {billingPeriod === "MONTHLY" ? "Mensuel" : "Annuel"}
              </CardTitle>
              <CardDescription className="text-base text-gray-600 mt-2">
                <div className="flex items-center gap-2 mt-4">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Protection complète pour vos enfants</span>
                </div>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 relative">
              {/* Avantages */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-gray-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Inclus dans votre abonnement
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Suivi en temps réel
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Alertes de sécurité instantanées
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Support prioritaire 24/7
                  </li>
                </ul>
              </div>

              {/* Sélection des enfants */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Sélectionnez les enfants à abonner
                </p>
                <div className="space-y-2">
                  {availableChildren.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">
                        Aucun enfant disponible
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Tous vos enfants ont déjà un abonnement actif
                      </p>
                    </div>
                  ) : (
                    availableChildren.map((child) => (
                      <label
                        key={child.id}
                        className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          selectedChildren.includes(child.id)
                            ? "border-blue-500 bg-blue-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <Checkbox
                          checked={selectedChildren.includes(child.id)}
                          onCheckedChange={() => toggleChildSelection(child.id)}
                          className="data-[state=checked]:bg-blue-600"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-900">
                            {child.prenom} {child.nom}
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {child.adresse}
                          </p>
                        </div>
                        {selectedChildren.includes(child.id) && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        )}
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* Prix total */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium mb-1">
                      Total à payer
                    </p>
                    <p className="text-4xl font-bold">
                      {formatPrice(totalPrice)} MGA
                    </p>
                    <p className="text-blue-100 text-sm mt-1">
                      pour {selectedChildren.length || 0}{" "}
                      {selectedChildren.length > 1 ? "enfants" : "enfant"}
                    </p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <CreditCard className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-6">
              <Button
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                disabled={selectedChildren.length === 0 || loadingCheckout}
                onClick={handleSubscribe}
              >
                {loadingCheckout ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Redirection en cours...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Confirmer l&apos;abonnement
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Enfants déjà abonnés */}
        {subscribedChildren.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Abonnements actifs
              </h3>
              <span className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                {subscribedChildren.length} enfant
                {subscribedChildren.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Enfant
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subscribedChildren.map((child) => (
                      <tr
                        key={child.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                              <Users className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {child.prenom} {child.nom}
                              </p>
                              <p className="text-sm text-gray-500">
                                {child.adresse}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {child.subscription?.cancelAtPeriodEnd ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 text-orange-700 border border-orange-200">
                              <Clock className="w-4 h-4" />
                              Expire bientôt
                            </span>
                          ) : child.subscription?.status?.toLowerCase() ===
                            "active" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200">
                              <CheckCircle2 className="w-4 h-4" />
                              Actif
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-700 border border-red-200">
                              <XCircle className="w-4 h-4" />
                              Inactif
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => handleCancelSubscription(child.id)}
                              disabled={
                                !(
                                  child.subscription?.status?.toLowerCase() ===
                                    "active" &&
                                  child.subscription?.cancelAtPeriodEnd ===
                                    false
                                )
                              }
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Annuler
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
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
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Reprendre
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
