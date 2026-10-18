---
description: Repository, Docker and pipeline conventions
paths:
  - 'Dockerfile'
  - '.github/**'
  - 'README.md'
  - '.env.example'
---

# Infrastructure and pipeline

- Polyrepo in the `pulse-pass` GitHub organization, `main` only, PRs from `feature/<ID>-<slug>`, merge commits only (squash and rebase disabled).
- `main` ruleset equal to the other repositories: active on the default branch, no bypass, blocks deletion and force push, requires a PR (0 approvals, merge method `merge`) and requires the CI jobs `lint`, `sonar` and `build`. It is created with `gh api -X POST repos/pulse-pass/backoffice-app/rulesets`.
- SonarQube Cloud: organization `pulse-pass`, project `pulse-pass_backoffice-app`, GitHub Actions analysis; `SONAR_TOKEN` is the organization secret shared by all repositories.
- There is no `infrastructure/` folder: the app runs with `npm run dev` (port 3000) pointed at the gateway through `NEXT_PUBLIC_API_URL` in `.env` (copied from `.env.example`; the gateway listens on `http://localhost:8090`).
- `NEXT_PUBLIC_API_URL` is inlined at build time, so the Docker image receives it as a build argument and the Dockerfile fails the build when it is empty. The published image gets it from the repository variable `NEXT_PUBLIC_API_URL` (GitHub → Settings → Secrets and variables → Actions → Variables), passed as `build-args` in `publish.yml`; the CI `docker build` passes `http://localhost:8090`.
- The Dockerfile is multi-stage (`node:22-alpine`: deps → build → runner with the `standalone` output, non-root user, port 3000).
- Workflows declare least-privilege `permissions` (`contents: read` in `pull-request.yml`).
- Workflows: `pull-request.yml` (name `CI`) and `publish.yml` (name `Publish`, never "release"). Third-party actions are pinned by full commit SHA with the version in a comment (Sonar rule S7637); `actions/*` may use tags.
- Pipeline: PR with lint (`npm run lint` + `npm run format:check`) → SonarQube Cloud (`-Dsonar.qualitygate.wait=true`, with `-Dsonar.coverage.exclusions=**/*` because the front end has no tests, so the coverage condition of the gate does not apply) → build (`npm run build` + `docker build`); on merge (one run at a time, `concurrency` without cancelling), version from the commits, `vX.Y.Z` tag and image `ghcr.io/pulse-pass/backoffice-app` on GHCR.
