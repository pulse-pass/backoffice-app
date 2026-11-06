---
description: Deviations from the mockup on the login screen
paths:
  - 'src/app/login/**'
---

# Design: login

- **BAP-076** `/login` follows mockup 01, but the user is identified by CPF (mask, `autocomplete="username"`, numeric keyboard) instead of the e-mail.
- **BAP-077** There is no "Esqueci minha senha" link, since no recovery flow exists.
- **BAP-078** The dark panel has no role list: below the dot row, desktop only, a "Primeiro acesso" block (mono eyebrow + `body-s` secondary text) tells new users to register the company or use the e-mail invite.
- **BAP-079** On mobile the panel matches the 390 px mockup.
- **BAP-080** Secondary text on the dark panel uses `text-text-inverse-secondary` (alias of mist, 9:1 on shadow grey), not an opacity of the inverse text.
