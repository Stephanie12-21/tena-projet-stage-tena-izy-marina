import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      email: string;
    };
    return NextResponse.json(decoded);
  } catch {
    return NextResponse.json(
      { error: "Lien invalide ou expiré" },
      { status: 400 }
    );
  }
}
