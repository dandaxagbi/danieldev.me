# Feature Specification: Acceso gateado y landing de /lab

**Feature Branch**: `feature/nextjs-migration` (esta feature se implementa dentro de la rama de migración general, no en una rama propia — ver decisión de alcance en `NEXTJS_Y_LAB_TODO.md`)

**Created**: 2026-09-12

**Status**: Draft

**Amendment (2026-09-13)**: el gate cambió de un passcode único a **usuario + contraseña** (par fijo por variables de entorno `LAB_USERNAME`/`LAB_PASSWORD`, no una tabla de usuarios), para poder personalizar el login por destinatario — ej. usuario `Mark` para el proyecto `retail-scheduling` de TWS. Las menciones a "passcode" más abajo son el diseño original; donde importa el detalle exacto (Functional Requirements) ya están actualizadas.

**Input**: User description: "sección /lab del sitio danieldev.me — gate de passcode brandeado para toda la sección, más la página de landing que explica qué es el espacio y lista proyectos como cards (retail-scheduling como primer proyecto, en desarrollo). Sin cuentas de usuario, sin roles, sin indexación."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ingresar con el passcode correcto (Priority: P1)

Daniel comparte un link (`danieldev.me/lab` o una sub-ruta) y un passcode por WhatsApp/email a un cliente potencial. El cliente abre el link, ve una pantalla de acceso brandeada, ingresa el passcode, y entra a la sección.

**Why this priority**: Sin esto no existe la feature — es el requisito bloqueante de todo lo demás.

**Independent Test**: Visitar `/lab` sin cookie de sesión, ingresar el passcode correcto configurado en la variable de entorno, confirmar que se setea la cookie y se accede al contenido.

**Acceptance Scenarios**:

1. **Given** un visitante sin cookie de sesión de `/lab`, **When** visita cualquier ruta bajo `/lab/*`, **Then** el middleware lo redirige a la pantalla de gate.
2. **Given** el visitante en la pantalla de gate, **When** ingresa el passcode correcto, **Then** se setea una cookie de sesión firmada y es redirigido a la ruta que originalmente pidió (o a `/lab` si no había una ruta específica).
3. **Given** un visitante con cookie de sesión válida, **When** visita cualquier ruta bajo `/lab/*`, **Then** accede directamente sin ver el gate de nuevo.

---

### User Story 2 - Rechazar un passcode incorrecto (Priority: P1)

El visitante ingresa un passcode incorrecto.

**Why this priority**: Es el comportamiento de seguridad mínimo esperado — sin esto el gate no cumple su función de discreción.

**Independent Test**: Ingresar un passcode inválido y confirmar que no se otorga acceso y se muestra feedback claro.

**Acceptance Scenarios**:

1. **Given** la pantalla de gate, **When** el visitante ingresa un passcode incorrecto, **Then** el sistema muestra un mensaje de error simple (sin revelar el passcode correcto ni detalles técnicos) y permite reintentar.
2. **Given** múltiples intentos fallidos, **When** se siguen ingresando passcodes incorrectos, **Then** el sistema no bloquea permanentemente al usuario (no hay cuentas que banear) pero tampoco expone información adicional — el rate-limiting agresivo queda fuera de alcance (ver Assumptions).

---

### User Story 3 - Entender qué es /lab al entrar (Priority: P2)

Una vez dentro, el visitante ve la landing de `/lab` y entiende en segundos de qué se trata la sección.

**Why this priority**: Es el propósito comunicativo central de la sección — sin esto, entrar no tiene sentido para el visitante.

**Independent Test**: Con sesión válida, visitar `/lab` y confirmar que el copy explica el propósito del espacio sin ambigüedad, en tono discreto (no corporativo, no de venta).

**Acceptance Scenarios**:

1. **Given** un visitante con sesión válida en `/lab`, **When** carga la página, **Then** ve un texto breve que explica que este es un espacio donde Daniel desarrolla ideas para clientes que le interesan, antes de que sean un proyecto formal.
2. **Given** la landing de `/lab`, **When** el visitante la recorre, **Then** ve al menos una card de proyecto (`retail-scheduling`) con un estado visible (ej. "en desarrollo").

---

### Edge Cases

- ¿Qué pasa si el visitante borra la cookie o usa modo incógnito? → Vuelve a ver el gate (comportamiento esperado, no es un bug).
- ¿Qué pasa si `LAB_PASSCODE` no está configurado en el entorno (ej. un preview deploy sin la env var)? → El middleware debe fallar de forma segura: negar acceso siempre, nunca dejar pasar por defecto.
- ¿Qué pasa si un buscador o bot intenta indexar `/lab/*`? → Debe recibir `noindex, nofollow` en la respuesta aunque no tenga la cookie (el header/meta de noindex no depende de estar autenticado).
- ¿Qué pasa si el visitante comparte el link con alguien más sin el passcode? → Esa persona ve el gate igual que cualquier visitante nuevo; el passcode es lo único que protege el contenido (aceptado explícitamente como suficiente para el nivel de riesgo real, ver constitución principio IV).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE proteger toda ruta bajo `/lab/*` con un middleware que verifique una cookie de sesión antes de servir contenido.
- **FR-002**: El sistema DEBE mostrar una pantalla de gate brandeada (fondo oscuro, tipografía Instrument Serif, estética liquid-glass) cuando no exista cookie de sesión válida.
- **FR-003**: El sistema DEBE validar usuario y contraseña ingresados contra variables de entorno (`LAB_USERNAME`, `LAB_PASSWORD`), nunca contra valores hardcodeados en el código fuente.
- **FR-004**: El sistema DEBE setear una cookie de sesión firmada/verificable (no un valor plano adivinable) al validar las credenciales correctamente.
- **FR-005**: El sistema DEBE mostrar `noindex, nofollow` en toda respuesta bajo `/lab/*`, independientemente del estado de autenticación.
- **FR-006**: El sistema DEBE excluir toda ruta `/lab/*` de `sitemap.xml`.
- **FR-007**: La landing de `/lab` (post-gate) DEBE comunicar en una o dos frases el propósito del espacio.
- **FR-008**: La landing de `/lab` DEBE listar proyectos como cards, con al menos una card para `retail-scheduling` marcada como "en desarrollo" (el contenido completo de esa página es una feature futura, fuera de este alcance).
- **FR-009**: El sistema NO DEBE implementar un sistema de cuentas real (múltiples usuarios, roles, base de datos) para este gate — un único par usuario+contraseña fijo por variables de entorno es suficiente (constitución, principio IV).
- **FR-010**: El middleware DEBE denegar acceso por defecto si `LAB_USERNAME` o `LAB_PASSWORD` no están configurados en el entorno (fail-safe, no fail-open).

### Key Entities

- **Sesión de gate**: no es una entidad de negocio ni se persiste en base de datos — es una cookie de sesión con expiración (ej. 7-30 días), firmada, sin datos de usuario asociados (no identifica quién entró, solo que alguien pasó el gate).
- **Proyecto de /lab**: entidad conceptual de la landing (no un modelo de datos con backend) — representada como contenido estático en el código (título, slug, estado). El primer proyecto es `retail-scheduling`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visitante con el passcode correcto accede al contenido de `/lab` en menos de 10 segundos desde que abre el link, sin fricción adicional.
- **SC-002**: Ningún motor de búsqueda indexa ninguna URL bajo `/lab/*` (verificable con `site:danieldev.me/lab` en Google, semanas después del deploy).
- **SC-003**: Un visitante sin passcode nunca ve contenido real de `/lab`, bajo ninguna combinación de URL directa, refresh, o navegación.
- **SC-004**: El gate y la landing se ven visualmente indistinguibles en calidad/estilo del resto del sitio (mismo sistema de diseño), verificable por inspección visual directa.

## Assumptions

- El nivel de seguridad requerido es **discreción**, no protección de datos sensibles reales — un passcode compartido sin rate-limiting sofisticado ni 2FA es aceptable y deliberado (constitución, principio IV).
- No hay requisito de "recordar quién entró" — la cookie de sesión es anónima, no vinculada a un usuario específico.
- El passcode se comunica fuera de banda (WhatsApp, email, en persona) — no hay flujo de "recuperar passcode" ni "invitar por email" dentro del alcance de esta feature.
- El contenido completo del proyecto `retail-scheduling` (video, imágenes, copy de campaña) se especifica y construye en una feature separada posterior; aquí solo existe como card de estado "en desarrollo".
- Mobile-first: el gate y la landing deben verse y funcionar correctamente en viewport móvil como caso de uso principal (el propio Daniel va a revisar el deploy desde el celular).
