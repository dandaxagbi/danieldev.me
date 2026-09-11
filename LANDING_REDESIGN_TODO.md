Landing Redesign — Checklist hasta Deploy

Rama de trabajo: feature/landing-redesign (no tocar main hasta confirmación)

## Fase 1 — Scaffold del proyecto
- [ ] Crear subcarpeta `landing-app/` en la raíz del repo con Vite + React + TypeScript
- [ ] Instalar Tailwind CSS, framer-motion, lucide-react
- [ ] Configurar `index.css` con el import de Google Fonts (Instrument Serif) y la clase `.liquid-glass`
- [ ] Configurar Tailwind (content paths, colores base bg-black)
- [ ] Configurar `vite.config.ts` con `base` relativo para que el build funcione servido desde la raíz de danieldev.me

## Fase 2 — Componentes (clon tal cual del prompt, con URLs de video originales como placeholder)
- [ ] `Index.tsx` — Sección 1 Hero: video de fondo con lógica de fade in JS, navbar liquid-glass, heading, input de email, botón manifesto, iconos sociales
- [ ] `AboutSection.tsx` — Sección 2, animaciones con `useInView`
- [ ] `FeaturedVideoSection.tsx` — Sección 3, video destacado + overlay con card
- [ ] `PhilosophySection.tsx` — Sección 4, grid 2 columnas video + texto
- [ ] `ServicesSection.tsx` — Sección 5, grid 2 cards con video
- [ ] Ensamblar todo en `App.tsx` en orden
- [ ] Confirmar que compila y corre en local (`npm run dev`) sin errores, con los videos placeholder del prompt

## Fase 3 — Reemplazo de contenido con tu CV actualizado
- [ ] Navbar: "Asme" → tu nombre/marca personal; links de nav (Features/Pricing/About → Experience/Work/Contact o similar)
- [ ] Hero heading: "Know it then all" → tu propuesta de valor (ej. algo que combine AI/Prompt Engineer, Front-End Developer, Senior Digital Marketer)
- [ ] Hero subtítulo: reemplazar copy genérico de newsletter por tu propuesta real
- [ ] Reemplazar formulario de email/newsletter por algo con sentido para un CV personal (ej. contacto, o quitar si no aplica)
- [ ] About section: "Pioneering ideas / minds that create, build, and inspire" → tu historia (AIM, HCMedic, Bizlytics, 14 años de trayectoria)
- [ ] Featured video: copy "Our Approach" → tu filosofía de trabajo real
- [ ] Philosophy section ("Innovation x Vision"): dos bloques de texto → adaptar a tu forma de trabajar (ej. Marketing x AI, o Estrategia x Desarrollo)
- [ ] Services section ("What we do"): 2 cards → tus 2-3 pilares reales (ej. Front-End Development, AI/GEO Strategy, Digital Marketing) usando contenido de Bizlytics/AIM/HCMedic
- [ ] Botones "Sign Up / Login" → CTAs reales (ej. "Descargar CV" / "Contactar" / link a LinkedIn o email)
- [ ] Iconos sociales (Instagram/Twitter/Globe) → tus redes reales o quitar los que no tengas
- [ ] Meta tags (title, og:title, og:description, og:image) actualizados con tu info

## Fase 4 — Videos propios (después del clon inicial)
- [ ] Definir qué videos vas a generar/usar (Google Flow/LoRA, como hiciste para AIM, o clips reales)
- [ ] Generar/recopilar los 4 videos necesarios (hero, featured, philosophy, y los 2 de services)
- [ ] Subir los videos al repo o a un host propio (ej. Cloudflare R2, Vercel Blob, o directamente en el repo si el tamaño lo permite)
- [ ] Reemplazar las URLs de CloudFront del template por las tuyas
- [ ] Confirmar que ningún video de terceros quede referenciado antes de ir a producción

## Fase 5 — QA local
- [ ] Revisar responsive (mobile/tablet/desktop) en las 5 secciones
- [ ] Revisar que los links (CV, contacto, redes) funcionen
- [ ] Revisar performance de los videos (tamaño de archivo, lazy load si aplica)
- [ ] Revisar accesibilidad básica (alt text, contraste de texto blanco sobre video)
- [ ] Correr build de producción (`npm run build`) y verificar que el `dist/` se genera sin errores

## Fase 6 — Integración con el repo (sin romper subsitios existentes)
- [ ] Confirmar que `npm run build` no pisa `assets/image/Titles` (donde vive tu CV) ni las carpetas `/cv`, `/bizlytics`, `/batabit`, `/curso-intro-react`, `/e-commerce`, `/game`, `/personal-portfolio`
- [ ] Definir estrategia de deploy: opción A) build committeado directo a `main` (compatible con GitHub Pages "legacy" actual, sin cambiar configuración); opción B) GitHub Actions que compile y despliegue automáticamente (requiere cambiar el source de Pages a "GitHub Actions")
- [ ] Implementar la opción elegida
- [ ] Probar el build generado sirviéndolo localmente (ej. `npm run preview` o `npx serve dist`) simulando la raíz del dominio

## Fase 7 — Revisión y aprobación antes de producción
- [ ] Mostrarte capturas/preview del resultado final con tu contenido y (idealmente) tus videos propios
- [ ] Confirmación tuya explícita antes de mergear `feature/landing-redesign` a `main`
- [ ] Confirmación explícita antes del push que dispara el deploy en vivo a danieldev.me

## Fase 8 — Deploy
- [ ] Merge a `main`
- [ ] Push a GitHub
- [ ] Verificar danieldev.me en vivo (puede tardar unos minutos en propagar vía GitHub Pages)
- [ ] Verificar que los subsitios (/cv, /bizlytics, etc.) siguen funcionando igual que antes
