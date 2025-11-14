// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// // Fonction utilitaire pour formater la date YYYY-MM-DD
// const formatDate = (date: Date) => date.toISOString().split("T")[0];

// export async function GET() {
//   try {
//     // Total des enfants
//     const totalChildren = await prisma.children.count();

//     // Total des parents
//     const totalParents = await prisma.users.count({
//       where: { role: "PARENT" },
//     });

//     // Total des bus
//     const totalBuses = await prisma.bus.count();

//     // Total anomalies
//     const totalAnomalies = await prisma.anomaly.count();

//     // Enfants créés par jour
//     const childrenByDayRaw = await prisma.children.findMany({
//       select: {
//         createdAt: true,
//       },
//       orderBy: { createdAt: "asc" },
//     });

//     // Transformer pour compter les enfants par date
//     const childrenByDay: { date: string; count: number }[] = [];
//     childrenByDayRaw.forEach((child) => {
//       const date = formatDate(child.createdAt);
//       const existing = childrenByDay.find((d) => d.date === date);
//       if (existing) existing.count += 1;
//       else childrenByDay.push({ date, count: 1 });
//     });

//     return NextResponse.json({
//       totalChildren,
//       totalParents,
//       totalBuses,
//       totalAnomalies,
//       childrenByDay,
//     });
//   } catch (error) {
//     console.error("Dashboard API error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Fonction utilitaire pour formater la date YYYY-MM-DD
const formatDate = (date: Date) => date.toISOString().split("T")[0];

// Fonction utilitaire pour formater le mois YYYY-MM
const formatMonth = (date: Date) => date.toISOString().slice(0, 7);

export async function GET() {
  try {
    // Total des enfants
    const totalChildren = await prisma.children.count();

    // Total des parents
    const totalParents = await prisma.users.count({
      where: { role: "PARENT" },
    });

    // Total des bus
    const totalBuses = await prisma.bus.count();

    // Total anomalies
    const totalAnomalies = await prisma.anomaly.count();

    // Enfants créés par jour
    const childrenByDayRaw = await prisma.children.findMany({
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    const childrenByDay: { date: string; count: number }[] = [];
    childrenByDayRaw.forEach((child) => {
      const date = formatDate(child.createdAt);
      const existing = childrenByDay.find((d) => d.date === date);
      if (existing) existing.count += 1;
      else childrenByDay.push({ date, count: 1 });
    });

    // Utilisateurs créés par jour
    const usersByDayRaw = await prisma.users.findMany({
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    const usersByDay: { date: string; count: number }[] = [];
    usersByDayRaw.forEach((user) => {
      const date = formatDate(user.createdAt);
      const existing = usersByDay.find((d) => d.date === date);
      if (existing) existing.count += 1;
      else usersByDay.push({ date, count: 1 });
    });

    // Abonnements actifs par mois
    const subscriptionsRaw = await prisma.subscription.findMany({
      select: { createdAt: true, status: true },
      where: { status: "active" }, // ou selon ton champ status exact pour actif
    });

    const activeSubscriptionsByMonth: { month: string; count: number }[] = [];
    subscriptionsRaw.forEach((sub) => {
      const month = formatMonth(sub.createdAt);
      const existing = activeSubscriptionsByMonth.find(
        (d) => d.month === month
      );
      if (existing) existing.count += 1;
      else activeSubscriptionsByMonth.push({ month, count: 1 });
    });

    return NextResponse.json({
      totalChildren,
      totalParents,
      totalBuses,
      totalAnomalies,
      childrenByDay,
      usersByDay,
      activeSubscriptionsByMonth,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
