<designdocstart>
# Abhishek — Portfolio Design System
## Neutral Maximalism

The portfolio drops every hue from the previous system (Cohere-derived black/green/navy/coral) and rebuilds it as **pure value-contrast**: zero saturation, two modes, one structural idea pushed hard. "Maximalism" here doesn't mean color — it means density, scale contrast, and layered content (asymmetric work grid, marquee strip, stacked sections, generous icon use). "Neutral" means the entire palette is grayscale; the only color a visitor ever sees is inside real project screenshots, and only when they earn it by hovering.

That trade — restraint in hue, ambition in structure — is the whole thesis. Light mode sits on Neutral 50 with white card surfaces; dark mode inverts onto Neutral 900 with Neutral 800 surfaces. Text is antialiased everywhere. Motion is small, physical, and never a scale transform.

**Signature interaction:** every project thumbnail loads desaturated (`grayscale(1)`) — matching the UI around it — and blooms into full color on hover, with a thin arrow icon sliding in beside the title. The system is monotone until you engage; color becomes a reward, not a default.

**Key Characteristics:**
- Pure grayscale palette (true 0% saturation) across light and dark — no accent hue anywhere in the UI shell.
- Light = Neutral 50 background / White surfaces. Dark = Neutral 900 background / Neutral 800 surfaces.
- Hierarchy built entirely from value, weight, size, and spacing — never color.
- Grayscale-to-color image hover as the one signature, repeatable motion idea.
- No scale-on-hover, anywhere, ever. Hover = color, position, opacity, or border change only.
- Hugeicons stroke-rounded line icons, sized to text, colored `currentColor`.
- Dense, asymmetric work grid (maximalist structure) inside a quiet, disciplined shell (minimal palette).

## Colors

### Light Mode
| Token | Hex | Role |
|---|---|---|
| `--bg` Neutral 50 | `#fafafa` | Page background |
| `--surface` White | `#ffffff` | Cards, nav bar, modals, form fields |
| `--surface-hover` Neutral 100 | `#f5f5f5` | Hover state for list rows, nav links |
| `--ink` Neutral 900 | `#171717` | Primary text, primary button fill |
| `--ink-on-fill` White | `#ffffff` | Text on a Neutral 900 button |
| `--muted` Neutral 600 | `#525252` | Secondary copy, captions (AA-safe over white) |
| `--faint` Neutral 400 | `#a3a3a3` | Placeholder text, disabled states |
| `--border` Neutral 200 | `#e5e5e5` | Card borders, dividers, input borders |
| `--border-strong` Neutral 300 | `#d4d4d4` | Hover border, active dividers |

### Dark Mode
| Token | Hex | Role |
|---|---|---|
| `--bg` Neutral 900 | `#171717` | Page background |
| `--surface` Neutral 800 | `#262626` | Cards, nav bar, modals, form fields |
| `--surface-hover` Neutral 700 | `#404040` | Hover state for list rows, nav links |
| `--ink` Neutral 50 | `#fafafa` | Primary text, primary button fill |
| `--ink-on-fill` Neutral 900 | `#171717` | Text on a Neutral 50 button |
| `--muted` Neutral 400 | `#a3a3a3` | Secondary copy, captions |
| `--faint` Neutral 600 | `#525252` | Placeholder text, disabled states |
| `--border` Neutral 700 | `#404040` | Card borders, dividers, input borders |
| `--border-strong` Neutral 600 | `#525252` | Hover border, active dividers |

### Semantic — still grayscale
No red/green/blue anywhere. States are communicated with icon, copy, border style, and opacity:
- **Focus ring:** 2px solid `--ink`, 2px offset. No glow color.
- **Empty / "coming soon":** dashed `--border-strong`, icon at 50% opacity, label in Mono.
- **Disabled:** 40% opacity, `cursor: not-allowed`, no fill change.
- **Error (forms only):** `--ink` text + an alert-triangle Hugeicon, never red. If a future brief requires red, isolate it strictly to validation states — never decorative UI.

### Why no accent hue
The previous system spent color on coral chips and blue links. This system spends it nowhere — the brand differentiator is doing more with less. The only "accent" is the grayscale→color reveal on real screenshots, which makes the work itself the most saturated thing on the page.

## Typography

### Font Family
- **Display:** `Geist`, fallback `Inter Tight`, `ui-sans-serif`, `system-ui` — variable weight, used at large sizes with negative tracking.
- **Body/UI:** `Inter`, fallback `ui-sans-serif`, `system-ui`, `-apple-system` — variable weight.
- **Mono (labels/tags/dates):** `Geist Mono`, fallback `JetBrains Mono`, `ui-monospace`, `SFMono-Regular`.
- Both Geist and Inter ship as single variable-font files (one `font-weight` axis) — two `.woff2` requests total for the whole type system.

### Antialiasing (required globally)
```css
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

### Hierarchy
| Role | Font | Size (desktop → mobile, `clamp()`) | Weight | Line Height | Tracking | Notes |
|---|---|---|---:|---:|---:|---|
| Hero Display | Geist | `clamp(2.75rem, 6vw, 5.5rem)` | 500 | 1.02 | -0.03em | One per page, the hero statement only |
| Section Heading | Geist | `clamp(2rem, 4vw, 2.75rem)` | 500 | 1.1 | -0.02em | Work, About, Capabilities, Contact headers |
| Card Heading | Geist | 22px | 500 | 1.3 | -0.01em | Project titles, capability titles |
| Body Large | Inter | 18px | 400 | 1.55 | 0 | Hero subtext, section intros |
| Body | Inter | 16px | 400 | 1.6 | 0 | Default copy |
| Caption | Inter | 14px | 400 | 1.45 | 0 | Card descriptions, footer text |
| Mono Label | Geist Mono | 13px | 500 | 1.4 | 0.04em | Uppercase eyebrows, tags, dates, role labels |
| Micro | Inter | 12px | 400 | 1.4 | 0 | Legal, copyright, nav microcopy |

### Principles
- One oversized headline per page (the hero). Everything else stays 16–28px — restraint protects the maximalist structure from feeling loud.
- Mono Label is the system's only "decorative" device — use it for eyebrows, project role tags (`LAW FIRM`, `E-COMMERCE`, `CONSTRUCTION`), and status (`COMING SOON`). It is the structural device that replaces color-coding.
- Never use a numbered sequence (`01 / 02 / 03`) unless the content is an actual ordered process — the Process strip (Discover → Build → Ship) qualifies; the work grid does not.
- Weight does most of the hierarchy work: 500 for headings, 400 for everything else. Avoid 600+ outside of the hero.

## Layout

### Spacing Scale
8px base: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192`.

### Grid & Container
- Max content width: `1280px`, with `clamp(20px, 5vw, 64px)` side gutters.
- 12-column grid, `24px` column gap, used for the work grid and capabilities grid.
- Nav: three-zone — wordmark left, links centered (desktop only), theme toggle + CTA right.
- Hero: single centered column, max-width `820px` for the headline, full-bleed below it.
- Work grid: **asymmetric bento** — first project spans 7/12 columns, second spans 5/12, third spans full 12, then the two empty slots split 6/12 each. This is the maximalist move: real variation in card size signals real variation in project scope, while every card still uses the same component.
- Capabilities: 4-column on desktop, collapsing to 2 then 1.
- Contact: 2-column — copy + form left, contact-card + map-free address block right.

### Whitespace Philosophy
Sections are dense internally (rich cards, icon rows, mono tags) but separated by large vertical intervals (`128–192px` between major sections). Density lives inside components; air lives between them.

## Elevation & Depth
Flat-first, same as the source system, but shadows are kept nearly invisible to avoid muddying a grayscale UI.

| Level | Light Mode | Dark Mode | Use |
|---|---|---|---|
| Flat | none | none | Hero, section backgrounds, body text |
| Bordered | 1px `--border` | 1px `--border` | Cards, inputs, dividers |
| Soft Lift | `0 1px 2px rgba(0,0,0,.04)` | `0 1px 0 rgba(255,255,255,.03) inset` | Nav bar on scroll, dropdowns |
| Media Lift | rounded image, no shadow, contrast from surrounding surface only | same | Project thumbnails, about portrait |

## Shapes

### Radius Scale
| Token | Value | Role |
|---|---:|---|
| `xs` | 6px | Tags, badges, small icons containers |
| `sm` | 10px | Buttons, inputs, mono-label pills |
| `md` | 16px | Capability cards, contact card |
| `lg` | 24px | Project cards, portrait image |
| `pill` | 999px | Primary CTA, theme toggle, nav pill links |

### Image Treatment
All project and portrait imagery sits in `lg` (24px) rounded containers with a hairline `--border`. Default filter: `grayscale(1) contrast(1.05)`. No image is ever cropped via a scale transform on hover — only the filter and an icon shift.

## Components

### `nav-bar`
Sticky, transparent at top of page; gains `--surface` background, 1px bottom `--border`, and Soft Lift shadow after 80px of scroll (class toggle, not animated per-frame). Wordmark in Mono Label, links in Body, theme toggle as an icon-only pill button, single CTA (`Contact`) as `button-primary`.

### `theme-toggle`
24px icon button, sun/moon Hugeicon swap, instant on click with a 200ms cross-fade of `--bg`/`--surface`/`--ink` custom properties. Persisted via storage; respects system preference on first visit only.

### `button-primary`
Solid `--ink` fill, `--ink-on-fill` text, `pill` radius, `14px 28px` padding, Body weight 500. Hover: background wipes 8% lighter/darker via a pseudo-element clip-path sweep left-to-right (180ms) — never a scale.

### `button-secondary`
Text-only, Body weight 500, with a 1px underline that grows from 0% to 100% width on hover (`transform-origin: left`, 220ms ease-out). Used for "View project," "See all work."

### `hero-statement`
Centered headline (Hero Display) + one line of Body Large + two CTAs. Entrance: headline lines split and stagger in (translateY 24px → 0, opacity 0 → 1).

### `marquee-strip`
Full-bleed row of Mono Label tech-stack tags (`NEXT.JS · REACT · NODE · GSAP · POSTGRES …`), looping via continuous `translateX`, duplicated content for a seamless wrap, pauses on hover/focus.

### `project-card`
The signature component. Rounded `lg` image (grayscale default), Mono Label role tag above the title, Card Heading title, Caption description (2 lines, real copy — see Known Gaps), arrow-up-right Hugeicon that's `opacity: 0` at rest and slides in (`translateX: -4px → 0`, `opacity: 0 → 1`) on hover alongside the image's grayscale-to-color bloom.

### `project-card-empty`
Identical footprint to `project-card` so the grid doesn't reflow when filled later. Dashed `--border-strong`, centered Hugeicon (`clock-01` or `add-square`) at 50% opacity, Mono Label "IN PROGRESS," no link, `cursor: default`.

### `capability-card`
Unboxed (no border) — a Hugeicon, Card Heading, and Caption stacked, separated from siblings by a thin top rule only. Mirrors the source system's "not every section is a card" principle.

### `process-strip`
Three steps only because it's a real sequence: `01 Discover → 02 Build → 03 Ship`. Mono numerals, thin connecting rule, Card Heading per step, Caption description.

### `contact-card`
Rounded `md` surface, `--border`, stacked rows (mail, location) each with a 20px Hugeicon + Body text, social icon row at the bottom (Hugeicons: linkedin, github, mail, new-twitter), all `currentColor`.

### `footer`
`--surface` background, 1px top `--border`, mirrors the nav's CTA for symmetry, Micro-size legal line, back-to-top icon button (`arrow-up-01`).

## Do's and Don'ts

### Do
- Keep the palette at true 0% saturation — check every custom color value before adding it.
- Let real screenshots be the only colorful thing on the page, and only on hover.
- Vary work-grid card spans to signal real project scope (maximalist structure).
- Use Mono Label as the structural/status device everywhere color would have been used before.
- Keep shadows nearly invisible; let borders and surface-value contrast do the separating.

### Don't
- Don't introduce any hue — not even a "subtle" blue link or green success state.
- Don't scale anything on hover. Ever. Use filter, position, opacity, or border instead.
- Don't box every section in a card; some content (capabilities, process) should sit unframed.
- Don't use a numbered sequence unless the content is a true ordered process.
- Don't let the empty project slots collapse the grid — they hold their span until filled.

## Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---:|---|
| Mobile | <640px | Single column everywhere, hamburger nav, hero clamps to 44px, marquee speed reduced |
| Tablet | 640–1024px | Work grid collapses to 2 spans (7/12+5/12 stack), capabilities go 2-column |
| Desktop | 1024–1440px | Full bento work grid, 4-column capabilities, centered nav links visible |
| Large Desktop | >1440px | Container caps at 1280px; extra space becomes side gutter, not wider content |

### Collapsing Strategy
- Nav: centered links hide under 1024px, replaced by a hamburger (`menu-01` / `cancel-01` Hugeicons) opening a full-height panel.
- Work grid: asymmetric spans (7/5/12/6/6) collapse to a single column in source order on mobile.
- Contact: 2-column drops to stacked, form first, contact-card second.

## Iteration Guide
1. Start every section on `--bg`; only cards and the nav use `--surface`.
2. Use `button-primary` once per view (one highest-priority action); everything else is `button-secondary`.
3. Apply the grayscale→color hover to every real photograph; never apply it to icons or UI chrome.
4. New project added later → duplicate `project-card`, keep `project-card-empty` styling until real content exists, don't invent placeholder screenshots.
5. If a future page needs more than one hero-scale headline, that's a sign it should be two sections, not one louder one.

## Known Gaps — content needed from Abhishek
- Final hero headline/subtext copy.
- About section bio copy + a portrait photo (treated with the same grayscale-hover image style).
- Confirmed project screenshots for VSV Legal Chambers, TechBar, and AC BuildTech (current copy below is derived from each live site).
- Resume link, email, and confirmed social handles for the contact card and footer.
- Real titles/scope for the two empty slots (currently labeled "CRM" and "Factory Agentic System") once ready to publish.

### Drafted project copy (for `project-card`)
| Project | Role tag | Description |
|---|---|---|
| VSV Legal Chambers | LAW FIRM | Multi-office site for Advocate Vivek Sharma Vats, Punjab & Haryana High Court — practice-area pages, consultation booking, and a blog, built on Next.js. |
| TechBar | E-COMMERCE | Next.js storefront for a Portugal-based electronics retailer — category browsing, cart, Klarna pay-later, and in-store repair booking. |
| AC BuildTech | CONSTRUCTION | Corporate site for a construction company — a 15+ project portfolio across residential, commercial, and hospitality builds, services, and team pages. |
| CRM | IN PROGRESS | Reserved — same card footprint, no link, dashed border. |
| Factory Agentic System | IN PROGRESS | Reserved — same card footprint, no link, dashed border. |
<designdocend>