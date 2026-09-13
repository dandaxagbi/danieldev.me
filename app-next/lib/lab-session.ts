// Sesión mínima para el gate de /lab: por cliente hay un único usuario y
// contraseña (ver lib/lab-clients.ts), sin sistema de cuentas real. La
// cookie va firmada con HMAC-SHA256 (Web Crypto API, corre tanto en Edge
// como en Node runtime) y lleva embebido el clientSlug — así cada hub puede
// verificar server-side que la sesión sea la de SU cliente, no la de otro.
// Deliberadamente sin librerías de auth ni base de datos — ver
// specs/001-lab-access-gate/plan.md y constitución, principio IV.

const SESSION_COOKIE_NAME = "lab_session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getHmacKey(): Promise<CryptoKey | null> {
  const secret = process.env.LAB_SESSION_SECRET;
  if (!secret) return null;
  const encoded = new TextEncoder().encode(secret);
  return crypto.subtle.importKey(
    "raw",
    encoded,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Genera el valor de cookie "expiresAt.clientSlug.firma" para una sesión nueva. */
export async function createSessionValue(
  clientSlug: string,
): Promise<string | null> {
  const key = await getHmacKey();
  if (!key) return null;
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const message = `${expiresAt}.${clientSlug}`;
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  const signature = toBase64Url(new Uint8Array(signatureBuffer));
  return `${message}.${signature}`;
}

export type SessionCheck =
  | { valid: true; clientSlug: string }
  | { valid: false; clientSlug?: undefined };

/** Verifica un valor de cookie existente. Fail-safe en cualquier caso ambiguo. */
export async function verifySessionValue(
  cookieValue: string | undefined,
): Promise<SessionCheck> {
  if (!cookieValue) return { valid: false };

  const key = await getHmacKey();
  if (!key) return { valid: false }; // sin LAB_SESSION_SECRET -> nunca dejar pasar

  const parts = cookieValue.split(".");
  if (parts.length !== 3) return { valid: false };
  const [expiresAtRaw, clientSlug, signature] = parts;
  if (!expiresAtRaw || !clientSlug || !signature) return { valid: false };

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return { valid: false };

  const expectedSignatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${expiresAtRaw}.${clientSlug}`),
  );
  const expectedSignature = toBase64Url(new Uint8Array(expectedSignatureBuffer));

  if (!timingSafeEqual(expectedSignature, signature)) return { valid: false };
  return { valid: true, clientSlug };
}

export const LAB_SESSION_COOKIE_NAME = SESSION_COOKIE_NAME;
