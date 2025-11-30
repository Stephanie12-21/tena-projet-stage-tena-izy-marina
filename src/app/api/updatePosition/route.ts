import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let driverId, lat, lon;

  try {
    const body = await req.text();
    console.log("Body reçu:", body);

    if (!body) {
      return NextResponse.json(
        { success: false, error: "Body vide" },
        { status: 400 }
      );
    }

    const parsedBody = JSON.parse(body);
    driverId = parsedBody.driverId;
    lat = parsedBody.lat;
    lon = parsedBody.lon;
  } catch (parseError) {
    console.error(" Erreur parsing JSON:", parseError);
    return NextResponse.json(
      { success: false, error: "Format JSON invalide" },
      { status: 400 }
    );
  }

  try {
    // console.log(" Données parsées :", { driverId, lat, lon });

    if (!driverId || lat == null || lon == null) {
      return NextResponse.json(
        { success: false, error: "Données manquantes" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Utilisez la fonction stockée
    const { data, error } = await supabase.rpc("update_driver_position", {
      p_driver_id: driverId,
      p_lat: lat,
      p_lon: lon,
    });

    if (error) {
      console.error(" Erreur RPC :", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    // Vérifiez la réponse de la fonction
    if (data && !data.success) {
      console.error("Erreur fonction :", data.error);
      return NextResponse.json(
        { success: false, error: data.error },
        { status: 400 }
      );
    }

    //console.log("✅ Mise à jour réussie pour :", driverId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(" Erreur API :", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
