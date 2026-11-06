---
description: Branches, ruleset, CI, Sonar and publish workflows
paths:
  - '.github/**'
---

# Pipeline

## Repository

- **BAP-190** Polyrepo in the `pulse-pass` GitHub organization, `main` only, PRs from `feature/<ID>-<slug>`, merge commits only (squash and rebase disabled).
- **BAP-191** The `main` ruleset equals the other repositories: active on the default branch, no bypass, blocks deletion and force push, requires a PR (0 approvals, merge method `merge`).
- **BAP-192** The ruleset requires the CI jobs `lint`, `sonar` and `build`, and is created with `gh api -X POST repos/pulse-pass/backoffice-app/rulesets`.
- **BAP-193** SonarQube Cloud: organization `pulse-pass`, project `pulse-pass_backoffice-app`, GitHub Actions analysis; `SONAR_TOKEN` is the organization secret shared by all repositories.

## Workflows

- **BAP-194** Workflows are `pull-request.yml` (name `CI`) and `publish.yml` (name `Publish`, never "release").
- **BAP-195** Third-party actions are pinned by full commit SHA (Sonar rule S7637); `actions/*` may use tags.
- **BAP-237** No comments in workflows; the only exception is the version comment next to an action pinned by SHA (Sonar rule S7637).
- **BAP-196** Workflows declare least-privilege `permissions` (`contents: read` in `pull-request.yml`).
- **BAP-197** On a PR the pipeline runs lint (`npm run lint` + `npm run format:check`), then SonarQube Cloud (`-Dsonar.qualitygate.wait=true`), then build (`npm run build` + `docker build`).
- **BAP-198** There are no tests in the front end, so Sonar runs with `-Dsonar.coverage.exclusions=**/*` and the coverage condition of the gate does not apply.
- **BAP-199** On merge (one run at a time, `concurrency` without cancelling) the version comes from the commits, with a `vX.Y.Z` tag and the image `ghcr.io/pulse-pass/backoffice-app` on GHCR.
- **BAP-200** The published image gets `NEXT_PUBLIC_API_URL` from the repository variable of the same name (GitHub → Settings → Secrets and variables → Actions → Variables), passed as `build-args` in `publish.yml`.
- **BAP-201** The CI `docker build` passes `http://localhost:8190`.
