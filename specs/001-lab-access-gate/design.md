# Design — Gate y landing de /lab

Dirección visual concreta antes de programar, tal como pidió Daniel. Extraído directamente del sistema de diseño real ya en producción (`landing-app/src/index.css`, `Hero.tsx`), no inventado — `/lab` debe verse como una extensión natural del sitio, no una sección aparte.

## 1. Tokens heredados (no se redefinen, se reusan)

```css
/* landing-app/src/index.css — copiar tal cual a app-next */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

html, body { background: #000; }
body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }

.font-serif-display { font-family: 'Instrument Serif', serif; }

.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

- **Fondo:** negro puro (`#000`), igual que el resto del sitio — no gris oscuro, no gradiente.
- **Texto:** blanco (`text-white`) para elementos primarios, `text-white/80` para secundario/nav, mismo patrón que `Hero.tsx`.
- **Tipografía de heading:** Instrument Serif, itálica para la palabra de énfasis (mismo patrón que `Strategy meets <em>code</em>` en el Hero — en `/lab` la palabra de énfasis natural es "ideas" o "clientes").
- **Tipografía de cuerpo:** system-ui (sans), tamaños pequeños (`text-sm`), `leading-relaxed` — el sitio nunca usa párrafos largos ni bloques densos.
- **Componente de interacción por defecto:** `liquid-glass rounded-full`, igual en botones, inputs de nav y cards — es el único "chrome" visual que usa todo el sitio, no se introduce un estilo de card/botón nuevo para `/lab`.

## 2. Pantalla de gate

**Layout (mobile-first, es el caso de uso principal de esta primera revisión):**

*Amendment (2026-09-13): el gate pasó de un solo campo de passcode a usuario+contraseña, para poder personalizar el login por destinatario (ej. usuario `Mark` para el proyecto `retail-scheduling` de TWS). El mockup de abajo refleja esta versión.*

```
┌─────────────────────────────┐
│                             │  ← fondo #000, sin nav, sin video
│                             │
│      [foto de perfil]      │  ← mismo profile-photo.png circular del Hero, 56px
│                             │
│   Daniel Aguilar Bishop     │  ← text-white, text-lg, font-semibold
│                             │
│   "This is my lab."         │  ← font-serif-display italic, text-2xl
│   (párrafo explicativo)     │  ← text-white/70 text-sm, ver copy real en page.tsx
│                             │
│  ┌───────────────────────┐  │
│  │  username              │  │  ← liquid-glass rounded-full, type=text
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │  · · · · · · (password)│  │  ← liquid-glass rounded-full, type=password
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │        Enter            │  │  ← liquid-glass rounded-full, botón submit
│  └───────────────────────┘  │
│                             │
│  (mensaje de error aquí,    │  ← text-white/60 text-xs, solo si aplica
│   si las credenciales son   │
│   incorrectas)               │
│                             │
│   ← back to danieldev.me    │  ← text-white/40 text-xs, salida siempre visible
│                             │
└─────────────────────────────┘
```

- Centrado vertical y horizontal, un solo bloque, sin scroll en mobile.
- Los inputs de usuario/contraseña no llevan label visible más allá de un placeholder discreto (`"username"` / `"password"`, minúscula, `text-white/40`).
- El botón "Enter" reusa exactamente la clase `liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors` del CTA del Hero — cero estilos nuevos.
- Mensaje de error: una sola línea, tono neutro ("incorrect username or password, try again") — nunca alarmante, nunca con íconos de candado/seguridad (eso rompe el tono discreto y lo acerca a "producto de seguridad", que la constitución explícitamente evita).
- Sin logo de "TWS" ni de ningún cliente visible en esta pantalla — es la puerta de entrada a todo `/lab`, es agnóstica de cliente. La personalización vive únicamente en el valor del usuario (ej. "Mark"), nunca en el diseño de la pantalla.
- Link de salida "← back to danieldev.me" siempre visible, para quien llega sin contexto o cambia de opinión.

## 3. Landing de /lab (post-gate)

**Layout (mobile-first):**

```
┌─────────────────────────────┐
│  [foto] Daniel Aguilar...   │  ← misma nav liquid-glass del Hero, sin los links
│                             │     de #about/#services (no aplica acá)
│                             │
│   /lab                      │  ← font-serif-display italic, text-4xl
│                             │
│   "Acá desarrollo ideas     │  ← text-white/80, text-sm, max-w-md,
│   para clientes que me      │     leading-relaxed — 1-2 frases, no más
│   interesan, antes de que   │
│   sean un proyecto formal." │
│                             │
│  ┌───────────────────────┐  │
│  │ retail-scheduling      │  │  ← card liquid-glass rounded-2xl, padding
│  │ En desarrollo           │  │     generoso; título text-white, estado
│  │                         │  │     text-white/50 text-xs uppercase tracking
│  └───────────────────────┘  │
│                             │
│  (más cards cuando existan) │
│                             │
└─────────────────────────────┘
```

- Nav simplificada: mismo `liquid-glass rounded-full` con foto + nombre, pero sin los anchors del sitio principal (About/Services/Work no aplican dentro de `/lab`) — sí puede incluir un link discreto "← volver al sitio" hacia `/`.
- El copy de propósito es literal, casi conversacional — evitar cualquier palabra de marketing ("solución", "innovador", "revolucionario"). El tono es el mismo que usó Daniel en la llamada con Diego: *"se me ocurrió esto, no sé si funciona, quería mostrártelo"* — la página debe sentirse como esa frase, no como un pitch.
- Cards de proyecto: una por ahora (`retail-scheduling`), estructura reutilizable para agregar más sin rediseñar (constitución, principio III). Card no clickeable todavía si el proyecto está "en desarrollo" — se activa el link cuando el contenido real exista (feature futura).
- Sin sitemap, sin analytics de terceros, sin cualquier señal que pueda filtrar esta URL a un buscador (coherente con `noindex` a nivel de código, no solo de intención).

## 4. Qué NO hacer (explícito, para no desviarse)

- No introducir una paleta de color nueva (nada de azules/verdes corporativos "de SaaS").
- No usar iconografía de seguridad (candados, escudos) — contradice el tono de "espacio personal discreto".
- No agregar animaciones nuevas de librería — si se anima algo, reusar el patrón ya existente de `framer-motion` con `useInView` que ya usa `landing-app`.
- No hacer la landing "vendedora" — cero CTAs tipo "Contáctame para tu proyecto" dentro de `/lab`. La página informa, no vende.
