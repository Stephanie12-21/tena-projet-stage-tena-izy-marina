"use server";

import jwt from "jsonwebtoken";

export async function verifyQrToken(token: string) {
  const secret = process.env.JWT_SECRET!;
  try {
    const payload = jwt.verify(token, secret) as { childId: string };
    return payload.childId;
  } catch {
    return null;
  }
}
