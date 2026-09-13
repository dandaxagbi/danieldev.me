import type { NextConfig } from "next";

// Los 7 subsitios legacy viven como HTML estático puro dentro de public/,
// tal cual estaban en GitHub Pages. Next.js NO resuelve automáticamente
// index.html para una ruta de directorio (a diferencia de GitHub Pages), y
// esas páginas usan rutas relativas ("./assets/...") que solo resuelven bien
// si la URL termina en "/". La redirección de "/slug" -> "/slug/" se hace en
// proxy.ts (Next.js agrega automáticamente una barra opcional a los `source`
// de redirects(), lo que generaba un loop de auto-redirect) — acá solo el
// rewrite de la forma con barra final al index.html real.
export const LEGACY_SUBSITES = [
  "cv",
  "bizlytics",
  "batabit",
  "curso-intro-react",
  "e-commerce",
  "game",
  "personal-portfolio",
];

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return LEGACY_SUBSITES.map((slug) => ({
      source: `/${slug}/`,
      destination: `/${slug}/index.html`,
    }));
  },
};

export default nextConfig;
