Informe SEO/GEO — danieldev.me (landing-app)

Fecha: 2026-09-11
Rama: feature/landing-redesign

## 1. Qué se auditó

- Meta tags (title, description, robots, canonical)
- Open Graph (Facebook/LinkedIn) y Twitter Card
- Structured data (schema.org / JSON-LD)
- GEO: descubribilidad para motores de IA (llms.txt)

## 2. Meta tags — antes / después

**Title**: sin cambios de fondo (ya estaba bien orientado), se mantuvo:
`Daniel Aguilar Bishop | AI/Prompt Engineer, Front-End Developer & Senior Digital Marketer`

**Description**: se reescribió. Antes usaba un guion largo (em dash) y no tenía longitud controlada. Ahora:
`Daniel Aguilar Bishop: AI/Prompt Engineer, Front-End Developer, and Senior Digital Marketer with 14+ years turning strategy into shipped products.` (146 caracteres, dentro del rango ideal de 150-160 antes del corte en SERP).

**Agregado, no existía antes**:
- `<link rel="canonical" href="https://danieldev.me/" />`
- `<meta name="robots" content="index, follow" />`
- `<meta name="theme-color" content="#000000" />`
- `<meta name="author" content="Daniel Aguilar Bishop" />`

## 3. Open Graph y Twitter Card

**Antes**: solo og:title, og:description, og:image (relativo), og:type="website".

**Ahora**:
- `og:type` cambiado a `profile` (más preciso para una página personal que para un sitio genérico)
- `og:url`, `og:site_name`, `og:locale` agregados
- `og:image` pasado a URL absoluta (`https://danieldev.me/profile-photo.png`) — los relativos fallan en muchos scrapers de redes sociales
- `og:image:width` / `og:image:height` agregados (500x500, mejora el render en WhatsApp/LinkedIn/Slack)
- `profile:first_name` / `profile:last_name` agregados (complementan og:type=profile)
- Twitter Card completo agregado desde cero (twitter:card, twitter:title, twitter:description, twitter:image) — antes no existía, así que compartir el link en X/Twitter no mostraba preview propio, caía al genérico del navegador.

## 4. Structured data (schema.org / JSON-LD)

Investigué en la documentación y guías actuales de Google/schema.org antes de implementar (fuentes abajo). El patrón recomendado para una página personal de este tipo es **ProfilePage + Person con @id estable**, no solo Person suelto. Implementé 4 entidades enlazadas vía `@graph`:

1. **ProfilePage**: envuelve la página, referencia a Person como `mainEntity`.
2. **WebSite**: entidad del sitio, con `publisher` apuntando a Person.
3. **Person** (la entidad central):
   - `jobTitle`: tus 3 roles
   - `sameAs`: LinkedIn, El Médico Visible, Bizlytics (perfiles que te representan)
   - `knowsAbout`: 12 áreas de expertise (SEO, GEO, AEO, React, Claude Code, MCP, etc.)
   - `alumniOf`: Aquino University
   - `worksFor`: AIM Internet Marketing, HCMedic
   - `founder`: Bizlytics
   - `address`: Cochabamba, Bolivia
4. **Book**: El Médico Visible, con `author` referenciando tu Person vía `@id` (no duplicado, mismo patrón que recomienda Google para reutilizar identidad).
5. **Event**: FISODERMA 2.0, Asunción, Paraguay, `startDate: 2026-08-15`, `endDate: 2026-08-16` (confirmaste la fecha exacta), con `performer` referenciando tu Person vía `@id`.

Validé el JSON con un parser (`json.loads`), 0 errores de sintaxis. **Pendiente**: una vez deployado a danieldev.me, correr el [Google Rich Results Test](https://search.google.com/test/rich-results) y el [Schema.org Validator](https://validator.schema.org/) contra la URL real — el mismo proceso que usás en tus propios proyectos (Empowering People, vbg.de). No se puede validar contra esas herramientas todavía porque el sitio no está público.

## 5. GEO (Generative Engine Optimization)

Agregué `llms.txt` en la raíz del sitio (`/llms.txt`), siguiendo el mismo estándar que implementaste para tu cliente de coaching (Empowering People). Contiene:
- Resumen de una línea (formato blockquote, estándar del spec llms.txt)
- Bio y trayectoria
- Enlaces a tus 3 proyectos principales (AIM, Bizlytics, HCMedic)
- Contacto y link al CV

Esto ayuda a que ChatGPT, Perplexity, Claude y otros asistentes con acceso a la web puedan leer un resumen estructurado de quién sos sin tener que parsear el HTML completo — es literalmente la técnica que vendés en tu libro y aplicás profesionalmente.

**robots.txt**: agregado en la raíz, con bots de IA permitidos explícitamente uno por uno (no solo el wildcard `User-agent: *`), como pediste. Investigué la lista vigente de 2026 antes de escribirlo (fuente abajo). Incluye:
- OpenAI: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`
- Anthropic: `ClaudeBot`, `anthropic-ai`, `Claude-SearchBot`, `Claude-User`
- Perplexity: `PerplexityBot`, `Perplexity-User`
- Google: `Google-Extended` (token de opt-in para entrenamiento de Gemini/AI Overviews, no es un crawler propio)
- Apple: `Applebot-Extended`
- Otros que alimentan datasets de entrenamiento usados por varios modelos: `CCBot` (Common Crawl), `Amazonbot`, `Bytespider`, `cohere-ai`

Todos con `Allow: /`, porque en tu caso el objetivo es visibilidad máxima (opuesto a un medio con contenido pago que quiere bloquear entrenamiento), y termina con la directiva `Sitemap: https://danieldev.me/sitemap.xml`.

**sitemap.xml**: agregado, con la única URL del sitio (es de una sola página) y `lastmod` de hoy.

## 6. Qué NO se tocó (y por qué)

- No agregué FAQPage ni HowTo: no hay contenido de preguntas/respuestas en la landing, hubiera sido schema sin contenido real que lo respalde (mismo criterio que aplicaste vos: no marcar algo que el contenido visible no sustenta).
- No agregué BreadcrumbList: es una página única (single-page), no hay jerarquía de navegación que breadcrumbear.
- No agregué Organization schema separado para Bizlytics/AIM: preferí modelarlos como `worksFor`/`founder` dentro de Person, que es el patrón correcto para "esta persona trabaja en/fundó esta organización" sin necesitar page propia de cada organización en este dominio.

## 7. Próximos pasos recomendados

1. Deploy a danieldev.me (o preview).
2. Correr Google Rich Results Test + Schema.org Validator contra la URL real.
3. Registrar danieldev.me en Google Search Console una vez esté en vivo y enviar el sitemap.

## Fuentes consultadas

- https://aioseo.com/seo-glossary/person-schema-markup/
- https://www.stackmatix.com/blog/person-schema-knowledge-graph
- https://rankai.ai/blog/your-complete-guide-to-author-schema-and-its-seo-impact
- https://eseospace.com/blog/comprehensive-guide-to-google-supported-schema-types/
- https://www.anagram.ai/blog/ai-crawler-user-agent-list-2026-14-bots-and-robotstxt-tokens-to-know
- https://dataimpulse.com/blog/robots-txt-ai-crawlers/
