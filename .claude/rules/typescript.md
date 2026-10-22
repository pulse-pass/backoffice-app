---
description: TypeScript/Next.js code conventions
paths:
  - 'src/**/*.ts'
  - 'src/**/*.tsx'
---

# TypeScript and Next.js code

## Stack

- Next.js 16 (App Router, `src/`), React 19, TypeScript strict, Tailwind CSS 4, MobX 7 + `mobx-react-lite`, axios, Sonner (toasts). No form library, no mask library: forms and masks are written by hand.
- ESLint (flat config, `eslint-config-next` + `simple-import-sort`) and Prettier (single quotes, no semicolons, `printWidth` 110, trailing commas). `npm run lint` and `npm run format:check` must pass.
- The app only talks to the `backoffice-gateway`, through `NEXT_PUBLIC_API_URL`.
- No tests in the front end, as the pipeline defines (lint, Sonar and build).

## Structure

```
src/
  app/
    layout.tsx, globals.css, page.tsx
    (organizer)/, (admin)/        # route groups by role: layout.tsx + the role's routes (eventos, organizadores)
    <route>/                      # pt-BR URL segment (cadastro, enviado, login)
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
    api/                          # base.api.ts, api-error.types.ts, api-error.handlers.ts
    <resource>/
      <resource>.api.ts           # <Resource>Api extends BaseApi + singleton <resource>Api (client)
      <resource>.server.ts        # reads for server components
      <resource>.types.ts         # API request/response types
      forms/<action>-<resource>.form.ts, .form.types.ts
  stores/<resource>.store.ts      # MobX singletons
  providers/<resource>.initializer.tsx  # fills a store from server data / wires a store into lib/
  utils/<subject>.handlers.ts     # generic pure helpers, no business rules (see Utils)
```

- Route folders under `src/app/` are the URLs the user sees, so they are in pt-BR, lowercase, with hyphens (`/cadastro`, `/cadastro/enviado`, `/login`). Every other folder and file name is in English.
- Page titles: the root layout defines `title.template` (`'%s · PulsePass Backoffice'`). Server pages export `metadata = { title: 'Eventos' }`; `'use client'` pages cannot, so their route folder gets a `layout.tsx` that only exports the `metadata` and returns `children` (`login/layout.tsx`, `cadastro/layout.tsx`). Every route has its own title.
- Route groups (`(organizer)`, `(admin)`) do not become part of the URL, so they are named in English like any other folder. Each group's `layout.tsx` only wraps its routes in `BackofficeLayout role="..."` (`src/layouts/backoffice/BackofficeLayout.tsx`), the single place of the guard, so the two layouts never duplicate it.
- Use the `@/` alias for imports across folders; relative imports only inside the same folder or its parent (`./PageView`, `./page.types`, `../legal-person.types`).

## Utils

- `src/utils/` holds only generic language helpers that know nothing about the product: masks and check digits (`cpf.handlers.ts`, `cnpj.handlers.ts`), generic validators (`form.handlers.ts`), `classNames`, `getInitials`. Business rules (which role wins, which area a role opens, what a status means) never go there: they live in the store or service of the resource (`sessionStore.role`, `sessionStore.areaPath`).

## Pages

- `page.tsx` is the client container (`'use client'`) and holds only the state and the handlers (`handleChange`, `handleBlur`, `handleSubmit`...). Validation, masks and request mapping come from the form object; API calls come from `<resource>Api`; it never parses an error by itself.
- A page has a **single `useState`**: one object grouped by context and typed as `<Page>PageState` in `page.types.ts` (e.g. `{ form: { data, errors, touched }, submission: { isSubmitting } }`), always updated with the functional form `setState((current) => ...)` so related fields change together. DOM refs and synchronous guards (double-submit lock) stay in `useRef`.
- `page.types.ts` exists in every route whose `page.tsx` has state and holds, in this order: `<Page>PageState`, `PageViewProps` (the props of `PageView.tsx`) and the props shared by more than one route component, in the order the components appear on screen (e.g. `SectionProps<T>` in `/cadastro`). Props used by a single component stay in that component file (`RegistrationIntroProps`). Routes without state (`/`, `/cadastro/enviado`, the empty areas) have no `page.types.ts`.
- `PageView.tsx` is the presentation: it receives all data and callbacks by props, holds no state beyond what is purely visual, and never calls a service.
- A screen is built only with base components (`src/components/`) and route components (`app/<route>/components/`).

## Components and containers

- `src/components/` holds only visual components: everything comes in by props, and they never read a store, call an API or use `useRouter`/`usePathname`/`useSearchParams` (the current path comes as a prop, e.g. `activePath` in `BackofficeNav`). Purely visual state (menu open, password visible) and DOM refs are fine.
- Logic lives in containers, each with its presentation in a `View`: a route is `page.tsx` + `PageView.tsx` (+ `page.types.ts`); something shared by several routes is `src/layouts/<area>/<Area>Layout.tsx` + `<Area>LayoutView.tsx` (+ `<area>-layout.types.ts`), following the same rules as pages (single `useState` typed by `<Area>LayoutState`, View with props only). A Next.js `layout.tsx` only wraps its routes in the container.
- Loading state while the session hydrates or a redirect is in flight (`BackofficeLayout`, `/`): never `null` (blank screen for screen readers); render `<div role="status" className="sr-only">Carregando</div>`, with no new visual spinner.

## Forms

- A form is named after the action it submits and lives in `src/services/<resource>/forms/<action>-<resource>.form.ts` (e.g. `create-legal-person.form.ts`), with its types in `.form.types.ts`.
- It exports a **single object** `<action><Resource>Form` typed as `Form<Data, FieldKey, Section, Request>` (`src/utils/form.handlers.ts`), with the members in this order: `fields`, `initialData`, `update`, `validateField`, `validate`, `isSectionValid`, `toRequest`. Pages call `createLegalPersonForm.validate(data)`; never one loose export per function.
- Field rules are declarative: a `RULES: Record<FieldKey, FieldRule[]>` built with the generic validators of `form.handlers.ts` (`required`, `minLength`, `maxLength`, `valid`), never a `switch`. Masks are a `MASKS` map from field to a `format*` function. The field order is the order of `RULES`, which must match the order on screen.
- Form types are in snake_case, grouped by section (`company`, `owner`), with masked values as strings. The field key is derived from the data (`` `company.${keyof CompanyFormData}` ``). Mask on `update`, unmask only in `toRequest`.
- Field errors are only the client-side validation that runs before the request (on blur of a touched field and on submit, focusing the first invalid field). A gateway error never marks a field.

## API and errors

- `<resource>.api.ts`: `class <Resource>Api extends BaseApi` (`src/services/api/base.api.ts`) and the exported singleton `<resource>Api`; one method per route, named after the action (`createLegalPerson`). `src/lib/axios.ts` is the single axios instance (`baseURL`, JSON, `Accept-Language: pt-BR`, 30 s timeout); it sends the gateway cookies and the CSRF header (see Session).
- API types are in snake_case and mirror the JSON exactly: `<Action><Resource>Request` / `<Action><Resource>Response`.
- Every gateway error becomes an error toast with the response `message` as it comes: `toast.error(getApiErrorMessage(error))` (`src/lib/toast.tsx`, `src/services/api/api-error.handlers.ts`). The `title` (HTTP reason phrase) is not shown and the front never rewrites the message; if it is unclear, improve it in the service's `messages_pt.properties`. `getApiErrorMessage` also covers a request without a known error body (fixed pt-BR message). The `code` is only used when it changes the logic (e.g. redirecting), never to pick a text.
- Screens never import `sonner` or `axios` directly: they go through `src/lib/toast.tsx` and the `*.api.ts` services.
- Data that comes from the network is narrowed with type guards (`isErrorResponse`), never cast.

## Stores

- `src/stores/<resource>.store.ts`: MobX class with `makeAutoObservable` and an exported singleton (`legalPersonStore`). Components that read it are wrapped in `observer`.
- When the data comes from the server, a server component reads it through `<resource>.server.ts` and `src/providers/<resource>.initializer.tsx` (client component) fills the store from its props.

## Session

- The session lives in httpOnly cookies set and cleared by the `backoffice-gateway`; the front never sees a token, never decodes a JWT and never uses `localStorage` or `sessionStorage`. The profile comes from `GET /auth/me` (`SessionProfile`: `person_key`, `name`, `document_number`, `roles`, `legal_person`, which is `null` for the admin) and is the only source of who the user is.
- `src/stores/session.store.ts` (`sessionStore`) holds `profile` and `isHydrated`, plus the computed `role` (`'organizer' | 'admin' | null`, admin wins when both roles exist) and `areaPath` (`/eventos` for `organizer`, `/organizadores` for `admin`, `/login` without a role). Actions: `setProfile(profile)`, `clear()` and `hydrate()` (async, runs once, called by `SessionInitializer`: `sessionApi.getSession()`, whose response also brings the `XSRF-TOKEN` cookie; success fills `profile`, any error leaves it `null`; `isHydrated` is always set at the end). The store is the only store allowed to call a service, because hydration has no server component to read it. Components that read it are wrapped in `observer` and wait for `isHydrated` before deciding anything, so the server render and the first client render match.
- `src/lib/axios.ts` never imports a store (no `lib` <-> `stores` cycle). The instance uses `withCredentials: true`, `withXSRFToken: true`, `xsrfCookieName: 'XSRF-TOKEN'` and `xsrfHeaderName: 'X-XSRF-TOKEN'`: axios copies the `XSRF-TOKEN` cookie (the gateway writes it on every response, a 401 included) into the `X-XSRF-TOKEN` header on every request, including cross-origin ones, and the gateway answers `403` to a POST/PUT/PATCH/DELETE without it, the public `POST /legal_persons` included. `SessionInitializer` (client component in the root layout) calls `hydrate()` on every page, so the cookie exists before any form is submitted.
- It exports `registerSessionHandlers({ refreshSession, onUnauthorized })`, called once by `SessionInitializer`. The response interceptor handles a `401` on every route except `/auth/login` and `/auth/refresh` (`NO_REFRESH_PATHS`): one refresh shared by all failing calls (one promise in flight), then the request is repeated once (`retried`). There is no version counter: a call whose 401 arrives right after another refresh finished refreshes again, which is harmless because the browser already sends the new refresh cookie. Only a `400`/`401` from the refresh calls `onUnauthorized` (clears the profile and, if there was a session, sends the user to `/login`); a network failure or `5xx` rethrows the original error and keeps the session. An anonymous visitor whose `/auth/me` fails during hydration is not redirected, so public routes such as `/cadastro` stay reachable.
- `/login` calls `sessionApi.createSession`, then `sessionApi.getSession` and `sessionStore.setProfile`; when the profile has no backoffice role (buyer) it calls `sessionApi.deleteSession` ignoring a failure, `sessionStore.clear()` and shows the fixed "no access" toast.
- Guard by role: `BackofficeLayout` (client, `observer`) renders the loading status (see Components) until `sessionStore.isHydrated`; without a session it does `router.replace('/login')`; with another role it does `router.replace(sessionStore.areaPath)`; with the group's role it renders `BackofficeLayoutView` (nav + page), passing `sessionStore.areaPath` as `homePath` so the nav never repeats the role-to-area rule, `profile.name` and `profile.legal_person?.name`. The role is only a UX decision, the gateway enforces access. Logout (`handleLogout` in `BackofficeLayout`) calls `sessionApi.deleteSession` ignoring a failure, then `sessionStore.clear()` and `router.replace('/login')`, with a lock against a double click.
- Screens call `sessionApi` and `sessionStore`; they never handle cookies, tokens or storage by themselves.

## Naming

- Files that are not React components: `<name>.<role>.ts` in kebab-case, with a fixed set of roles: `api`, `server`, `types`, `store`, `initializer`, `form`, `handlers` (`legal-person.api.ts`, `create-legal-person.form.types.ts`, `cnpj.handlers.ts`). `src/lib/` files take the library name (`axios.ts`, `toast.tsx`).
- Every React component file is PascalCase and matches the component (`Button.tsx`, `CompanySection.tsx`, `PageView.tsx`); only the files Next.js names (`page.tsx`, `layout.tsx`, `error.tsx`...) differ. Base components use named exports; Next.js files use the default export it requires.
- Types: API `<Action><Resource>Request` / `<Action><Resource>Response`; form `<Action><Resource>FormData`, `<Action><Resource>FieldKey`, `<Action><Resource>FormSection`, `<Action><Resource>FieldErrors`; page state `<Page>PageState` (the page component is `<Page>Page`); props `<Component>Props`; API classes `<Resource>Api`.
- Functions start with a verb: `validate*`, `format*`, `parse*`, `get*`, `update*`, `is*`/`has*` for booleans, `to<Target>` only for mapping data to another shape inside the object that owns that data (the form's `toRequest`), never for a step that builds a config or validates something; page event handlers are `handle<Event>`.
- Singletons in camelCase (`legalPersonApi`, `legalPersonStore`, `createLegalPersonForm`, `toast`); module constants in `SCREAMING_SNAKE_CASE`. Constants hold only configuration and limits (`CPF_LENGTH`, `NO_REFRESH_PATHS`, toast durations); user-facing text (messages, labels, fallbacks) is never a constant and is written where it is used (`toast.error(...)`, `name || 'Conta'`). Declarative lists rendered with `map` (`ROLES` in `LoginIntro`) may hold their labels; loose texts never.

## Code

- No `any` (ESLint error); use `unknown` and narrow it.
- Module order: types, constants, declarative maps (`RULES`, `MASKS`), private helpers in the order they are used, then the export (or exports) at the end.
- No comments in code, CSS, config or Dockerfile: names and structure must explain the code, and decisions go to the rules, the README or the task notes. The only exception is the version comment next to an action pinned by SHA in the workflows (Sonar rule S7637).
- Code (names, logs) in English; every user-facing text in pt-BR.
- React 19 event types: `SubmitEvent` for form submit and `ChangeEvent` for inputs; `FormEvent` is deprecated.
- No destructuring just to shorten access: read the page state, stores and props objects through their path (`state.form.data`, `sessionStore.role`, `formData.credentials.password`), so every read is visibly fresh and the same value is never read in two ways. Destructuring is only for separating values (`...rest` props in a base component), for component parameters (`function PageView({ formData, ... })`) and for the fields of a function result used right away (`const { area_code, number } = parsePhone(value)`).
- An effect that reacts to a MobX store has no dependency array (the `observer` component re-renders when the store changes and the effect runs after each render); store values are never listed as dependencies (`react-hooks/exhaustive-deps` rejects outer-scope values). The `observer` only re-renders for observables read during render, never for ones read only inside the effect, so the values the effect uses are read in the component body first (`const isHydrated = sessionStore.isHydrated`) and the effect uses those locals; otherwise an async change (the hydration after `/auth/me`) never runs the effect again.
- `try/catch` only around the call that throws; what runs after a successful call goes after the block. No defensive validation beyond the form rules.
- Conditional class names with `classNames(...)` (`src/utils/class-name.handlers.ts`), not template strings.
