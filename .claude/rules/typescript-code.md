---
description: General TypeScript and React code rules
paths:
  - 'src/**/*.ts'
  - 'src/**/*.tsx'
  - 'src/**/*.css'
---

# TypeScript: code

- **BAP-233** `npm run lint` and `npm run format:check` must pass.
- **BAP-234** No `any` (ESLint error); use `unknown` and narrow it.
- **BAP-235** Module order: types, constants, declarative maps (`RULES`, `MASKS`), private helpers in the order they are used, then the export (or exports) at the end.
- **BAP-236** No comments in code or CSS: names and structure must explain the code, and decisions go to the rules, the README or the task notes.
- **BAP-238** Code (names, logs) is in English; every user-facing text is in pt-BR.
- **BAP-239** Base components receive `ref` as a prop (`ref?: Ref<HTMLElement>`, React 19), never `forwardRef`.
- **BAP-240** React 19 event types: `SubmitEvent` for form submit and `ChangeEvent` for inputs; `FormEvent` is deprecated.
- **BAP-241** No destructuring just to shorten access: read the page state, stores and props objects through their path (`state.form.data`, `sessionStore.role`), so every read is visibly fresh and the same value is never read in two ways.
- **BAP-242** Destructuring is only for separating values (`...rest` props in a base component), component parameters (`function PageView({ formData, ... })`) and the fields of a function result used right away.
- **BAP-243** An effect that reacts to a MobX store has no dependency array: the `observer` component re-renders when the store changes and the effect runs after each render. Never list store values as dependencies.
- **BAP-244** The `observer` only re-renders for observables read during render, so read the values the effect uses in the component body first (`const isHydrated = sessionStore.isHydrated`) and use those locals in the effect.
- **BAP-245** The initial load is `useEffect(() => { void loadList(...); return invalidateRequests }, [loadList, invalidateRequests])`.
- **BAP-246** `loadList` is a `useCallback` with no dependencies (only refs, `setState` and module functions) that never sets state before its first `await`; the handler that calls it sets the start-of-request state.
- **BAP-247** The cleanup bumps the request counters and clears the debounce, so no toast or `setState` fires after leaving the route (and the StrictMode double mount discards the first request).
- **BAP-248** `try/catch` only around the call that throws; what runs after a successful call goes after the block.
- **BAP-249** No defensive validation beyond the form rules.
- **BAP-250** Conditional class names use `classNames(...)` (`src/utils/class-name.handlers.ts`), not template strings.
