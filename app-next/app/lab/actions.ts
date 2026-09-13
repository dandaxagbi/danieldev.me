"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  checkCredentials,
  createSessionValue,
  LAB_SESSION_COOKIE_NAME,
} from "@/lib/lab-session";

export type GateState = { error?: string };

export async function validateCredentials(
  _prevState: GateState,
  formData: FormData,
): Promise<GateState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/lab");

  // Mensaje genérico a propósito: no distinguir usuario vs. contraseña.
  if (!username || !password || !checkCredentials(username, password)) {
    return { error: "Incorrect username or password, try again." };
  }

  const sessionValue = await createSessionValue();
  if (!sessionValue) {
    // LAB_SESSION_SECRET no configurado en el entorno: fail-safe, no dejar pasar.
    return { error: "Couldn't start a session. Try again later." };
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
