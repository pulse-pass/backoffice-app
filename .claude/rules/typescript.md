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
    <route>/                      # pt-BR URL segment (cadastro, enviado, login)
      page.tsx                    # client container: state + handlers
      page.types.ts               # <Page>PageState and the props shared by the route components
      PageView.tsx                # presentation, props only
      components/                 # components used only by this route (PascalCase)
  components/                     # base components from the Figma "Componentes" page (PascalCase)
  lib/                            # third-party wrappers, named after the library (axios.ts, toast.tsx)
  services/
    api/                          # base.api.ts, api-error.types.ts, api-error.handlers.ts
    <resource>/
      <resource>.api.ts           # <Resource>Api extends BaseApi + singleton <resource>Api (client)
      <resource>.server.ts        # reads for server components
      <resource>.types.ts         # API request/response types
      forms/<action>-<resource>.form.ts, .form.types.ts
  stores/<resource>.store.ts      # MobX singletons
  providers/<resource>.initializer.tsx  # fills a store from server data
  utils/<subject>.handlers.ts     # pure functions
```

- Route folders under `src/app/` are the URLs the user sees, so they are in pt-BR, lowercase, with hyphens (`/cadastro`, `/cadastro/enviado`, `/login`). Every other folder and file name is in English.
- Use the `@/` alias for imports across folders; relative imports only inside the same folder or its parent (`./PageView`, `./page.types`, `../legal-person.types`).

## Pages

- `page.tsx` is the client container (`'use client'`) and holds only the state and the handlers (`handleChange`, `handleBlur`, `handleSubmit`...). Validation, masks and request mapping come from the form object; API calls come from `<resource>Api`; it never parses an error by itself.
- A page has a **single `useState`**: one object grouped by context and typed as `<Page>PageState` in `page.types.ts` (e.g. `{ form: { data, errors, touched }, submission: { isSubmitting } }`), always updated with the functional form `setState((current) => ...)` so related fields change together. DOM refs and synchronous guards (double-submit lock) stay in `useRef`.
- `PageView.tsx` is the presentation: it receives all data and callbacks by props, holds no state beyond what is purely visual, and never calls a service.
- A screen is built only with base components (`src/components/`) and route components (`app/<route>/components/`).

## Forms

- A form is named after the action it submits and lives in `src/services/<resource>/forms/<action>-<resource>.form.ts` (e.g. `create-legal-person.form.ts`), with its types in `.form.types.ts`.
- It exports a **single object** `<action><Resource>Form` typed as `Form<Data, FieldKey, Section, Request>` (`src/utils/form.handlers.ts`), with the members in this order: `fields`, `initialData`, `update`, `validateField`, `validate`, `isSectionValid`, `toRequest`. Pages call `createLegalPersonForm.validate(data)`; never one loose export per function.
- Field rules are declarative: a `RULES: Record<FieldKey, FieldRule[]>` built with the generic validators of `form.handlers.ts` (`required`, `minLength`, `maxLength`, `valid`), never a `switch`. Masks are a `MASKS` map from field to a `format*` function. The field order is the order of `RULES`, which must match the order on screen.
- Form types are in snake_case, grouped by section (`company`, `owner`), with masked values as strings. The field key is derived from the data (`` `company.${keyof CompanyFormData}` ``). Mask on `update`, unmask only in `toRequest`.
- Field errors are only the client-side validation that runs before the request (on blur of a touched field and on submit, focusing the first invalid field). A gateway error never marks a field.

## API and errors

- `<resource>.api.ts`: `class <Resource>Api extends BaseApi` (`src/services/api/base.api.ts`) and the exported singleton `<resource>Api`; one method per route, named after the action (`createLegalPerson`). `src/lib/axios.ts` is the single axios instance (`baseURL`, JSON, `Accept-Language: pt-BR`, 30 s timeout); the token is added there when the login exists.
- API types are in snake_case and mirror the JSON exactly: `<Action><Resource>Request` / `<Action><Resource>Response`.
- Every gateway error becomes an error toast with the response `message` as it comes: `toast.error(getApiErrorMessage(error))` (`src/lib/toast.tsx`, `src/services/api/api-error.handlers.ts`). The `title` (HTTP reason phrase) is not shown and the front never rewrites the message; if it is unclear, improve it in the service's `messages_pt.properties`. `getApiErrorMessage` also covers a request without a known error body (fixed pt-BR message). The `code` is only used when it changes the logic (e.g. redirecting), never to pick a text.
- Screens never import `sonner` or `axios` directly: they go through `src/lib/toast.tsx` and the `*.api.ts` services.
- Data that comes from the network is narrowed with type guards (`isErrorResponse`), never cast.

## Stores

- `src/stores/<resource>.store.ts`: MobX class with `makeAutoObservable` and an exported singleton (`legalPersonStore`). Components that read it are wrapped in `observer`.
- When the data comes from the server, a server component reads it through `<resource>.server.ts` and `src/providers/<resource>.initializer.tsx` (client component) fills the store from its props.

## Naming

- Files that are not React components: `<name>.<role>.ts` in kebab-case, with a fixed set of roles: `api`, `server`, `types`, `store`, `initializer`, `form`, `handlers` (`legal-person.api.ts`, `create-legal-person.form.types.ts`, `cnpj.handlers.ts`). `src/lib/` files take the library name (`axios.ts`, `toast.tsx`).
- Every React component file is PascalCase and matches the component (`Button.tsx`, `CompanySection.tsx`, `PageView.tsx`); only the files Next.js names (`page.tsx`, `layout.tsx`, `error.tsx`...) differ. Base components use named exports; Next.js files use the default export it requires.
- Types: API `<Action><Resource>Request` / `<Action><Resource>Response`; form `<Action><Resource>FormData`, `<Action><Resource>FieldKey`, `<Action><Resource>FormSection`, `<Action><Resource>FieldErrors`; page state `<Page>PageState` (the page component is `<Page>Page`); props `<Component>Props`; API classes `<Resource>Api`.
- Functions start with a verb: `validate*`, `format*`, `parse*`, `get*`, `update*`, `is*`/`has*` for booleans, `to<Target>` for mappings; page event handlers are `handle<Event>`.
- Singletons in camelCase (`legalPersonApi`, `legalPersonStore`, `createLegalPersonForm`, `toast`); module constants in `SCREAMING_SNAKE_CASE`.

## Code

- No `any` (ESLint error); use `unknown` and narrow it.
- Module order: types, constants, declarative maps (`RULES`, `MASKS`), private helpers in the order they are used, then the export (or exports) at the end.
- No comments in code, CSS, config or Dockerfile: names and structure must explain the code, and decisions go to the rules, the README or the task notes. The only exception is the version comment next to an action pinned by SHA in the workflows (Sonar rule S7637).
- Code (names, logs) in English; every user-facing text in pt-BR.
- React 19 event types: `SubmitEvent` for form submit and `ChangeEvent` for inputs; `FormEvent` is deprecated.
- `try/catch` only around the call that throws; what runs after a successful call goes after the block. No defensive validation beyond the form rules.
- Conditional class names with `classNames(...)` (`src/utils/class-name.handlers.ts`), not template strings.
