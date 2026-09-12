# danieldev.me Constitution

Sitio personal de marca de Daniel Aguilar Bishop (AI/Prompt Engineer, Front-End Developer, Senior Digital Marketer). Migrando de una SPA Vite+React estática en GitHub Pages hacia una app Next.js en Vercel, e incorporando una nueva sección `/lab` para mostrar prototipos hechos para clientes específicos.

## Core Principles

### I. No romper lo que ya funciona
Los 7 subsitios legacy estáticos (`/cv`, `/bizlytics`, `/batabit`, `/curso-intro-react`, `/e-commerce`, `/game`, `/personal-portfolio`) deben seguir funcionando exactamente igual, sin conversión, servidos como archivos estáticos verbatim. El trabajo de SEO/GEO ya validado (`SEO_GEO_REPORT.md`: meta tags, Open Graph, Twitter Card, JSON-LD, `llms.txt`, `robots.txt` con bots de IA permitidos) se porta tal cual a Next.js, no se rehace ni se simplifica. Ninguna migración o feature nueva puede degradar algo que ya está funcionando en producción.

### II. Minimalismo de dependencias
No se agregan librerías nuevas salvo necesidad clara y justificada. El stack ya validado es: Next.js (App Router, TypeScript), Tailwind, framer-motion, lucide-react, clsx, tailwind-merge. Antes de instalar algo nuevo, preguntar si el stack actual ya lo resuelve.

### III. `/lab` es una vitrina de trabajo, no un producto
Cada proyecto dentro de `/lab` (ej. `retail-scheduling`) es una muestra puntual hecha para un cliente específico que Daniel quiere impresionar — no es un producto propio con roadmap ni backlog de features. La sección debe estar estructurada para que agregar un proyecto nuevo sea trivial (una carpeta/ruta más, misma plantilla de gate y layout), sin rediseñar nada existente cada vez.

### IV. `/lab/*` nunca se indexa ni se promociona
Todo lo que viva bajo `/lab/` lleva `noindex, nofollow` sin excepción, queda fuera de `sitemap.xml`, y el acceso es únicamente por link directo protegido por passcode. No debe aparecer en buscadores, redes sociales, ni compartirse de forma pública. El gate es simple (passcode + cookie de sesión vía middleware) — explícitamente no se construye un sistema de cuentas/roles para esto; sería sobre-ingeniería para el propósito real (discreción, no seguridad de nivel producto).

### V. Identidad visual consistente
Fondo oscuro, tipografía Instrument Serif para headings, estética "liquid-glass" en navegación/cards, tono de copy discreto y no corporativo (nunca lenguaje de venta agresivo). Toda pieza nueva — incluido `/lab` — hereda esta identidad; no se introduce un lenguaje visual distinto por sección.

## Cambios de riesgo requieren confirmación explícita

Ninguna de las siguientes acciones se ejecuta de forma automática, sin importar cuán lista parezca la tarea: deploy a producción, cambio de configuración DNS de `danieldev.me`, merge de cualquier rama de feature a `main`. Cada una requiere confirmación explícita de Daniel en el momento, no una aprobación genérica anticipada.

## Development Workflow

Todo trabajo de migración o feature nueva se hace en una rama de feature (nunca directo sobre `main`). El flujo spec-driven (`/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`) se usa para toda feature nueva no trivial, empezando por `/lab`. Los to-do de migración de mayor alcance (como la conversión completa a Next.js) se documentan como checklist en markdown en la raíz del repo, siguiendo el patrón ya establecido por `LANDING_REDESIGN_TODO.md`.

## Governance

Esta constitución tiene prioridad sobre preferencias de implementación puntuales. Cualquier decisión técnica que la contradiga (agregar una dependencia no justificada, indexar `/lab`, tocar un subsitio legacy sin necesidad, o saltarse la confirmación en un cambio de riesgo) debe señalarse explícitamente antes de ejecutarse, no asumirse como aceptable.

**Version**: 1.0.0 | **Ratified**: 2026-09-12 | **Last Amended**: 2026-09-12
