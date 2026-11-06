---
description: Session, hydration, refresh and access guards
paths:
  - 'src/stores/**'
  - 'src/lib/axios.ts'
  - 'src/providers/**'
  - 'src/layouts/**'
  - 'src/app/login/**'
  - 'src/app/situacao/**'
  - 'src/services/session/**'
---

# TypeScript: session

## Principles

- **BAP-302** The session lives in httpOnly cookies set and cleared by the `backoffice-gateway`; the front never sees a token, never decodes a JWT and never uses `localStorage` or `sessionStorage`.
- **BAP-303** The profile comes from `GET /auth/me` (`GetSessionResponse`; `legal_person` is `null` for the admin) and is the only source of who the user is.
- **BAP-304** Screens call `sessionApi` and `sessionStore`; they never handle cookies, tokens or storage by themselves.

## Stores

- **BAP-305** `sessionStore` holds `profile` and `isHydrated`, plus the computed `role` (`'organizer' | 'admin' | null`, admin wins when both roles exist).
- **BAP-306** `areaPath` is `/organizadores` for the admin, `/eventos` for an organizer whose organization is `APPROVED`, `/situacao` otherwise, and `/login` without a role.
- **BAP-307** `hydrate()` runs once, called by `SessionInitializer`; for the organizer it also loads the organization, and a failure there leaves it `null` and keeps the session. Any `/auth/me` error leaves `profile` `null`. `isHydrated` is always set at the end.
- **BAP-308** `logout()` ignores a failure of `sessionApi.deleteSession`, then calls `clear()`; `clear()` also clears `organizationStore`.
- **BAP-309** Components wait for `isHydrated` before deciding anything, so the server render and the first client render match.

## CSRF and interceptor

- **BAP-313** `src/lib/axios.ts` never imports a store (no `lib` <-> `stores` cycle); it only imports `isExpectedApiError`, `API_ERRORS` and `SESSION_ERRORS`.
- **BAP-314** The instance uses `withCredentials`, `withXSRFToken`, `xsrfCookieName: 'XSRF-TOKEN'` and `xsrfHeaderName: 'X-XSRF-TOKEN'`: axios copies the cookie into the header on every request, cross-origin ones included.
- **BAP-315** The gateway writes the `XSRF-TOKEN` cookie on every response (a 401 included) and answers `403` to a POST/PUT/PATCH/DELETE without the header, the public `POST /legal_persons` included.
- **BAP-316** `SessionInitializer` (client component in the root layout) calls `hydrate()` on every page, so the cookie exists before any form is submitted.
- **BAP-317** `registerSessionHandlers({ refreshSession, onUnauthorized })` is called once by `SessionInitializer`.
- **BAP-318** The response interceptor refreshes only when `isRefreshable(config, error)` holds (not `retried`, not in `NO_REFRESH_PATHS`, and `isExpectedApiError(error, [API_ERRORS.unauthorized])`), with one question per condition in the guard.
- **BAP-319** One refresh is shared by all failing calls (one promise in flight), then the request is repeated once (`retried`).
- **BAP-320** The refresh runs inside an exclusive Web Lock shared by every tab (`REFRESH_LOCK`): the refresh token rotates on each use, so two tabs refreshing in parallel look like a reuse and Keycloak ends the session; the waiting tab sends its refresh only after the other one got the response, already with the new cookie, at the cost of one extra rotation.
- **BAP-321** Web Locks needs a secure context, so the app is only served on localhost or HTTPS; otherwise `navigator.locks` is undefined, the refresh throws and the session ends on its own.
- **BAP-322** There is no version counter: a call whose 401 arrives right after another refresh refreshes again, which is harmless because the lock makes it wait and the browser then sends the new cookie.
- **BAP-323** Only a refresh error in `SESSION_ERRORS.refreshSession.rejected` calls `onUnauthorized` (clears the session through `sessionStore.clear()` and, if there was a session, sends the user to `/login`).
- **BAP-324** Any other refresh error (network failure, `403`, `422`, `5xx`) rethrows the original error and keeps the session.
- **BAP-325** An anonymous visitor whose `/auth/me` fails during hydration is not redirected, so public routes such as `/cadastro` stay reachable.

## Screens

- **BAP-326** For the organizer, `/login` awaits `organizationStore.fetchOrganization()` after `sessionStore.setProfile`; a failure ends the session and shows the API message toast.
- **BAP-327** A profile without a backoffice role (buyer), or an organizer without organization or with a `DELETED` one, goes through `sessionStore.logout()` and the fixed "no access" toast; otherwise it goes to `sessionStore.areaPath`.
- **BAP-328** The already-signed-in redirect of `/login` is skipped while a submission is in flight.
- **BAP-329** `/situacao` waits for `isHydrated`; without the organizer role or with an `APPROVED` organization it does `router.replace(sessionStore.areaPath)`.
- **BAP-330** `/situacao` loads the person by key (`GET /persons/{person_key}`), the owner (`GET /legal_persons/{legal_person_key}/collaborators?collaborator_role=OWNER`, first item of `data`) and, only when the store has none, the organization, in parallel; a retry repeats both and a `404` is a load error.
- **BAP-331** `/situacao` treats a missing or `DELETED` organization as no access (`sessionStore.logout()`, toast, `/login`).
- **BAP-332** `BackofficeLayout` renders the loading status until `sessionStore.isHydrated`; without a session it does `router.replace('/login')`.
- **BAP-333** With another role, or an organizer whose organization is not `APPROVED`, it does `router.replace(sessionStore.areaPath)` (one rule, `isAreaOpen`).
- **BAP-334** It passes `sessionStore.areaPath` as `homePath`, so the nav never repeats the role-to-area rule.
- **BAP-335** The role is only a UX decision; the gateway enforces access.
- **BAP-336** Logout (`handleLogout` in `BackofficeLayout` and in `/situacao`) calls `sessionStore.logout()` and `router.replace('/login')`, with a lock against a double click.
