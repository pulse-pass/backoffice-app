---
description: Generic helpers, currency and date formatting
paths:
  - 'src/utils/**'
---

# TypeScript: utils

- **BAP-354** `src/utils/` holds only generic language helpers that know nothing about the product: masks and check digits, currency, generic validators (`form.handlers.ts`), `classNames`, `getInitials`.
- **BAP-355** Business rules (which role wins, which area a role opens, what a status means) never go there: they live in the store or service of the resource (`sessionStore.role`, `sessionStore.areaPath`).
- **BAP-356** Currency: `formatCurrencyInput` is the typed mask, in reais with optional decimals after a comma (`25000` shows `R$ 25.000`).
- **BAP-357** `completeCurrencyInput` runs on blur and fills the two decimals (`R$ 25.000,00`); `parseCurrency` gives the number sent in the request and `formatCurrency` is for display.
- **BAP-358** Dates from the API are ISO 8601 instants in UTC (`...Z`) and are shown in the `America/Sao_Paulo` time zone.
- **BAP-359** `date.handlers.ts` (`formatDate` `03.11.2026`, `formatTime` `19:50`, `formatDateTime` `03.11 19:50`) formats them with `Intl.DateTimeFormat` and `timeZone`, never by slicing the string, which would show the UTC time.
