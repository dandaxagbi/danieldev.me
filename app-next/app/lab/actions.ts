"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  checkPasscode,
  createSessionValue,
  LAB_SESSION_COOKIE_NAME,
} from "@/lib/lab-session";

export type GateState = { error?: string };

export async function validatePasscode(
  _prevState: GateState,
  formData: FormData,
): Promise<GateState> {
  const passcode = String(formData.get("passcode") ?? "");
  const from = String(formData.get("from") ?? "/lab");

  // Mensaje genérico a propósito: no distinguir casos, no dar pistas (FR: US2).
  if (!passcode || !checkPasscode(passcode)) {
    return { error: "Passcode incorrecto, intenta de nuevo." };
  }

  const sessionValue = await createSessionValue();
  if (!sessionValue) {
    // LAB_SESSION_SECRET no configurado en el entorno: fail-safe, no dejar pasar.
    return { error: "No se pudo iniciar sesión. Intenta más tarde." };
  }

  const cookieStore = await cookies();
  cookieStore.set(LAB_SESSION_COOKIE_NAME, sessionValue, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });

  redirect(from.startsWith("/lab") ? from : "/lab");
}
