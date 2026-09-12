# Tasks: Acceso gateado y landing de /lab

**Input**: `spec.md`, `design.md`, `plan.md` en `specs/001-lab-access-gate/`

**Convención**: cada tarea es ejecutable de forma independiente y en orden de dependencia. `[P]` = puede hacerse en paralelo con otras tareas `[P]` de la misma fase.

---

## Fase 1 — Setup del proyecto

- [x] T001 Crear scaffold Next.js 15 (App Router, TypeScript) en `app-next/`
- [x] T002 Instalar dependencias: `tailwindcss@4`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge` en `app-next/package.json`
- [x] T003 [P] Portar tokens visuales a `app-next/app/globals.css` (import de Instrument Serif, fondo `#000`, clase `.liquid-glass`, `.font-serif-display`) — copiado literal de `landing-app/src/index.css`
- [x] T004 [P] Configurar `app-next/app/layout.tsx` raíz: `<html>`/`<body>` con fondo negro, import de `globals.css`, metadata base del sitio

---

## Fase 2 — Fundacional (bloqueante para todo lo demás)

- [x] T005 Crear `app-next/lib/lab-session.ts`: funciones `signSession(expiresAt: number): Promise<string>` y `verifySession(cookieValue: string): Promise<boolean>` usando `crypto.subtle` (HMAC-SHA256) sobre `LAB_SESSION_SECRET`
- [x] T006 Crear `app-next/.env.local.example` documentando `LAB_PASSCODE` y `LAB_SESSION_SECRET` (sin valores reales) — nunca commitear `.env.local` real
- [x] T007 Crear `app-next/middleware.ts` con `matcher: ['/lab/:path*']`, excluyendo explícitamente `/lab/gate` de la verificación, que:
  - Lee la cookie `lab_session`
  - Llama a `verifySession` de T005
  - Si falla o no existe `LAB_PASSCODE`/`LAB_SESSION_SECRET` en el entorno → redirige a `/lab/gate` (fail-safe, FR-010)
  - Si es válida → deja pasar

**Checkpoint**: con T005-T007, cualquier request a `/lab/*` sin sesión válida ya redirige al gate (aunque la página del gate todavía no exista visualmente).

---

## Fase 3 — User Story 1: Ingresar con el passcode correcto (P1) 🎯 MVP

- [x] T008 [US1] Crear `app-next/app/lab/gate/page.tsx`: server component con el layout de `design.md` sección 2 (foto de perfil, heading serif itálica, form con input `type="password"` y botón submit, ambos `liquid-glass rounded-full`)
- [x] T009 [US1] Crear `app-next/app/lab/actions.ts` con server action `validatePasscode(formData)`:
  - Compara el valor del form contra `LAB_PASSCODE` (comparación en tiempo constante)
  - Si coincide: genera `expiresAt` (+30 días), llama a `signSession` de T005, setea cookie `lab_session` (`httpOnly`, `secure`, `sameSite: 'lax'`), redirige a la ruta originalmente solicitada o `/lab`
  - Si no coincide: retorna estado de error para mostrar en T008
- [x] T010 [US1] Conectar el form de `app/lab/gate/page.tsx` al server action de T009 (usar `useActionState`/`useFormState` de React 19 para mostrar el mensaje de error sin perder la posición del usuario)

**Checkpoint**: con T008-T010, un visitante puede ingresar el passcode correcto y obtener acceso — MVP funcional de punta a punta para User Story 1.

---

## Fase 4 — User Story 2: Rechazar un passcode incorrecto (P1)

- [x] T011 [US2] Verificar/ajustar T009 y T010 para que el mensaje de error sea genérico y no revele información ("passcode incorrecto, intenta de nuevo") — sin distinguir "usuario no existe" de "passcode mal" (no aplica acá al no haber usuarios, pero sí evitar cualquier detalle técnico en el mensaje)
- [x] T012 [US2] Confirmar manualmente (Acceptance Scenario de `spec.md` US2): múltiples intentos fallidos seguidos no bloquean permanentemente ni exponen el passcode correcto

**Checkpoint**: gate completo y a prueba de los dos escenarios P1 del spec.

---

## Fase 5 — User Story 3: Entender qué es /lab al entrar (P2)

- [x] T013 [US3] Crear `app-next/app/lab/layout.tsx`: layout específico de `/lab` con `export const metadata = { robots: { index: false, follow: false } }` (FR-005), nav simplificada (foto + nombre + link "← volver al sitio", sin los anchors del sitio principal, según `design.md` sección 3)
- [x] T014 [US3] Crear `app-next/app/lab/page.tsx`: landing post-gate con heading `/lab` (serif itálica), párrafo de propósito (copy literal de `design.md`: "Acá desarrollo ideas para clientes que me interesan, antes de que sean un proyecto formal"), y grid de cards de proyecto
- [x] T015 [US3] Implementar la card de proyecto como componente reutilizable en `app-next/app/lab/ProjectCard.tsx` (`liquid-glass rounded-2xl`, título + estado), con una primera instancia: `retail-scheduling` / "En desarrollo", no clickeable todavía

**Checkpoint**: landing completa y visualmente alineada a `design.md` — feature completa end-to-end para las 3 user stories del spec.

---

## Fase 6 — Requisitos no funcionales transversales

- [x] T016 [P] Crear `app-next/app/sitemap.ts` que genere el sitemap del sitio **excluyendo explícitamente** cualquier ruta bajo `/lab` (FR-006)
- [x] T017 [P] Verificar que el `noindex` de T013 se refleja en el HTML servido (`<meta name="robots" content="noindex, nofollow">`) tanto en `/lab/gate` como en `/lab` y subrutas — confirmar que aplica incluso sin sesión válida (FR-005, independiente del estado de autenticación)
- [x] T018 Revisar responsive mobile de `/lab/gate` y `/lab` (viewport principal de esta entrega, según `spec.md` Assumptions) — sin scroll no intencional, textos legibles, `liquid-glass` renderiza bien en Safari iOS (`-webkit-backdrop-filter`)

---

## Fase 7 — Deploy de preview (sin tocar producción)

- [x] T019 Crear/conectar proyecto en Vercel para este repo, con **Root Directory** = `app-next/`
- [x] T020 Cargar `LAB_PASSCODE` y `LAB_SESSION_SECRET` como variables de entorno del proyecto en Vercel. **Nota de desviación**: por pedido explícito de Daniel de avanzar sin pausar hasta el deploy, el agente generó valores temporales (`openssl rand`) para no bloquear el ciclo — nunca commiteados al repo, solo cargados como env vars de Vercel. Daniel puede rotarlos cuando quiera desde el dashboard de Vercel o con `vercel env rm` + `vercel env add`.
- [x] T021 Push de `feature/nextjs-migration` a GitHub → confirmar que Vercel genera la Preview URL automáticamente
- [ ] T022 Probar la Preview URL completa desde un dispositivo móvil real: `/lab` redirige a `/lab/gate`, passcode correcto entra, passcode incorrecto muestra error, landing se ve conforme a `design.md`

---

## Dependencias entre fases

```
Fase 1 (Setup)
   ↓
Fase 2 (Fundacional: sesión + middleware) ← bloqueante para todo lo demás
   ↓
Fase 3 (US1: passcode correcto) ← MVP mínimo viable
   ↓
Fase 4 (US2: passcode incorrecto) ← refina el mismo flujo, no bloquea Fase 5
   ↓
Fase 5 (US3: landing) ← puede empezar apenas Fase 2 esté lista, en paralelo con Fase 3/4 si hay más de una persona trabajando
   ↓
Fase 6 (No funcionales transversales)
   ↓
Fase 7 (Deploy preview) ← requiere T001-T018 completas
```

## Alcance explícitamente fuera de estas tasks

- Contenido completo de `/lab/retail-scheduling` (video, imágenes, copy de campaña) — feature futura separada, la card de T015 solo indica "en desarrollo".
- Migración de `landing-app/` y los 7 subsitios legacy a `app-next/` — cubierto por `NEXTJS_Y_LAB_TODO.md`, no por esta feature.
- Merge a `main` y cambio de DNS de producción — requiere confirmación explícita posterior, no es parte de este ciclo de tasks.
