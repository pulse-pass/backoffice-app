---
description: Pages, containers, views and base components
paths:
  - 'src/app/**'
  - 'src/components/**'
  - 'src/layouts/**'
---

# TypeScript: pages and components

## Pages

- **BAP-280** `page.tsx` is the client container (`'use client'`) and holds only the state and the handlers (`handleChange`, `handleBlur`, `handleSubmit`...).
- **BAP-281** Validation, masks and request mapping come from the form object and API calls from `<resource>Api`; a page never parses an error by itself.
- **BAP-282** A page has a single `useState`: one object grouped by context and typed as `<Page>PageState` in `page.types.ts` (`{ form: { data, errors, touched }, submission: { isSubmitting } }`).
- **BAP-283** Update it with the functional form `setState((current) => ...)`, so related fields change together.
- **BAP-284** DOM refs and synchronous guards (double-submit lock) stay in `useRef`.
- **BAP-285** Values an async handler needs fresh when its response arrives (the current filter, the applied search) are mirrored in refs, never read from the state captured when the handler started.
- **BAP-286** `page.types.ts` exists in every route whose `page.tsx` has state and holds, in this order: `<Page>PageState`, `PageViewProps`, and the props shared by more than one route component, in screen order (`SectionProps<T>` in `/cadastro`).
- **BAP-287** Props used by a single component stay in that component file; routes without state (`/`, the empty areas) have no `page.types.ts`.
- **BAP-288** `PageView.tsx` is the presentation: it receives all data and callbacks by props, holds no state beyond what is purely visual, and never calls a service.
- **BAP-289** A screen is built only with base components (`src/components/`) and route components (`app/<route>/components/`).

## Components and containers

- **BAP-290** A component never receives a flag about where it is placed (`isScrollable`, `isSide`, `isInline`) to change its own layout.
- **BAP-291** Placement concerns (sticky, scroll, focusable scroll container) belong to the wrapper the parent renders around the component.
- **BAP-292** `src/components/` holds only visual components: everything comes in by props.
- **BAP-293** They never read a store, call an API or use `useRouter`/`usePathname`/`useSearchParams` (the current path comes as a prop, `activePath` in `BackofficeNav`).
- **BAP-294** Purely visual state (menu open, password visible) and DOM refs are fine.
- **BAP-295** Logic lives in containers, each with its presentation in a `View`: a route is `page.tsx` + `PageView.tsx` (+ `page.types.ts`).
- **BAP-296** Something shared by several routes is `src/layouts/<area>/<Area>Layout.tsx` + `<Area>LayoutView.tsx` (+ `<area>-layout.types.ts`), with the same rules as pages (single `useState` typed by `<Area>LayoutState`, View with props only).
- **BAP-297** A Next.js `layout.tsx` only wraps its routes in the container.
- **BAP-298** Desktop × mobile variations are made in CSS (`lg:`), never by tracking the width in JavaScript (`matchMedia`, `useSyncExternalStore`, an `isDesktop` prop).
- **BAP-299** `matchMedia` is only for `prefers-reduced-motion`.
- **BAP-300** When a block appears in two places depending on the width, both stay in the DOM with a responsive `hidden` (so the hidden one leaves the accessibility tree) and each has its own `useId` id.
- **BAP-301** `aria-controls` lists both ids separated by a space.
