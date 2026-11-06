---
description: Local run, environment and Docker image conventions
paths:
  - 'Dockerfile'
  - 'README.md'
  - '.env.example'
---

# Infrastructure

- **BAP-186** There is no `infrastructure/` folder: the app runs with `npm run dev` (port 3000).
- **BAP-187** The app only talks to the `backoffice-gateway`, through `NEXT_PUBLIC_API_URL` in `.env`, copied from `.env.example`; in development mode the gateway listens on `http://localhost:8190`.
- **BAP-188** `NEXT_PUBLIC_API_URL` is inlined at build time, so the Docker image receives it as a build argument and the Dockerfile fails the build when it is empty.
- **BAP-189** The Dockerfile is multi-stage (`node:22-alpine`: deps → build → runner with the `standalone` output, non-root user, port 3000).
- **BAP-360** No comments in the Dockerfile or `.env.example`: names and structure must explain them, and decisions go to the rules or the README.
