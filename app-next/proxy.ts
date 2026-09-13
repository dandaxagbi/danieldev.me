import { NextRequest, NextResponse } from "next/server";
import { LAB_SESSION_COOKIE_NAME, verifySessionValue } from "@/lib/lab-session";

// Mantener en sync con LEGACY_SUBSITES de next.config.ts. Duplicado a
// propósito: next.config.ts no es seguro de importar en runtime de proxy.
const LEGACY_SUBSITES = new Set([
  "cv",
  "bizlytics",
  "batabit",
  "curso-intro-react",
  "e-commerce",
  "game",
  "personal-portfolio",
]);

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // El matcher de abajo matchea tanto "/slug" como "/slug/" (Next le agrega
  // una barra final opcional). Solo nos interesa actuar sobre la forma SIN
  // barra (para redirigir); la forma CON barra ya la sirve el rewrite de
  // next.config.ts, así que acá simplemente la dejamos pasar de largo.
  if (!pathname.startsWith("/lab")) {
    const bareSlug = pathname.slice(1);
    if (LEGACY_SUBSITES.has(bareSlug)) {
      return NextResponse.redirect(new URL(`${pathname}/`, request.url), 308);
    }
    return NextResponse.next();
  }

  // A partir de acá, solo lógica del gate de /lab.

  // La propia pantalla de gate nunca debe quedar atrapada por el gate.
  if (pathname.startsWith("/lab/gate")) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(LAB_SESSION_COOKIE_NAME)?.value;
  const isValid = await verifySessionValue(cookieValue);

  if (isValid) {
    return NextResponse.next();
  }

  const gateUrl = new URL("/lab/gate", request.url);
  gateUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(gateUrl);
}

export const config = {
  matcher: [
    "/lab/:path*",
    "/cv",
    "/bizlytics",
    "/batabit",
    "/curso-intro-react",
    "/e-commerce",
    "/game",
    "/personal-portfolio",
  ],
};
