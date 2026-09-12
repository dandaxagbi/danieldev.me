import { NextRequest, NextResponse } from "next/server";
import { LAB_SESSION_COOKIE_NAME, verifySessionValue } from "@/lib/lab-session";

export async function proxy(request: NextRequest) {
  // La propia pantalla de gate nunca debe quedar atrapada por el gate.
  if (request.nextUrl.pathname.startsWith("/lab/gate")) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(LAB_SESSION_COOKIE_NAME)?.value;
  const isValid = await verifySessionValue(cookieValue);

  if (isValid) {
    return NextResponse.next();
  }

  const gateUrl = new URL("/lab/gate", request.url);
  gateUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(gateUrl);
}

export const config = {
  matcher: ["/lab/:path*"],
};
