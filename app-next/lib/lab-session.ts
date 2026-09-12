// Sesión mínima para el gate de /lab: un passcode compartido + cookie firmada
// con HMAC-SHA256 (Web Crypto API, corre tanto en Edge como en Node runtime).
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

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Compara el passcode ingresado contra LAB_PASSCODE. Fail-safe: sin env var, siempre false. */
export function checkPasscode(input: string): boolean {
  const expected = process.env.LAB_PASSCODE;
  if (!expected) return false;
  return timingSafeEqual(input, expected);
}

/** Genera el valor de cookie "expiresAt.firma" para una sesión nueva. */
export async function createSessionValue(): Promise<string | null> {
  const key = await getHmacKey();
  if (!key) return null;
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const message = String(expiresAt);
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  const signature = toBase64Url(new Uint8Array(signatureBuffer));
  return `${expiresAt}.${signature}`;
}

/** Verifica un valor de cookie existente. Fail-safe en cualquier caso ambiguo. */
export async function verifySessionValue(
  cookieValue: string | undefined,
): Promise<boolean> {
  if (!cookieValue) return false;

  const key = await getHmacKey();
  if (!key) return false; // sin LAB_SESSION_SECRET configurado -> nunca dejar pasar

  const [expiresAtRaw, signature] = cookieValue.split(".");
  if (!expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expectedSignatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(expiresAtRaw),
  );
  const expectedSignature = toBase64Url(new Uint8Array(expectedSignatureBuffer));

  return timingSafeEqual(expectedSignature, signature);
}

export const LAB_SESSION_COOKIE_NAME = SESSION_COOKIE_NAME;
