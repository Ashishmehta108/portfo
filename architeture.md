# Portfolio Architecture
## How it's built, file by file, task by task

Companion to `design.md`. This file is the build spec — stack choices, file structure, exact CSS/JS mechanics, every animation's numbers, the icon list, and a sequential task checklist. Read `design.md` for *what it should look like*; read this for *how it gets made*.

## 1. Stack & Rationale

| Layer | Choice | Why |
|---|---|---|
| Markup | Plain HTML5, single page (`index.html`) | Portfolio is one scroll, no router needed — avoids framework weight entirely |
| Styles | Plain CSS, split into 5 files, custom properties for theming | No preprocessor/build step; cascade stays predictable with the file split below |
| Motion | GSAP 3 core + ScrollTrigger, via CDN `<script defer>` | Smallest reliable cross-browser animation engine; ScrollTrigger batches scroll-reveals cheaply |
| Icons | Hugeicons, Stroke Rounded style, free tier | One inline SVG `<symbol>` sprite, referenced via `<use>` — single request, `currentColor`-friendly, no icon font weight |
| Fonts | Geist + Inter (variable), Geist Mono | Two-file font system (see design.md), self-hosted `.woff2` in `/assets/fonts` to avoid a third-party font-CDN request |
| Build step | None | Static files served as-is; deploy directly to Vercel/Netlify/Cloudflare Pages/GitHub Pages |

No npm, no bundler. This is intentional — "lightweight" means the total page weight stays under ~250KB (fonts + sprite + CSS + JS), not "no animation."

## 2. File Structure

```
/portfolio
├── index.html
├── README.md
├── /css
│   ├── tokens.css         ← custom properties, light + dark, both themes
│   ├── base.css            ← reset, antialiasing, typography defaults
│   ├── layout.css          ← grid, container, section spacing
│   ├── components.css      ← nav, buttons, cards, footer, etc.
│   └── animations.css      ← @keyframes for marquee + reduced-motion overrides
├── /js
│   ├── main.js              ← entry point, DOM ready, wires everything below
│   ├── theme.js             ← dark/light toggle + persistence
│   ├── motion.js             ← all GSAP timelines and ScrollTriggers
│   └── projects-data.js     ← single source of truth for work-grid content
├── /assets
│   ├── icons.svg            ← Hugeicons sprite (all <symbol> defs, hidden)
│   ├── favicon.svg
│   ├── /fonts                ← Geist.woff2, GeistMono.woff2, Inter.woff2
│   └── /images
│       └── /projects
│           ├── vsv-legal.jpg
│           ├── techbar.jpg
│           └── acbuildtech.jpg
```

**Why split CSS into 5 files instead of 1:** `tokens.css` isolates every color/spacing value so swapping themes never touches selectors. `base.css` vs `components.css` keeps element-selectors (`h1`, `a`, `button`) from fighting class-selectors (`.project-card`) — the exact specificity trap the design-skill guidance warns about (`.section` vs `.cta` clashes on padding/margin). Component rules always win because they load after base rules, with equal specificity.

## 3. Design Tokens (`tokens.css`)

```css
:root {
  --bg: #fafafa; --surface: #ffffff; --surface-hover: #f5f5f5;
  --ink: #171717; --ink-on-fill: #ffffff;
  --muted: #525252; --faint: #a3a3a3;
  --border: #e5e5e5; --border-strong: #d4d4d4;

  --radius-xs: 6px; --radius-sm: 10px; --radius-md: 16px;
  --radius-lg: 24px; --radius-pill: 999px;

  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
  --space-9: 96px; --space-10: 128px; --space-11: 192px;

  --ease-out: cubic-bezier(.16,.84,.44,1);
  --shadow-soft: 0 1px 2px rgba(0,0,0,.04);
}

[data-theme="dark"] {
  --bg: #171717; --surface: #262626; --surface-hover: #404040;
  --ink: #fafafa; --ink-on-fill: #171717;
  --muted: #a3a3a3; --faint: #525252;
  --border: #404040; --border-strong: #525252;
  --shadow-soft: 0 1px 0 rgba(255,255,255,.03) inset;
}
```
Every other CSS file reads only these variables — no hex codes anywhere else in the codebase.

## 4. Theming System (`theme.js`)

1. On load: read `localStorage.getItem('theme')`.
2. If unset, fall back to `window.matchMedia('(prefers-color-scheme: dark)').matches` **once**, then write that result to storage — after this, the user's explicit choice always wins over system preference.
3. Apply `document.documentElement.setAttribute('data-theme', value)` before first paint (inline `<script>` in `<head>`, not deferred) to avoid a flash of the wrong theme.
4. Toggle button click: flip value, re-apply attribute, save to storage, swap the sun/moon `<use href>` target.
5. CSS transition on `--bg`/`--surface`/`--ink` consumers: `transition: background-color .2s var(--ease-out), color .2s var(--ease-out), border-color .2s var(--ease-out)` scoped to `body, .surface, .border-el` — not a universal `*` transition (that would tax scroll performance).

## 5. Icon System (`icons.svg`)

Build one sprite file, inlined at the top of `<body>`:
```html
<svg style="display:none" aria-hidden="true">
  <symbol id="hi-arrow-up-right" viewBox="0 0 24 24">...</symbol>
  <symbol id="hi-menu" viewBox="0 0 24 24">...</symbol>
  ...
</svg>
```
Usage anywhere: `<svg class="icon" width="20" height="20"><use href="#hi-arrow-up-right"/></svg>`. `.icon { color: currentColor; stroke: currentColor; fill: none; }` so every icon inherits its parent's text color automatically — no per-icon color CSS, ever.

**Icon list to pull from Hugeicons (Stroke Rounded), with usage:**
| Icon (Hugeicons name) | Used in |
|---|---|
| `menu-01` / `cancel-01` | Mobile nav open/close |
| `sun-03` / `moon-02` | Theme toggle |
| `arrow-up-right-01` | Project card external link |
| `arrow-up-01` | Footer back-to-top |
| `mail-01` | Contact card, footer |
| `call` | Contact card (if phone is provided) |
| `location-01` | Contact card |
| `linkedin-01`, `github`, `new-twitter` | Social row |
| `clock-01` or `add-square` | Empty project-card placeholder |
| `code-01` | "Web Apps" capability |
| `shopping-cart-01` | "E-commerce" capability |
| `ai-brain-01` or `robot-01` | "AI & Agentic Systems" capability |
| `database-01` | "CRM / Operations Tools" capability |
| `alert-triangle` | Form validation states only |

## 6. Animation System (`motion.js`)

```js
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
gsap.registerPlugin(ScrollTrigger);
if (reduceMotion) gsap.globalTimeline.timeScale(50); // collapses durations near-instantly
```

| Trigger | Target | Properties | Duration | Ease | Notes |
|---|---|---|---|---|---|
| Page load | `.hero-line` (split per line) | `y: 24 → 0, opacity: 0 → 1`, stagger 0.08s | 0.8s | `power3.out` | Headline only, runs once |
| Scroll into view | `.reveal` (sections, cards) | `y: 24 → 0, opacity: 0 → 1` | 0.6s | `power2.out` | Use `ScrollTrigger.batch()`, not one trigger per element — keeps it to a handful of triggers instead of dozens |
| Card hover | `.project-card img` | `filter: grayscale(1) → grayscale(0)` | 0.35s | `power2.out` | `gsap.quickTo()` per card for cheap repeat-hover performance |
| Card hover | `.project-card .icon` | `x: -4 → 0, opacity: 0 → 1` | 0.3s | `power2.out` | Runs alongside the image filter, same trigger |
| Card unhover | both above | reverse | 0.3s | `power2.out` | — |
| Button hover | `.btn-primary::after` (pseudo, clip-path) | `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` | 0.18s | `power1.out` | No transform, no scale |
| Nav scroll | `.nav` class toggle | `background-color`, `box-shadow`, `border-color` | 0.2s | CSS transition, not GSAP | Plain `scroll` listener with a 80px threshold + `requestAnimationFrame` throttle — cheaper than ScrollTrigger for a binary class toggle |
| Marquee | `.marquee-track` | `x: 0 → -50%`, infinite | 24s linear | none (linear) | Content duplicated ×2 for seamless loop; `animation-play-state: paused` on `:hover`/`:focus-within` |
| Theme toggle | `--bg/--surface/--ink` consumers | color crossfade | 0.2s | CSS transition | Defined in `tokens.css`, not GSAP |

**Reduced motion fallback (`animations.css`):**
```css
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
  .reveal { opacity: 1 !important; transform: none !important; }
}
```

## 7. Data-Driven Work Grid (`projects-data.js`)

```js
export const projects = [
  { title: "VSV Legal Chambers", tag: "LAW FIRM",
    desc: "Multi-office site for a Punjab & Haryana High Court advocate — practice areas, consultation booking, and a blog.",
    image: "assets/images/projects/vsv-legal.jpg",
    link: "https://www.vsvlegalchambers.com/", status: "live", span: 7 },
  { title: "TechBar", tag: "E-COMMERCE",
    desc: "Next.js storefront for a Portugal-based electronics retailer — categories, cart, Klarna pay-later, repair booking.",
    image: "assets/images/projects/techbar.jpg",
    link: "https://www.techbar.store/", status: "live", span: 5 },
  { title: "AC BuildTech", tag: "CONSTRUCTION",
    desc: "Corporate site for a construction company — 15+ project portfolio, services, and team pages.",
    image: "assets/images/projects/acbuildtech.jpg",
    link: "https://acbuildtechltd.com/", status: "live", span: 12 },
  { title: "CRM", tag: "IN PROGRESS", status: "soon", span: 6 },
  { title: "Factory Agentic System", tag: "IN PROGRESS", status: "soon", span: 6 },
];
```
`main.js` maps this array into `.project-card` (status `live`) or `.project-card-empty` (status `soon`) markup at runtime. **Adding a real project later is a one-line edit**: change `status: "soon"` to `"live"` and fill in `desc`/`image`/`link` — no markup or CSS changes required, since both card types share the same grid cell and base class.

## 8. Performance Checklist

- Images: `loading="lazy"` on every project/portrait image except the hero (none in hero by design); serve at 2x the rendered card width, JPEG/WebP.
- `aspect-ratio` set on every image container so empty cards reserve identical space to filled ones — zero layout shift when CRM/Factory cards go live.
- Fonts: `font-display: swap`; preload only the Geist display weight used in the hero (`<link rel="preload" as="font">`); Inter/Geist Mono load normally.
- GSAP/ScrollTrigger script tags use `defer`; `motion.js` waits for `DOMContentLoaded`.
- `ScrollTrigger.batch()` for all `.reveal` elements instead of one instance per element — keeps trigger count low on a content-dense (maximalist) page.
- No `*` selector transitions; transitions scoped to the specific properties/elements listed in §6.

## 9. Accessibility Checklist

- Contrast: `--muted` (Neutral 600, `#525252`) on white = ~7.5:1 — safe for body-size secondary text. Do not substitute Neutral 500 for small text; it sits closer to 4.6:1, fine for large text only.
- Every icon-only control (`theme-toggle`, hamburger, social links) gets `aria-label`.
- Focus-visible ring: `box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--ink)` — never remove `:focus` outlines, only restyle them.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<section aria-label="...">` per section, `<footer>`.
- Alt text on project images describes the site, not the filename (e.g., `"VSV Legal Chambers homepage, dark hero with advocate portrait"`).
- `prefers-reduced-motion` fully respected (see §6).

## 10. Sequential Build Checklist

1. Scaffold the file tree from §2; empty CSS/JS files with the header comments only.
2. Write `tokens.css` (§3) — both `:root` and `[data-theme="dark"]`.
3. Write `base.css`: CSS reset, `box-sizing: border-box`, antialiasing rule, base `body` typography (Inter, `--ink` on `--bg`).
4. Build the Hugeicons sprite (`icons.svg`) with only the icons listed in §5 — no unused symbols.
5. Markup + style the `nav-bar`: wordmark, desktop links, theme-toggle button, CTA, mobile hamburger (hidden >1024px).
6. Wire `theme.js`: inline flash-prevention script in `<head>`, toggle logic, storage.
7. Build the `hero-statement`: markup, `layout.css` centering rules, then the load-in timeline in `motion.js` (§6 row 1).
8. Build `marquee-strip`: duplicate the tag list in markup, CSS `@keyframes` loop, hover-pause.
9. Build `projects-data.js`, then the work-grid renderer in `main.js`, then `project-card` / `project-card-empty` styles in `components.css` (bento spans from `design.md` §Layout).
10. Wire the grayscale-hover + icon-slide GSAP behavior per card (§6 rows 3–4), using `quickTo` for performance.
11. Build `about` section: portrait (same grayscale-hover treatment as project images), bio copy block (placeholder until content arrives — see `design.md` Known Gaps), quick-facts list.
12. Build `capabilities` grid: 4 unboxed cards, icons from §5.
13. Build `process-strip`: three numbered steps, connecting rule.
14. Build `contact` section: form (name/email/message — no backend wired yet, `action` left as a TODO comment), `contact-card` with icon rows + socials.
15. Build `footer`: mirrored CTA, legal Micro text, back-to-top button.
16. Apply `ScrollTrigger.batch()` to every `.reveal` element across sections (§6 row 2).
17. Add `prefers-reduced-motion` overrides (`animations.css`) and verify with OS-level reduced-motion toggled on.
18. QA pass: keyboard-only navigation through nav/cards/form/footer; Lighthouse run (target 95+ performance/accessibility); contrast check on `--muted`/`--faint` in both themes; test at 375px, 768px, 1024px, 1440px.
19. Drop in real project screenshots and bio content once received (§ Known Gaps in `design.md`); flip the two placeholder cards to `status: "live"` when CRM and the factory agentic system are ready.

## 11. Deployment

Static output, zero build step — push the `/portfolio` folder as-is to Vercel, Netlify, Cloudflare Pages, or GitHub Pages. No environment variables, no server. The contact form (`action` TODO in step 14) is the only piece that eventually needs a backend or a form service (e.g., a serverless endpoint or a forms provider) — everything else ships exactly as written.