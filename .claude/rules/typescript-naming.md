---
description: Naming of files, types, functions and constants
paths:
  - 'src/**/*.ts'
  - 'src/**/*.tsx'
---

# TypeScript: naming

- **BAP-266** Screens and rules of the app never mention how the backend does its job: no provider, subaccount, wallet or other integration detail in copy, names or components.
- **BAP-267** The text says what happened to the user, in business terms (approval failed); the cause stays in the backend.
- **BAP-268** Files that are not React components are `<name>.<role>.ts` in kebab-case, with a fixed set of roles: `api`, `server`, `types`, `errors`, `store`, `initializer`, `form`, `handlers` (`session.errors.ts`, `legal-person.api.ts`, `cnpj.handlers.ts`).
- **BAP-269** `src/lib/` files take the library name (`axios.ts`, `toast.tsx`).
- **BAP-270** Every React component file is PascalCase and matches the component (`Button.tsx`, `CompanySection.tsx`, `PageView.tsx`); only the files Next.js names (`page.tsx`, `layout.tsx`, `error.tsx`...) differ.
- **BAP-271** Base components use named exports; Next.js files use the default export it requires.
- **BAP-272** Types: page state `<Page>PageState` (the page component is `<Page>Page`); props `<Component>Props`.
- **BAP-273** Form types: `<Action><Resource>FormData`, `<Action><Resource>FieldKey`, `<Action><Resource>FormSection`, `<Action><Resource>FieldErrors`.
- **BAP-274** Functions start with a verb: `validate*`, `format*`, `parse*`, `get*`, `update*`, `is*`/`has*` for booleans; page event handlers are `handle<Event>`.
- **BAP-275** `to<Target>` is only for mapping data to another shape inside the object that owns that data (the form's `toRequest`), never for a step that builds a config or validates something.
- **BAP-276** Singletons are camelCase (`legalPersonApi`, `sessionStore`, `createLegalPersonForm`, `toast`); module constants are `SCREAMING_SNAKE_CASE`, declared in alphabetical order.
- **BAP-277** Names the browser keeps (Web Locks) follow the gateway cookies: snake_case with the `pulsepass_` prefix (`pulsepass_session_refresh`).
- **BAP-278** Constants hold only configuration, limits and the error catalogs (`CPF_LENGTH`, `NO_REFRESH_PATHS`, toast durations, `API_ERRORS`).
- **BAP-279** User-facing text (messages, labels, fallbacks) is never a constant: write it where it is used (`toast.error(...)`, `name || 'Conta'`).
