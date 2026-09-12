import type { MetadataRoute } from "next";

// Nunca agregar rutas /lab acá — esa sección es noindex por diseño
// (constitución, principio IV; spec 001-lab-access-gate FR-006).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://danieldev.me",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
