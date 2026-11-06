---
description: Deviations from the mockup on the backoffice navigation
paths:
  - 'src/layouts/**'
  - 'src/components/BackofficeNav.tsx'
  - 'src/components/NavItem.tsx'
---

# Design: navigation

- **BAP-086** `BackofficeNav` (Figma "Navegação do backoffice", device × role) and `NavItem` (device × active) only list routes that exist: organizer has Eventos, admin has Organizadores.
- **BAP-087** The mockup's Membros, Métricas ao vivo and Auditoria, the counters and the company data come with their own subtasks.
- **BAP-088** Both roles have a context card on the desktop sidebar. The admin card is static ("Plataforma · Administração PulsePass").
- **BAP-089** The organizer card shows the eyebrow "Empresa" and the company name from `/auth/me` (`legal_person.name`, `title-s`, at most three lines, `break-words`), without the mockup's CNPJ line, which the profile does not carry.
- **BAP-090** Desktop (from `md`): dark sidebar (`--sidebar-width`, `100dvh` sticky), active item in sky aqua with dark text and `aria-current="page"`, focus outline in `text-inverse` on the dark surface.
- **BAP-091** Mobile: light bar with logo, initials and a menu button (44 px, `aria-expanded`, `aria-controls`), with the sections as chips below.
- **BAP-092** Esc and an outside click close the mobile menu, and Esc returns focus to the button.
- **BAP-093** The user name falls back to "Conta" and wraps in two lines at most.
