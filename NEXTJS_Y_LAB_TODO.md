# Migración a Next.js + Desarrollo de /lab — To-Do maestro

Rama de trabajo: `feature/nextjs-migration` (no tocar `main` ni la DNS de producción hasta confirmación explícita — mismo criterio que `LANDING_REDESIGN_TODO.md`).

## 0. Análisis previo (lo que ya existe, para no pisarlo)

- El sitio **no es estático puro**: `landing-app/` es una SPA en **Vite + React 19 + TypeScript + Tailwind v4 + framer-motion**, ya construida y **ya deployada**: su build está copiado a la raíz del repo (`index.html` + `app-assets/*.js/css`), servido por GitHub Pages (`CNAME` → `danieldev.me`).
- Ya existe trabajo de SEO/GEO serio y reciente (`SEO_GEO_REPORT.md`, 2026-09-11) que **hay que preservar, no repetir**: meta tags completos, Open Graph, Twitter Card, JSON-LD (`ProfilePage` + `Person` + `WebSite` + `Book` + `Event` vía `@graph`), `llms.txt`, `robots.txt` con bots de IA permitidos explícitamente, `sitemap.xml`.
- Hay **7 subsitios estáticos legacy** que deben seguir funcionando exactamente igual, sin conversión: `/cv`, `/bizlytics`, `/batabit`, `/curso-intro-react`, `/e-commerce`, `/game`, `/personal-portfolio`.
- Hosting actual: GitHub Pages detrás de Cloudflare (confirmado por headers `x-github-request-id`). Sin Vercel todavía.
- **Decisión que esto habilita:** como de todos modos se migra el sitio completo a Next.js sobre Vercel, `/lab/retail-scheduling` ya no necesita ser un proyecto Vercel separado con rewrite (como se había planeado en `TWS/01_Plan/Plan TWS September.md`). Puede vivir como una ruta más **dentro de esta misma app Next.js**, protegida por middleware solo en ese path. Esto simplifica la arquitectura — actualizar el plan de TWS cuando esto esté confirmado.

---

## 1. Migración del sitio actual a Next.js

### Fase 1 — Scaffold
- [ ] Crear app Next.js (App Router, TypeScript) en una carpeta nueva del repo (ej. `app-next/`, para no romper `landing-app/` ni la raíz mientras se migra)
- [ ] Instalar Tailwind v4, framer-motion, lucide-react, clsx, tailwind-merge (mismas libs que `landing-app`)
- [ ] Configurar fuente Instrument Serif (Google Fonts) y la clase `.liquid-glass` igual que en `landing-app/src/index.css`

### Fase 2 — Portar componentes de `landing-app/`
- [ ] Portar `Hero.tsx`, `AboutSection.tsx`, `FeaturedVideoSection.tsx`, `PhilosophySection.tsx`, `ServicesSection.tsx`, `PortfolioSection.tsx`, `EducationSection.tsx`, `CTASection.tsx`, `Footer.tsx`, `VelocityScroll.tsx` a `app-next/` — son componentes React, el port es mayormente directo
- [ ] Marcar con `"use client"` todo componente que use `useInView`, hooks de framer-motion, o estado — Next.js App Router es Server Components por defecto
- [ ] Videos (`hero.mp4`) y assets (`profile-photo.png`, `projects/*.jpg`) → mover a `app-next/public/`
- [ ] Armar `app/page.tsx` ensamblando las secciones en el mismo orden que `App.tsx`

### Fase 3 — Portar el trabajo de SEO/GEO ya hecho (no rehacerlo)
- [ ] Meta tags → `generateMetadata()` en `app/layout.tsx` (title, description, canonical, robots, theme-color, author)
- [ ] Open Graph + Twitter Card → mismo `generateMetadata()` (og:type=profile, og:url, og:site_name, og:locale, og:image absoluto 500x500, twitter:card completo)
- [ ] JSON-LD (`@graph`: ProfilePage, WebSite, Person, Book, Event) → inyectar vía `<script type="application/ld+json">` en el layout, contenido idéntico al ya validado en `SEO_GEO_REPORT.md`
- [ ] `robots.txt` → `app/robots.ts` (mantener la lista de bots de IA permitidos explícitamente: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, etc.)
- [ ] `sitemap.xml` → `app/sitemap.ts` (agregar la nueva ruta `/lab/retail-scheduling` cuando exista, con cuidado de que **no quede indexable** — ver sección 2)
- [ ] `llms.txt` → copiar tal cual a `app-next/public/llms.txt`
- [ ] Pendiente heredado de `SEO_GEO_REPORT.md`: una vez deployado, correr Google Rich Results Test + Schema.org Validator contra la URL real

### Fase 4 — Preservar subsitios legacy (cero conversión)
- [ ] Copiar tal cual `/cv`, `/bizlytics`, `/batabit`, `/curso-intro-react`, `/e-commerce`, `/game`, `/personal-portfolio` a `app-next/public/` (Next.js sirve todo lo que está en `public/` como archivo estático en la misma ruta — no requieren tocarse)
- [ ] Verificar en local (`next dev`) que cada subsitio sigue cargando igual que en producción hoy
- [ ] Confirmar que ninguna ruta de Next.js (`app/`) colisiona con el nombre de estas carpetas

### Fase 5 — Ruta `/lab` (stub por ahora)
- [ ] Crear `app/lab/` como placeholder simple ("en construcción") — el desarrollo real de `/lab` se hace con spec-kit, ver sección 2 de este documento
- [ ] Confirmar que `/lab/*` puede excluirse del sitemap y llevar `noindex` sin afectar el resto del sitio

### Fase 6 — Deploy en Vercel
- [ ] Crear proyecto en Vercel apuntando a este repo (rama `feature/nextjs-migration` como preview primero, nunca `main` directo a producción)
- [ ] Configurar variables de entorno necesarias (ej. passcode del gate de `/lab`, ver sección 2)
- [ ] Verificar preview deploy de Vercel funciona completo (home + subsitios + `/lab`)
- [ ] Migrar DNS: mover `danieldev.me` de GitHub Pages a Vercel (actualizar registros en el proveedor de DNS, quitar/mantener `CNAME` de GitHub Pages según corresponda)
- [ ] Verificar que Cloudflare (si sigue en el camino) no cachee la versión vieja tras el cambio de DNS

### Fase 7 — QA final
- [ ] Responsive (mobile/tablet/desktop) en todas las secciones migradas
- [ ] Todos los links (CV, contacto, redes, subsitios) funcionan
- [ ] Lighthouse/Core Web Vitals igual o mejor que la versión Vite actual
- [ ] Meta tags y JSON-LD validados contra la URL real en Vercel preview
- [ ] `robots.txt`, `sitemap.xml`, `llms.txt` accesibles y correctos

### Fase 8 — Cutover
- [ ] Mostrar preview funcionando completo antes de mergear
- [ ] Confirmación explícita antes de merge a `main`
- [ ] Confirmación explícita antes del cambio de DNS en producción

---

## 2. Desarrollo de `/lab` — flujo spec-driven con `specify` (spec-kit)

`specify` (spec-kit v0.10.2) ya está instalado en esta máquina. Este repo **todavía no tiene spec-kit inicializado** (no existe carpeta `.specify/`). El flujo a seguir:

### Paso 1 — Inicializar spec-kit en el repo
- [x] `specify init --here --integration claude --force` (ejecutado sobre `feature/nextjs-migration`)

### Paso 2 — Constitución del proyecto
- [x] `/speckit-constitution` — `.specify/memory/constitution.md` v1.0.0: no romper subsitios legacy ni SEO ya validado, minimalismo de dependencias, `/lab` como vitrina (no producto), `/lab/*` siempre noindex, cambios de riesgo requieren confirmación explícita, identidad visual consistente

### Paso 3 — Spec de la feature `/lab`
- [ ] `/speckit-specify` — especificar qué es y qué hace la página `/lab`:
  - Landing de la sección: explica **para qué es** el espacio ("acá desarrollo ideas para clientes que me interesan, antes de que sean un proyecto formal")
  - Listado de proyectos dentro de `/lab` (empezando por `retail-scheduling`), cada uno como sub-ruta gateada individualmente
  - El **login gate brandeado**: pantalla de acceso con passcode, con la identidad visual del sitio (fondo negro, Instrument Serif, estética `.liquid-glass`), no un formulario genérico
  - Requisito no funcional: `noindex` en todo `/lab/*`, sin excepción

### Paso 4 — `design.md`
- [ ] Documento de dirección visual para `/lab` **antes de programar nada**: paleta (heredada del sitio principal), tipografía, tono de copy (discreto, "work in progress", no corporativo), estructura de la pantalla de gate (logo/inicial + input de passcode + micro-copy de discreción), y cómo se ve la card de cada proyecto listado

### Paso 5 — Plan técnico
- [ ] `/speckit-plan` — decisiones técnicas: middleware de Next.js para el gate (cookie de sesión firmada, sin base de datos ni sistema de cuentas), variable de entorno `LAB_PASSCODE`, estructura de rutas (`app/lab/page.tsx`, `app/lab/retail-scheduling/page.tsx`, `middleware.ts` con matcher `/lab/:path*`)

### Paso 6 — Tareas
- [ ] `/speckit-tasks` — desglose de tareas ejecutables a partir del plan

### Paso 7 — Implementación
- [ ] `/speckit-implement` — construcción real del gate + landing de `/lab` + página `retail-scheduling` (esta última consume el video/imágenes de `TWS/04_Campana_Creativa/`)

---

## 3. Principio rector de todo este documento

No romper lo que ya funciona (subsitios legacy, SEO ya validado) mientras se gana lo nuevo (Next.js, Vercel, `/lab`). Cada fase con checkbox se confirma antes de pasar a la siguiente cuando implica riesgo de producción (deploy, DNS, merge a `main`).
