# Implementation Plan: Acceso gateado y landing de /lab

**Branch**: `feature/nextjs-migration` | **Date**: 2026-09-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-lab-access-gate/spec.md`, dirección visual de `specs/001-lab-access-gate/design.md`.

## Summary

Scaffolding de una app Next.js nueva (`app-next/`) que aloja, en esta primera entrega, el middleware de gate para `/lab/*` y la landing post-gate con las cards de proyecto. El passcode se valida server-side contra `LAB_PASSCODE`; la sesión se otorga vía cookie firmada con HMAC (`LAB_SESSION_SECRET`), sin librerías de auth de terceros. Se deja preparado para deploy de preview en Vercel (sin dominio custom, sin tocar `main`).

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 15 (App Router), Node.js runtime para middleware (no Edge runtime, porque se usa `node:crypto` para el HMAC — ver Constitution Check)

**Primary Dependencies**: Next.js, React 19, Tailwind v4, framer-motion, lucide-react, clsx, tailwind-merge — idénticas a `landing-app/package.json`, cero dependencias nuevas de terceros para el gate (HMAC con `node:crypto`, nativo)

**Storage**: N/A — no hay base de datos; la única persistencia es una cookie de sesión en el navegador del visitante

**Testing**: verificación manual guiada por los Acceptance Scenarios de `spec.md` en esta primera entrega (sin suite automatizada — proyecto de una sola persona, alcance chico; se puede agregar Playwright más adelante si `/lab` crece)

**Target Platform**: Web, mobile-first (Vercel, preview deploy)

**Project Type**: Web app (Next.js, un solo proyecto — no hay separación frontend/backend, el middleware y los route handlers viven en el mismo proyecto Next.js)

**Performance Goals**: sin requisitos especiales — página estática/liviana, sin video ni imágenes pesadas en esta entrega

**Constraints**: debe convivir en el mismo repo que `landing-app/` (SPA actual) y la raíz estática, sin interferir con ninguno mientras ambos coexistan durante la migración

**Scale/Scope**: una sola sección (`/lab`), un solo passcode compartido, tráfico esperado: unas pocas personas por semana (uso personal/comercial puntual, no público)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Chequeo | Resultado |
|---|---|---|
| I. No romper lo que ya funciona | `app-next/` es una carpeta nueva y separada; no se toca `landing-app/`, la raíz estática, ni ninguno de los 7 subsitios legacy en este plan | ✅ Pasa |
| II. Minimalismo de dependencias | Cero dependencias nuevas: HMAC con `node:crypto` (nativo de Node), sin NextAuth/Clerk/librerías de sesión | ✅ Pasa |
| III. /lab es vitrina, no producto | La landing lista proyectos como cards estáticas en código (sin CMS, sin base de datos) — agregar un proyecto nuevo es agregar una entrada a un array, no una migración de esquema | ✅ Pasa |
| IV. /lab/\* nunca se indexa | `robots: { index: false, follow: false }` en el layout de `/lab`, exclusión explícita en `sitemap.ts`, gate por passcode único sin sistema de cuentas (deliberado) | ✅ Pasa |
| V. Identidad visual consistente | `design.md` reusa tokens exactos de `landing-app/src/index.css` (`.liquid-glass`, Instrument Serif, fondo `#000`) — cero paleta o componente nuevo | ✅ Pasa |
| Cambios de riesgo requieren confirmación | Este plan termina en un **preview deploy de Vercel**, no en producción — no se toca DNS ni se mergea a `main` sin confirmación posterior explícita | ✅ Pasa (ver Fase de deploy) |

Nota técnica sobre runtime: Next.js Middleware corre por defecto en Edge Runtime, que no tiene acceso a `node:crypto` de la misma forma que Node.js. Para mantener "cero dependencias nuevas" sin renunciar a HMAC nativo, el plan usa **Web Crypto API** (`crypto.subtle`, disponible en Edge Runtime de forma nativa) en lugar de `node:crypto` — esto es una corrección respecto al input inicial, documentada aquí porque cambia el detalle de implementación sin cambiar el principio (sigue siendo nativo, sin librerías nuevas).

## Project Structure

### Documentation (this feature)

```text
specs/001-lab-access-gate/
├── spec.md          # ya existe
├── design.md        # ya existe
├── plan.md          # este archivo
└── tasks.md         # próximo paso (/speckit-tasks)
```

### Source Code (repository root)

```text
app-next/                          # scaffold nuevo de Next.js (App Router)
├── app/
│   ├── layout.tsx                 # layout raíz (fuente Instrument Serif, fondo #000)
│   ├── globals.css                # tokens portados de landing-app/src/index.css
│   ├── lab/
│   │   ├── layout.tsx             # layout de /lab — robots: noindex/nofollow acá
│   │   ├── page.tsx                # landing post-gate (cards de proyecto)
│   │   ├── gate/
│   │   │   └── page.tsx            # pantalla de passcode (server component + form action)
│   │   └── actions.ts              # server action: validar passcode, setear cookie firmada
│   └── sitemap.ts                  # excluye explícitamente cualquier ruta /lab
├── middleware.ts                   # matcher /lab/:path*, exceptuando /lab/gate; verifica cookie
├── lib/
│   └── lab-session.ts              # firmar/verificar cookie con Web Crypto API (HMAC-SHA256)
├── public/                         # (vacío por ahora en esta entrega — assets legacy se suman en fase posterior de NEXTJS_Y_LAB_TODO.md)
├── package.json
└── tsconfig.json
```

**Structure Decision**: Next.js App Router, proyecto único (`app-next/`) dentro del mismo repo, sin separación backend/frontend — el middleware y los server actions cubren toda la lógica de gate sin necesidad de un servicio aparte. Esto es intencional y proporcional al alcance real (un passcode, una cookie), evitando sobre-arquitectura.

### Detalle del mecanismo de sesión (`lib/lab-session.ts`)

1. `LAB_PASSCODE` y `LAB_SESSION_SECRET` viven solo en variables de entorno (Vercel envs), nunca en el código fuente.
2. Al recibir el passcode correcto en el server action de `app/lab/actions.ts`, se genera un valor de sesión: `HMAC-SHA256(LAB_SESSION_SECRET, "lab-session" + fecha_de_expiración)`, codificado en base64url.
3. La cookie (`lab_session`) guarda `fecha_de_expiración.firma`, `httpOnly`, `secure`, `sameSite: "lax"`, expiración de 30 días.
4. El middleware, en cada request a `/lab/:path*` (excepto `/lab/gate`), recalcula el HMAC esperado para la fecha de expiración indicada en la cookie y lo compara con la firma recibida (comparación en tiempo constante). Si no coincide, o la fecha ya expiró, o no hay `LAB_PASSCODE`/`LAB_SESSION_SECRET` configurados → redirige a `/lab/gate` (fail-safe, nunca fail-open, cumple FR-010 del spec).

## Fase de deploy (preview, sin tocar producción)

1. Conectar el repo `danieldev.me` a un proyecto de Vercel (nuevo proyecto, o el mismo si ya existe uno vacío).
2. Configurar el **Root Directory** del proyecto Vercel en `app-next/` (Vercel soporta monorepos con root directory configurable — no requiere mover `landing-app/` ni la raíz estática).
3. Cargar `LAB_PASSCODE` y `LAB_SESSION_SECRET` como variables de entorno del proyecto Vercel (valores elegidos por Daniel, no generados por el agente).
4. Push de la rama `feature/nextjs-migration` → Vercel genera automáticamente una **Preview URL** (`*.vercel.app`) sin tocar `danieldev.me` ni requerir cambio de DNS.
5. Esa Preview URL es la que Daniel revisa desde el celular — cumple el objetivo de este ciclo sin violar la regla de confirmación explícita para cambios de producción.

## Complexity Tracking

*Sin violaciones a la constitución en este plan — tabla omitida.*
