---
description: MobX stores and server-fed initializers
paths:
  - 'src/stores/**'
  - 'src/providers/**'
---

# TypeScript: stores

- **BAP-337** `src/stores/<resource>.store.ts` is a MobX class with `makeAutoObservable` and an exported singleton (`sessionStore`).
- **BAP-338** Components that read a store are wrapped in `observer`.
- **BAP-339** When the data comes from the server, a server component reads it through `<resource>.server.ts` and `src/providers/<resource>.initializer.tsx` (client component) fills the store from its props.
- **BAP-340** `organizationStore` never imports `sessionStore`, so there is no import cycle.
- **BAP-341** `sessionStore` owns the session lifecycle. Other stores never import `sessionStore` (one-way dependency).
- **BAP-342** `sessionStore` and `organizationStore` are the only stores allowed to call services, because the session hydration has no server component to read them.
- **BAP-310** `organizationStore` holds `organization` (the first item of `GET /organizations`, `null` when the list is empty, only filled for the organizer).
- **BAP-311** `hasAccess` is the single "no access" rule (organization present and not `DELETED`), used by `/login` and `/situacao`.
- **BAP-312** `fetchOrganization()` throws on a request error; the caller decides what to do.
