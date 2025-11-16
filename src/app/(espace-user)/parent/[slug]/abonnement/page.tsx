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
// import {
//   CreditCard,
//   Users,
//   CheckCircle2,
//   XCircle,
//   Clock,
//   Sparkles,
//   ArrowRight,
//   Shield,
//   Zap,
//   RefreshCw,
//   AlertTriangle,
//   X,
// } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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

//   // Modals
//   const [cancelModal, setCancelModal] = useState<{
//     isOpen: boolean;
//     child: Child | null;
//   }>({ isOpen: false, child: null });
//   const [isCancelling, setIsCancelling] = useState(false);

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
//         toast.error("Impossible de charger les enfants");
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
//       toast.error("Erreur lors de la création de la session de paiement.");
//     } finally {
//       setLoadingCheckout(false);
//     }
//   };

//   const openCancelModal = (child: Child) => {
//     setCancelModal({ isOpen: true, child });
//   };

//   const closeCancelModal = () => {
//     setCancelModal({ isOpen: false, child: null });
//   };

//   const handleCancelSubscription = async () => {
//     if (!cancelModal.child?.subscription?.id) return;

//     setIsCancelling(true);
//     try {
//       await cancelSubscription(cancelModal.child.subscription.id);
//       toast.success(
//         "L'abonnement sera annulé à la fin de la période en cours."
//       );

//       // Rafraîchir les données
//       const res = await fetch(`/api/users/${dbUser?.id}/children`);
//       const data: Child[] = await res.json();
//       setChildren(data);

//       closeCancelModal();
//     } catch (err) {
//       console.error("Erreur annulation:", err);
//       toast.error("Impossible d'annuler l'abonnement.");
//     } finally {
//       setIsCancelling(false);
//     }
//   };

//   const handleResumeSubscription = async (childId: string) => {
//     try {
//       const res = await resumeSubscription(childId);

//       if (res.error) {
//         toast.error(res.error);
//         return;
//       }

//       toast.success(res.message || "Abonnement repris avec succès ✅");

//       // Rafraîchir les données
//       const response = await fetch(`/api/users/${dbUser?.id}/children`);
//       const data: Child[] = await response.json();
//       setChildren(data);
//     } catch (err) {
//       console.error("Erreur reprise abonnement:", err);
//       toast.error("Impossible de reprendre l'abonnement ❌");
//     }
//   };

//   if (authLoading || loadingChildren) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-border border-t-primary mx-auto mb-4"></div>
//           <p className="text-muted-foreground text-lg">
//             Chargement de vos données...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto space-y-12">
//         {/* En-tête */}
//         <div className="text-center space-y-4">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
//             <Sparkles className="w-4 h-4" />
//             Tarification simple et transparente
//           </div>
//           <h1 className="text-5xl font-bold text-foreground">
//             Choisissez votre formule
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Un tarif fixe par enfant, sans surprise. Annulez à tout moment.
//           </p>
//         </div>

//         {/* Toggle période */}
//         <div className="flex justify-center">
//           <div className="inline-flex items-center gap-2 p-1.5 bg-muted rounded-xl border border-border">
//             <button
//               onClick={() => setBillingPeriod("MONTHLY")}
//               className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
//                 billingPeriod === "MONTHLY"
//                   ? "bg-primary text-primary-foreground shadow-md"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               Mensuel
//             </button>
//             <button
//               onClick={() => setBillingPeriod("YEARLY")}
//               className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all relative ${
//                 billingPeriod === "YEARLY"
//                   ? "bg-primary text-primary-foreground shadow-md"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               Annuel
//               {billingPeriod !== "YEARLY" && (
//                 <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
//                   -10%
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Carte de tarification principale */}
//         <div className="max-w-2xl mx-auto">
//           <Card className="border-border shadow-lg">
//             <CardHeader className="pb-8">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="bg-primary/10 p-3 rounded-xl">
//                   <CreditCard className="w-6 h-6 text-primary" />
//                 </div>
//                 {billingPeriod === "YEARLY" && (
//                   <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs font-semibold rounded-full">
//                     Économisez 10%
//                   </span>
//                 )}
//               </div>
//               <CardTitle className="text-3xl font-bold text-foreground">
//                 Abonnement {billingPeriod === "MONTHLY" ? "Mensuel" : "Annuel"}
//               </CardTitle>
//               <CardDescription className="text-base mt-2">
//                 <div className="flex items-center gap-2 mt-4">
//                   <Shield className="w-5 h-5 text-primary" />
//                   <span>Protection complète pour vos enfants</span>
//                 </div>
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-6">
//               {/* Avantages */}
//               <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 space-y-2">
//                 <p className="font-semibold text-foreground flex items-center gap-2">
//                   <Zap className="w-4 h-4 text-primary" />
//                   Inclus dans votre abonnement
//                 </p>
//                 <ul className="space-y-2 text-sm text-muted-foreground">
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
//                     Suivi en temps réel
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
//                     Alertes de sécurité instantanées
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
//                     Support prioritaire 24/7
//                   </li>
//                 </ul>
//               </div>

//               {/* Sélection des enfants */}
//               <div className="space-y-3">
//                 <p className="text-sm font-semibold text-foreground flex items-center gap-2">
//                   <Users className="w-4 h-4" />
//                   Sélectionnez les enfants à abonner
//                 </p>
//                 <div className="space-y-2">
//                   {availableChildren.length === 0 ? (
//                     <div className="text-center py-8 bg-muted rounded-lg border-2 border-dashed border-border">
//                       <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
//                       <p className="text-foreground font-medium">
//                         Aucun enfant disponible
//                       </p>
//                       <p className="text-sm text-muted-foreground mt-1">
//                         Tous vos enfants ont déjà un abonnement actif
//                       </p>
//                     </div>
//                   ) : (
//                     availableChildren.map((child) => (
//                       <label
//                         key={child.id}
//                         className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all ${
//                           selectedChildren.includes(child.id)
//                             ? "border-primary bg-primary/5 shadow-sm"
//                             : "border-border hover:border-muted-foreground hover:bg-muted/50"
//                         }`}
//                       >
//                         <Checkbox
//                           checked={selectedChildren.includes(child.id)}
//                           onCheckedChange={() => toggleChildSelection(child.id)}
//                           className="data-[state=checked]:bg-primary"
//                         />
//                         <div className="flex-1">
//                           <span className="font-medium text-foreground">
//                             {child.prenom} {child.nom}
//                           </span>
//                           <p className="text-xs text-muted-foreground mt-0.5">
//                             {child.adresse}
//                           </p>
//                         </div>
//                         {selectedChildren.includes(child.id) && (
//                           <CheckCircle2 className="w-5 h-5 text-primary" />
//                         )}
//                       </label>
//                     ))
//                   )}
//                 </div>
//               </div>

//               {/* Prix total */}
//               <div className="bg-primary rounded-xl p-6 text-primary-foreground">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-primary-foreground/80 text-sm font-medium mb-1">
//                       Total à payer
//                     </p>
//                     <p className="text-4xl font-bold">
//                       {formatPrice(totalPrice)} MGA
//                     </p>
//                     <p className="text-primary-foreground/80 text-sm mt-1">
//                       pour {selectedChildren.length || 0}{" "}
//                       {selectedChildren.length > 1 ? "enfants" : "enfant"}
//                       {billingPeriod === "YEARLY" && " / an"}
//                       {billingPeriod === "MONTHLY" && " / mois"}
//                     </p>
//                   </div>
//                   <div className="bg-primary-foreground/20 p-3 rounded-lg">
//                     <CreditCard className="w-8 h-8" />
//                   </div>
//                 </div>
//               </div>
//             </CardContent>

//             <CardFooter className="pt-6">
//               <Button
//                 className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
//                 disabled={selectedChildren.length === 0 || loadingCheckout}
//                 onClick={handleSubscribe}
//               >
//                 {loadingCheckout ? (
//                   <span className="flex items-center gap-2">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
//                     Redirection en cours...
//                   </span>
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     Confirmer l&apos;abonnement
//                     <ArrowRight className="w-5 h-5" />
//                   </span>
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>

//         {/* Enfants déjà abonnés */}
//         {subscribedChildren.length > 0 && (
//           <div className="max-w-5xl mx-auto">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
//                 <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
//               </div>
//               <h3 className="text-2xl font-bold text-foreground">
//                 Abonnements actifs
//               </h3>
//               <span className="ml-auto bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
//                 {subscribedChildren.length} enfant
//                 {subscribedChildren.length > 1 ? "s" : ""}
//               </span>
//             </div>

//             <Card className="border-border shadow-lg overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-muted border-b border-border">
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                         Enfant
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                         Statut
//                       </th>
//                       <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-border">
//                     {subscribedChildren.map((child) => (
//                       <tr
//                         key={child.id}
//                         className="hover:bg-muted/50 transition-colors"
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <div className="bg-primary/10 p-2 rounded-lg">
//                               <Users className="w-4 h-4 text-primary" />
//                             </div>
//                             <div>
//                               <p className="font-medium text-foreground">
//                                 {child.prenom} {child.nom}
//                               </p>
//                               <p className="text-sm text-muted-foreground">
//                                 {child.adresse}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           {child.subscription?.cancelAtPeriodEnd ? (
//                             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
//                               <Clock className="w-4 h-4" />
//                               Expire bientôt
//                             </span>
//                           ) : child.subscription?.status?.toLowerCase() ===
//                             "active" ? (
//                             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800">
//                               <CheckCircle2 className="w-4 h-4" />
//                               Actif
//                             </span>
//                           ) : (
//                             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border border-red-200 dark:border-red-800">
//                               <XCircle className="w-4 h-4" />
//                               Inactif
//                             </span>
//                           )}
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center justify-end gap-2">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
//                               onClick={() => openCancelModal(child)}
//                               disabled={
//                                 !(
//                                   child.subscription?.status?.toLowerCase() ===
//                                     "active" &&
//                                   child.subscription?.cancelAtPeriodEnd ===
//                                     false
//                                 )
//                               }
//                             >
//                               <XCircle className="w-4 h-4 mr-1" />
//                               Annuler
//                             </Button>

//                             <Button
//                               size="sm"
//                               variant="outline"
//                               className="border-primary/20 text-primary hover:bg-primary/10"
//                               onClick={() => handleResumeSubscription(child.id)}
//                               disabled={
//                                 !(
//                                   (child.subscription?.status?.toLowerCase() ===
//                                     "active" &&
//                                     child.subscription?.cancelAtPeriodEnd ===
//                                       true) ||
//                                   child.subscription?.status?.toLowerCase() !==
//                                     "active"
//                                 )
//                               }
//                             >
//                               <RefreshCw className="w-4 h-4 mr-1" />
//                               Reprendre
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </Card>
//           </div>
//         )}
//       </div>

//       {/* Modal de confirmation d'annulation */}
//       {cancelModal.isOpen && cancelModal.child && (
//         <>
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
//             onClick={closeCancelModal}
//           />

//           {/* Modal */}
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <Card className="max-w-md w-full animate-in zoom-in-95 duration-200 shadow-xl">
//               {/* Header */}
//               <CardHeader className="pb-4">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-950">
//                       <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
//                     </div>
//                     <div>
//                       <CardTitle className="text-lg">
//                         Annuler l&apos;abonnement
//                       </CardTitle>
//                     </div>
//                   </div>
//                   <button
//                     onClick={closeCancelModal}
//                     className="p-1 rounded-lg hover:bg-muted transition-colors"
//                     disabled={isCancelling}
//                   >
//                     <X className="w-5 h-5 text-muted-foreground" />
//                   </button>
//                 </div>
//               </CardHeader>

//               {/* Content */}
//               <CardContent className="space-y-4">
//                 <p className="text-sm text-muted-foreground">
//                   Êtes-vous sûr de vouloir annuler l&apos;abonnement de{" "}
//                   <span className="font-semibold text-foreground">
//                     {cancelModal.child.prenom} {cancelModal.child.nom}
//                   </span>{" "}
//                   ?
//                 </p>

//                 <div className="p-3 rounded-lg bg-muted/50">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                       <Users className="w-5 h-5 text-primary" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-foreground">
//                         {cancelModal.child.prenom} {cancelModal.child.nom}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {cancelModal.child.adresse}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-lg p-3">
//                   <p className="text-sm text-orange-800 dark:text-orange-300">
//                     L&apos;abonnement restera actif jusqu&apos;à la fin de la
//                     période en cours.
//                   </p>
//                 </div>
//               </CardContent>

//               {/* Actions */}
//               <CardFooter className="flex gap-3 pt-4">
//                 <Button
//                   variant="outline"
//                   onClick={closeCancelModal}
//                   className="flex-1"
//                   disabled={isCancelling}
//                 >
//                   Garder l&apos;abonnement
//                 </Button>
//                 <Button
//                   onClick={handleCancelSubscription}
//                   disabled={isCancelling}
//                   className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
//                 >
//                   {isCancelling ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
//                       Annulation...
//                     </>
//                   ) : (
//                     <>
//                       <XCircle className="w-4 h-4 mr-2" />
//                       Confirmer l&apos;annulation
//                     </>
//                   )}
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </>
//       )}

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar
//         closeOnClick
//         pauseOnHover
//       />
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
  const [billingPeriod, setBillingPeriod] = useState<Plan>("MONTHLY");
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
                            Expire
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
