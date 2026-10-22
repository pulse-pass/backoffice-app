---
description: Visual identity, tokens, components and motion
paths:
  - 'src/**/*.tsx'
  - 'src/**/*.css'
---

# Design

## Precedence

The Figma file (`zbnAZgE9m0T1nf6HDTDFvw`, pages Fundamentos and Componentes, plus the PNGs in `docs/design/mockups`) is a **guide, not a rule set in stone**. It fixes the identity (palette and the role of each color, the three fonts, the tokens, the component vocabulary and the general composition of each screen), and that identity is kept. Inside it, the better pattern wins: when the mockup conflicts with a good practice from the design skills (`emil-design-eng`, `mobile-native`, `impeccable` audit/craft-floor, `review-animations`, `break-ui`) or with a pattern already established in this project (these rules and the existing components), follow the skill or the project pattern and record the deviation here. Examples already applied: errors as toasts instead of the inline alert, secondary text darkened to WCAG AA, 44 px touch targets.

Order when deciding: project patterns (these rules, existing code) > design skills > mockup details. The identity above never changes because of a skill (DM Mono stays even if a skill dislikes monospace).

## Login deviations

- `/login` follows mockup 01 with two changes: the user is identified by CPF (mask, `autocomplete="username"`, numeric keyboard) instead of the e-mail, and there is no "Esqueci minha senha" link, since no recovery flow exists. The role list of the dark panel is desktop only (as in the 390 px mockup).
- Secondary text on the dark panel uses `text-text-inverse-secondary` (`--color-text-inverse-secondary`, alias of mist, 9:1 on shadow grey) instead of an opacity of the inverse text; `--container-card` (460 px) is the login card width.

## Navigation deviations

- `BackofficeNav` (Figma "Navegação do backoffice", device × role) and `NavItem` (device × active) only list routes that exist: organizer has Eventos, admin has Organizadores; the mockup's Membros, Métricas ao vivo and Auditoria come with their own subtasks, as do the counters and the company data. Both roles have a context card on the desktop sidebar: the admin card is static ("Plataforma · Administração PulsePass"); the organizer card shows the eyebrow "Empresa" and the company name from `/auth/me` (`legal_person.name`, `title-s`, at most three lines, `break-words`), without the mockup's CNPJ line, which the profile does not carry.
- Desktop (from `md`): dark sidebar (`--sidebar-width`, 264 px, `100dvh` sticky), active item in sky aqua with dark text and `aria-current="page"`, focus outline in `text-inverse` on the dark surface. Mobile: light bar with logo, initials and a menu button (44 px, `aria-expanded`, `aria-controls`, Esc and outside click close it and Esc returns focus to the button), with the sections as chips below. The user name falls back to "Conta" and wraps in two lines at most.
- `Logo` has an `inverse` variant (platinum wordmark) for dark surfaces. `PageHeader` (eyebrow + display title) and `EmptyState` (dashed box, one sentence, no promised date) are the base blocks of an area page.

## Colors (light theme)

- Platinum (`bg-page`, `text-inverse`): page background.
- Shadow grey (`text-primary`, `bg-inverse`, `ink`): text, ticket stubs and inverted surfaces.
- Vibrant coral (`action-primary`, `feedback-danger`): the main action and urgency/error. **One coral action per screen.**
- Lemon lime (`accent-live`): real time only, and only as the **background** of dark text, never as text color.
- Sky aqua (`accent-selected`): selection only.
- White (`bg-surface`) for cards and fields; mist (`seat-occupied`) for occupied seats.
- Secondary text uses `text-secondary` (`--color-text-secondary`, solid `#545a66`, 6.1:1 on platinum and 6.9:1 on white): section numerals, eyebrow, hints, terms, pending step and placeholder. Text is never lowered by opacity (`text-text-primary/60` is forbidden); a deliberate deviation from the mockup, whose greys are lighter than WCAG AA allows.
- Borders and fills use `border-subtle`, `border-strong` and `fill-subtle` (alpha of shadow grey).

## Tokens

- Tokens live only in `src/app/globals.css` (`@theme`): `--palette-*`, semantic `--color-*`, `--spacing-2xs..3xl` (4, 8, 12, 16, 24, 32, 48, 64), `--radius-sm|md|full` (2, 6, 999).
- Use them as classes: `bg-bg-page`, `text-text-primary`, `border-border-strong`, `p-md`, `gap-xs`, `rounded-sm`. Never a loose hex, never an arbitrary value when a token exists (an arbitrary `var(--token)` is fine).
- Caution: `--spacing-*` also feeds `max-w-*`/`w-*` named sizes, so `max-w-sm`, `max-w-xl`, `max-w-3xl` resolve to 12, 32 and 64 px. Layout widths are tokens too: `--container-page` (1440 px) and `--column-intro` (340 px), used as `max-w-(--container-page)`; add a new token instead of a loose width.
- Arbitrary values are accepted only for measures taken from the Figma that have no token (icon and logo sizes such as `size-7`, `size-8`, the logo bars and the toast badge `text-base`); spacing and padding always use tokens.
- `--header-height` (56 px mobile, 76 px from `md`) is the public header height.
- Radius is 2 px (`rounded-sm`) on buttons, fields and cards.

## Typography

- Big Shoulders Display Black, uppercase: `display-xl|l|m|s` (104, 72, 56, 40).
- Familjen Grotesk: `title-l|m|s` (SemiBold), `body-l|m|s` (Regular), `label-m` (Medium), `button-m|s` (SemiBold).
- DM Mono: `mono-l|m` (Medium), `mono-s` (Regular), `mono-eyebrow` (Medium, uppercase, 1.2 px tracking).
- These are Tailwind utilities declared in `globals.css` (`@utility`); use them instead of `text-*`/`font-*` combinations.
- `@utility` blocks in `globals.css` never use nested selectors (`&[data-open='true']`, `&:hover`): SonarQube reads them as CSS without a scoping root (`css:S8776`) and fails the quality gate. A state gets its own utility applied with a Tailwind variant (e.g. `motion-menu-panel` plus `data-[open=true]:motion-menu-panel-open`).
- Data (documents, dates, amounts, codes) is always in DM Mono.

## Components and screens

- Notifications are toasts (Sonner, one `<Toaster>` in the root layout, `toast.error`/`toast.success` from `src/lib/toast.tsx`, rendered with the `Toast` component): error in coral with the "!" badge, success in shadow grey with a lemon-lime check; top right on desktop (16 px from the top of the viewport, aligned with the page gutter) and full width at the top on mobile (8 px); the header is not fixed, so the toast never reserves its height; error stays 6 s, success 4 s, both closable. This replaces the inline error alert of the mockups (a deliberate deviation for the whole project).
- Every screen is built with the base components of `src/components/` (`Logo`, `Button`, `Field`, `Toast`, `PublicHeader`, ...) and has a 390 px version besides the 1440 px one.
- New components come from the Figma page "Componentes" and keep the variant names (Button: primary, dark, outline, highlight, outline-inverse × m, s; Field: default, error, empty × text, numeric). A component is only created when a screen uses it.
- Accessibility: touch targets of at least 44 px (invisible padding, never a visual change); state is never conveyed by color alone (`sr-only` text); a loading button keeps its label in the DOM and uses `aria-disabled`, so focus is not lost; the password toggle is a plain button whose visible text is its name ("mostrar"/"ocultar", `aria-controls` on the field), never `aria-label` different from the visible text (WCAG 2.5.3); a `Button` of size `s` keeps `min-h-11`. A horizontally scrolling strip (`overflow-x-auto`) clips the focus outline, so it gets token padding on the clipped sides (`pt-xs`) to give the outline room. A screen with nothing to show while hydrating or redirecting renders a `role="status"` block with `sr-only` "Carregando" and keeps the page background.
- Mobile: inputs at 16 px or more (no iOS zoom), `100dvh` instead of `100vh`, hover only under `(hover: hover)` (Tailwind's `hover:` already does it), `autocomplete` on every field, visible keyboard focus with the `ink` outline.

## Motion (everything off under `prefers-reduced-motion`)

| Element             | Trigger         | Properties                          | Duration       | Easing                                   |
| ------------------- | --------------- | ----------------------------------- | -------------- | ---------------------------------------- |
| Button              | press           | `transform: scale(0.97)`            | 120 ms         | ease-out                                 |
| Button, link, field | hover/focus     | background/border color             | 150 ms         | ease                                     |
| Toast               | enters / leaves | Sonner default (transform, opacity) | Sonner default | Sonner default (respects reduced motion) |
| Field error         | appears         | opacity 0→1                         | 150 ms         | ease-out                                 |
| Button spinner      | submitting      | rotation                            | 700 ms/turn    | linear                                   |
| Toast close button  | hover           | background color                    | 150 ms         | ease                                     |
| Mobile menu panel   | opens           | opacity 0→1, `translateY(-4px→0)`   | 150 ms         | ease-out                                 |
| Mobile menu panel   | closes          | opacity 1→0                         | 100 ms         | ease-out                                 |
| Nav item            | hover/focus     | background color                    | 150 ms         | ease                                     |

Under `prefers-reduced-motion` the spinner is the only exception: it keeps rotating slowly (1.4 s/turn, linear) because it communicates the submitting state. Page changes, the "mostrar" password toggle and the side steps are not animated. Never `transition: all`; never `ease-in`.
