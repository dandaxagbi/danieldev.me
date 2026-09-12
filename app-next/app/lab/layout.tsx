import type { Metadata } from "next";

// noindex/nofollow para TODO /lab/*, incluida /lab/gate — independiente de si
// hay sesión válida o no (FR-005). Cada página hija puede repetir/afinar esto
// si necesita, pero el default acá ya cubre el requisito.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
