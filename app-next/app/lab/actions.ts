"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyLabCredentials } from "@/lib/lab-clients";
import { createSessionValue, LAB_SESSION_COOKIE_NAME } from "@/lib/lab-session";

export type GateState = { error?: string };

export async function validateCredentials(
  _prevState: GateState,
  formData: FormData,
): Promise<GateState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  // Mensaje genérico a propósito: no distinguir usuario vs. contraseña.
  const client = username && password ? verifyLabCredentials(username, password) : null;
  if (!client) {
    return { error: "Incorrect username or password, try again." };
  }

  const sessionValue = await createSessionValue(client.clientSlug);
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

  // Cada acceso lleva directo al hub de ese cliente, no a un listado genérico.
  redirect(`/lab/${client.clientSlug}`);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(LAB_SESSION_COOKIE_NAME);
  redirect("/lab/gate");
}
