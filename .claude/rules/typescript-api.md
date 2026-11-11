---
description: API services, types and error catalogs
paths:
  - 'src/services/**'
  - 'src/lib/**'
  - 'src/app/**'
  - 'src/layouts/**'
  - 'src/components/**'
---

# TypeScript: API and errors

## Services

- **BAP-202** `<resource>.api.ts` declares `class <Resource>Api extends BaseApi` (`src/services/api/base.api.ts`) and the exported singleton `<resource>Api`; the only exception is a public external API (BAP-370).
- **BAP-203** One method per route, named after the action (`createLegalPerson`).
- **BAP-204** Routes under `/internal` (admin only, through the `backoffice-gateway`) are named `<action>Internal<Resource>` (`listInternalOrganizations`, `getInternalPerson`).
- **BAP-205** `BaseApi.get(path, params?)` forwards the optional `params` to axios as the query string (an `undefined` value is omitted).
- **BAP-206** `listInternalOrganizations` filters by the optional `name` (prefix of the razão social) and `document_number` (exact CNPJ, digits only: a partial CNPJ finds nothing until it is complete).
- **BAP-207** `src/lib/axios.ts` is the single axios instance (`baseURL`, JSON, `Accept-Language: pt-BR`, 30 s timeout); it sends the gateway cookies and the CSRF header, so it is only for the gateways (a public external API does not use it, BAP-370).
- **BAP-208** Screens never import `sonner` or `axios` directly: they go through `src/lib/toast.tsx` and the `*.api.ts` services.
- **BAP-370** A public external API (ViaCEP) lives in `src/services/<resource>/<resource>.api.ts` like any service but uses native `fetch` with `credentials: 'omit'` and its own timeout, without `BaseApi` and without `src/lib/axios.ts`, so no gateway cookie or CSRF header reaches a third party; it has no `.errors.ts` because it never answers a gateway error.

## Types

- **BAP-209** API types are in snake_case and mirror the JSON exactly, with the backend names, which follow the database without abbreviating (`organization_status`, `organization_rejection_reason`, never `status`/`rejection_reason`).
- **BAP-210** Names are `<Action><Resource>Request` / `<Action><Resource>Response`; internal routes use `<Action>Internal<Resource>Response` and query types `<Action>Internal<Resource>Params`.
- **BAP-211** Data that comes from the network is narrowed with type guards (`isErrorResponse`), never cast.

## Handling errors

- **BAP-212** Every gateway error becomes an error toast with the response `message` as it comes: `toast.error(getApiErrorMessage(error))` (`src/lib/toast.tsx`, `src/services/api/api-error.handlers.ts`).
- **BAP-213** The `title` (HTTP reason phrase) is not shown and the front never rewrites the message; if it is unclear, improve it in the service's `messages_pt.properties`.
- **BAP-214** `getApiErrorMessage` also covers a request without a known error body (fixed pt-BR message).
- **BAP-215** The `code` is never used to pick a text.
- **BAP-216** A decision that depends on which error came back (refresh, redirect, retry) always checks the HTTP status and the `code` together, never one alone, with `isExpectedApiError(error, expected)`.
- **BAP-217** `isExpectedApiError` is true only for an axios error whose body is an `ErrorResponse` and whose `{ status, code }` pair is in the list; a network failure or a proxy page never matches and falls into the generic handling.

## Error catalogs

- **BAP-218** Errors are declared once, as `ExpectedApiError` (`{ status, code }`) values, never as loose literals in the code that checks them.
- **BAP-219** `src/services/api/api.errors.ts` holds `API_ERRORS`, the generic `GEN*` errors by category, in status order, typed with `satisfies Record<string, ExpectedApiError>`.
- **BAP-220** A new generic code enters there in its status position (the catalog follows the status, not the alphabet).
- **BAP-221** `src/services/api/<service>.errors.ts` holds the business codes of each backend service the gateway forwards, named after the cause like the service exceptions (`ONBOARDING_ERRORS.invalidLegalPersonDocument`), same typing.
- **BAP-222** The file is created by the first decision that needs a code of that service; `organization.errors.ts` exports `ORGANIZATION_SERVICE_ERRORS` (suffix `_SERVICE` because `ORGANIZATION_ERRORS` is the resource catalog).
- **BAP-223** `src/services/<resource>/<resource>.errors.ts` holds `<RESOURCE>_ERRORS`, keyed by the route method of `<resource>.api.ts` and then by outcome.
- **BAP-224** Each outcome is a list that only references `API_ERRORS` and `<SERVICE>_ERRORS` (never a `{ status, code }` literal), typed with `satisfies Record<string, Record<string, ExpectedApiError[]>>`.
- **BAP-225** Only the errors a decision in the front uses are declared, and they are added when that decision is written; errors that are only shown in a toast are never mapped.
- **BAP-226** Outcomes use a fixed vocabulary: `invalid` (400, request or document not valid), `rejected` (identity or session refused: 400 blank token, 401), `conflict` (409, already exists), `failed` (422, a dependency failed).
- **BAP-227** The generic errors every route may answer (`forbidden` for CSRF, `internal`, network) are not repeated per route.
- **BAP-228** Methods and outcomes are in alphabetical order.
- **BAP-229** A caller checks `isExpectedApiError(error, SESSION_ERRORS.refreshSession.rejected)`; a check that is not about one route uses `API_ERRORS` directly (`[API_ERRORS.unauthorized]` in the interceptor).
- **BAP-230** In `src/services/api/`, `api-error.types.ts` has only types (`ErrorResponse`, `ExtraFieldError`, `ExpectedApiError`).
- **BAP-231** `api-error.handlers.ts` has every function over them (`isErrorResponse`, `isExpectedApiError`, `getApiErrorMessage`, in this order).
- **BAP-232** Type guards live in `.handlers.ts`, never in `.types.ts`.
