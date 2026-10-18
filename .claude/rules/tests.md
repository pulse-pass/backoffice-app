---
description: Testing strategy and conventions
paths:
  - "src/**/*.test.ts"
  - "src/**/*.test.tsx"
---

# Tests

- Request payloads in integration tests are declared in a single expression with `Map.of` and `List.of`, nested objects and lists included, never with `new HashMap<>()` plus `put`, `new ArrayList<>(List.of(...))` or JSON concatenated in a string. Above 10 entries use `Map.ofEntries(Map.entry(...), ...)`. `HashMap` is only for a test that needs an explicit `null` value or a mutable map. In TypeScript the equivalent is a typed object literal.
