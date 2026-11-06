---
description: Stack, folder layout, routes and imports
paths:
  - 'src/**/*.ts'
  - 'src/**/*.tsx'
---

# TypeScript: structure

## Stack

- **BAP-343** Next.js 16 (App Router, `src/`), React 19, TypeScript strict, Tailwind CSS 4, MobX 7 + `mobx-react-lite`, axios and Sonner (toasts).
- **BAP-344** No form library and no mask library: forms and masks are written by hand.

## Folders

- **BAP-346** Folders follow this layout:

```
src/
  app/
    layout.tsx, globals.css, page.tsx
    (organizer)/, (admin)/        # route groups by role: layout.tsx + the role's routes (eventos, organizadores)
    <route>/                      # pt-BR URL segment (cadastro, login, situacao)
      page.tsx                    # client container: state + handlers
      page.types.ts               # <Page>PageState, PageViewProps and the props shared by the route components
      PageView.tsx                # presentation, props only
      components/                 # components used only by this route (PascalCase)
  components/                     # visual base components from the Figma "Componentes" page (PascalCase)
  layouts/
    <area>/                       # container shared by several routes (backoffice)
      <Area>Layout.tsx            # client container: store, router, API calls, handlers
      <Area>LayoutView.tsx        # presentation, props only
      <area>-layout.types.ts      # <Area>LayoutState and <Area>LayoutViewProps
  lib/                            # third-party wrappers, named after the library (axios.ts, toast.tsx)
  services/
    api/                          # base.api.ts, api.errors.ts, <service>.errors.ts, api-error.types.ts, api-error.handlers.ts
    <resource>/
      <resource>.api.ts           # <Resource>Api extends BaseApi + singleton <resource>Api (client)
      <resource>.server.ts        # reads for server components
      <resource>.types.ts         # API request/response types
      <resource>.errors.ts        # errors each route of the resource answers
      forms/<action>-<resource>.form.ts, .form.types.ts
  stores/<resource>.store.ts      # MobX singletons
  providers/<resource>.initializer.tsx  # fills a store from server data / wires a store into lib/
  utils/<subject>.handlers.ts     # generic pure helpers, no business rules
```

## Routes

- **BAP-347** Route folders under `src/app/` are the URLs the user sees, so they are in pt-BR, lowercase, with hyphens (`/cadastro`, `/login`, `/situacao`). Every other folder and file name is in English.
- **BAP-348** The root layout defines `title.template` (`'%s · PulsePass Backoffice'`) and every route has its own title.
- **BAP-349** Server pages export `metadata = { title: 'Eventos' }`.
- **BAP-350** `'use client'` pages cannot export `metadata`, so their route folder gets a `layout.tsx` that only exports the `metadata` and returns `children` (`login/layout.tsx`).
- **BAP-351** Route groups (`(organizer)`, `(admin)`) do not become part of the URL, so they are named in English like any other folder.
- **BAP-352** Each group's `layout.tsx` only wraps its routes in `BackofficeLayout role="..."`, the single place of the guard, so the two layouts never duplicate it.

## Imports

- **BAP-353** Use the `@/` alias for imports across folders; relative imports only inside the same folder or its parent (`./PageView`, `./page.types`, `../legal-person.types`).
