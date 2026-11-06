---
description: Base components, toasts and component vocabulary
paths:
  - 'src/**/*.tsx'
  - 'src/**/*.css'
---

# Design: components

## General

- **BAP-016** Every screen is built with the base components of `src/components/` (`Logo`, `Button`, `Field`, `Toast`, `PublicHeader`, ...) and has a 390 px version besides the 1440 px one.
- **BAP-017** New components come from the Figma page "Componentes" and keep its variant names (Button: primary, dark, outline, highlight, outline-inverse × m, s; Field: default, error, empty × text, numeric).
- **BAP-018** A component, or one of its states, is only created when a screen uses it.
- **BAP-019** `Logo` has an `inverse` variant (platinum wordmark) for dark surfaces.
- **BAP-020** `PageHeader` (eyebrow + display title) is the base block of an area page.
- **BAP-021** `DotRow` is the shared dot row of the dark blocks (login panel and `/situacao` hero).

## Toast

- **BAP-022** Notifications are toasts: one Sonner `<Toaster>` in the root layout, `toast.error`/`toast.success` from `src/lib/toast.tsx`, rendered with the `Toast` component.
- **BAP-023** Error toast is coral with the "!" badge; success is shadow grey with a lemon-lime check.
- **BAP-024** Position is top right on desktop (16 px from the viewport top, aligned with the page gutter) and full width at the top on mobile (8 px). The header is not fixed, so the toast never reserves its height.
- **BAP-025** An error toast stays 6 s, a success toast 4 s, both closable.
- **BAP-026** Toasts replace the inline error alert of the mockups, a deliberate deviation for the whole project.

## Status and feedback

- **BAP-027** `StatusBadge` ("Selo de situação") has `status`: pending, approved, rejected, deleted; light surface by default, `inverse` on dark surfaces. It is a `span`, so it can live inside a button.
- **BAP-028** `TimelineStep` ("Etapa da linha do tempo") has `state`: done, current, rejected, pending.
- **BAP-029** `EmptyState` has an optional `title` (an `h2` or the `titleAs` level) and `action` below the message.
- **BAP-030** `EmptyState` with a message only is the compact centered box; with title or action it is the left-aligned card on `bg-surface`, on purpose.
- **BAP-031** `Alert` ("Alerta", prop `type`) has only `danger`: coral surface, dark round "!" badge, `title-s` title as `h3` or the `titleAs` level, `body-s` text.
- **BAP-032** `Alert` is focusable with `tabIndex={-1}`, so a confirmation can take the focus.
- **BAP-033** `Alert` is a `div role="group"` (a `section` with a label would become a landmark), labelled by the title and described by the text, so focusing it reads both.
- **BAP-034** `Alert` is static: to animate a confirmation, animate a wrapper that holds the alert and its buttons (`animate-alert-in`), so the focused alert does not move alone.

## Inputs and lists

- **BAP-035** `Tabs` ("Aba"): `role="tablist"`, `aria-selected`, roving `tabIndex`, arrows/Home/End select, coral underline on the active tab, generic over the value type.
- **BAP-036** `SearchField` is the "Campo" variant with a magnifier, `type="search"` and an accessible `aria-label`.
- **BAP-037** `OrganizerRow` is the Figma "Linha de organizador" (device × selected).
- **BAP-038** `Select` is the Figma "Campo" as a native `<select>`: same label, `hint`, `error`, border and focus as `Field`, arrow like `StatusFilter`, empty option with the placeholder, 44 px minimum height, 16 px text, `ref` as a prop.
- **BAP-039** A disabled `Select` dims the whole container, label and arrow included, with `has-[:disabled]:opacity-50`.
