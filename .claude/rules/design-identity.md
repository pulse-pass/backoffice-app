---
description: Visual identity, precedence, colors, tokens and typography
paths:
  - 'src/**/*.tsx'
  - 'src/**/*.css'
  - 'src/app/icon.svg'
---

# Design: identity

## Precedence

- **BAP-040** The Figma file (`zbnAZgE9m0T1nf6HDTDFvw`, pages Fundamentos and Componentes, plus the PNGs in `docs/design/mockups`) is a guide, not a rule set in stone.
- **BAP-041** It fixes the identity: palette and the role of each color, the three fonts, the tokens, the component vocabulary and the general composition of each screen. That identity is kept.
- **BAP-042** Inside the identity, the better pattern wins: when the mockup conflicts with a design skill or an established project pattern, follow the skill or the pattern.
- **BAP-043** The design skills are `emil-design-eng`, `mobile-native`, `impeccable` (audit/craft-floor), `review-animations` and `break-ui`.
- **BAP-044** Record each deviation from the mockup in the `design-*` file of its screen.
- **BAP-045** Order when deciding: project patterns (these rules, existing code) > design skills > mockup details.
- **BAP-046** The identity never changes because of a skill (DM Mono stays even if a skill dislikes monospace).

## Colors (light theme)

- **BAP-047** Platinum (`bg-page`, `text-inverse`) is the page background.
- **BAP-048** Shadow grey (`text-primary`, `bg-inverse`, `ink`) is for text, ticket stubs and inverted surfaces.
- **BAP-049** Vibrant coral (`action-primary`, `feedback-danger`) is the main action and urgency/error.
- **BAP-050** One coral action per screen.
- **BAP-051** Lemon lime (`accent-live`) is real time only, and only as the background of dark text, never as text color.
- **BAP-052** Sky aqua (`accent-selected`) is selection only.
- **BAP-053** White (`bg-surface`) is for cards and fields; mist (`seat-occupied`) is for occupied seats.
- **BAP-054** Secondary text uses `text-secondary` (`--color-text-secondary`, solid `#545a66`, 6.1:1 on platinum and 6.9:1 on white): section numerals, eyebrow, hints, terms, pending step and placeholder.
- **BAP-055** Text is never lowered by opacity (`text-text-primary/60` is forbidden); the mockup greys are lighter than WCAG AA allows, a deliberate deviation.
- **BAP-056** Borders and fills use `border-subtle`, `border-strong` and `fill-subtle` (alpha of shadow grey).
- **BAP-057** `fill-muted` (solid `#545a66`) is the mid grey of graded fills, such as the progress bars of the current step.
- **BAP-058** Text tokens are never used as fills and background tokens never as borders.

## Tokens

- **BAP-059** Tokens live only in `src/app/globals.css` (`@theme`): `--palette-*`, semantic `--color-*`, `--spacing-2xs..3xl` (4, 8, 12, 16, 24, 32, 48, 64), `--radius-sm|md|full` (2, 6, 999).
- **BAP-060** Use tokens as classes (`bg-bg-page`, `text-text-primary`, `border-border-strong`, `p-md`, `gap-xs`, `rounded-sm`).
- **BAP-061** Never a loose hex, and never an arbitrary value when a token exists (an arbitrary `var(--token)` is fine).
- **BAP-062** `--spacing-*` also feeds `max-w-*`/`w-*` named sizes, so `max-w-sm`, `max-w-xl` and `max-w-3xl` resolve to 12, 32 and 64 px.
- **BAP-063** Layout widths are tokens too (`--container-page`, `--column-intro`), used as `max-w-(--container-page)`; add a new token instead of a loose width.
- **BAP-064** Arbitrary values are accepted only for Figma measures with no token (icon and logo sizes such as `size-7`, the logo bars, the toast badge `text-base`); spacing and padding always use tokens.
- **BAP-066** Radius is 2 px (`rounded-sm`) on buttons, fields and cards.
- **BAP-067** The tab icon is `src/app/icon.svg` and `src/app/apple-icon.png` (the `Logo` bars on a rounded Shadow Grey square), with no `favicon.ico`.
- **BAP-068** The icon files are the only place with hex literals, since they cannot read CSS tokens.

## Typography

- **BAP-069** Big Shoulders Display Black, uppercase: `display-xl|l|m|s` (104, 72, 56, 40).
- **BAP-070** Familjen Grotesk: `title-l|m|s` (SemiBold), `body-l|m|s` (Regular), `label-m` (Medium), `button-m|s` (SemiBold).
- **BAP-071** DM Mono: `mono-l|m` (Medium), `mono-s` (Regular), `mono-eyebrow` (Medium, uppercase, 1.2 px tracking).
- **BAP-072** These are Tailwind utilities declared in `globals.css` (`@utility`); use them instead of `text-*`/`font-*` combinations.
- **BAP-073** `@utility` blocks in `globals.css` never use nested selectors (`&[data-open='true']`, `&:hover`): SonarQube reads them as CSS without a scoping root (`css:S8776`) and fails the gate.
- **BAP-074** A state gets its own utility applied with a Tailwind variant (`motion-menu-panel` plus `data-[open=true]:motion-menu-panel-open`).
- **BAP-075** Data (documents, dates, amounts, codes) is always in DM Mono.
