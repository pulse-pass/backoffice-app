---
description: Accessibility and mobile rules for screens and components
paths:
  - 'src/**/*.tsx'
  - 'src/**/*.css'
---

# Design: accessibility

## Targets and state

- **BAP-001** Touch targets are at least 44 px, made with invisible padding, never a visual change.
- **BAP-002** A `Button` of size `s` keeps `min-h-11`.
- **BAP-003** State is never conveyed by color alone: add `sr-only` text.
- **BAP-004** A loading button keeps its label in the DOM and uses `aria-disabled`, so focus is not lost.
- **BAP-005** The `sr-only` text of a loading `Button` is `loadingLabel` (default "Enviando"; "Carregando" on a load-more button), so a screen reader never announces a submission that is not one.
- **BAP-006** The error `<p>` of `Select` and `Field` is `role="alert"`, so it is announced even when the focus moves in the same render that creates it.

## Labels and focus

- **BAP-007** The password toggle is a plain button whose visible text is its name ("mostrar"/"ocultar", `aria-controls` on the field), never an `aria-label` different from the visible text (WCAG 2.5.3).
- **BAP-008** A horizontally scrolling strip (`overflow-x-auto`) clips the focus outline, so it gets token padding on the clipped sides (`pt-xs`).
- **BAP-009** Keyboard focus is always visible, with the `ink` outline.

## Loading

- **BAP-010** A screen with nothing to show while hydrating or redirecting renders `<div role="status" className="sr-only">Carregando</div>` on the page background, never `null` and never a new visual spinner.
- **BAP-011** The `sr-only` "Carregando" status is only for the first load: a reload or retry keeps the content on screen and uses the `loading` of the retry button.

## Mobile

- **BAP-012** Inputs are 16 px or more, so iOS does not zoom.
- **BAP-013** Use `100dvh` instead of `100vh`.
- **BAP-014** Hover only under `(hover: hover)`; Tailwind's `hover:` already does it.
- **BAP-015** Every field has `autocomplete`.
