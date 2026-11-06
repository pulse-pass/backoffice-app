---
description: Motion table and reduced-motion rules
paths:
  - 'src/**/*.tsx'
  - 'src/**/*.css'
---

# Design: motion

- **BAP-082** All motion follows the table below and is off under `prefers-reduced-motion`.

| Element                                | Trigger         | Properties                          | Duration       | Easing                                   |
| -------------------------------------- | --------------- | ----------------------------------- | -------------- | ---------------------------------------- |
| Button                                 | press           | `transform: scale(0.97)`            | 120 ms         | ease-out                                 |
| Button, link, field                    | hover/focus     | background/border color             | 150 ms         | ease                                     |
| Toast                                  | enters / leaves | Sonner default (transform, opacity) | Sonner default | Sonner default (respects reduced motion) |
| Field error                            | appears         | opacity 0→1                         | 150 ms         | ease-out                                 |
| Button spinner                         | submitting      | rotation                            | 700 ms/turn    | linear                                   |
| Toast close button                     | hover           | background color                    | 150 ms         | ease                                     |
| Mobile menu panel                      | opens           | opacity 0→1, `translateY(-4px→0)`   | 150 ms         | ease-out                                 |
| Mobile menu panel                      | closes          | opacity 1→0                         | 100 ms         | ease-out                                 |
| Nav item                               | hover/focus     | background color                    | 150 ms         | ease                                     |
| Tab                                    | hover/active    | text and underline color            | 150 ms         | ease                                     |
| Organizer row                          | hover/selected  | border and background color         | 150 ms         | ease                                     |
| Select                                 | focus/error     | border color (`motion-color`)       | 150 ms         | ease                                     |
| Removal confirmation (alert + buttons) | opens           | opacity 0→1, `translateY(4px→0)`    | 180 ms         | `cubic-bezier(0.23, 1, 0.32, 1)`         |

- **BAP-083** Under `prefers-reduced-motion` the spinner is the only exception: it keeps rotating slowly (1.4 s/turn, linear) because it communicates the submitting state.
- **BAP-084** Page changes, the "mostrar" password toggle and the side steps are not animated.
- **BAP-085** Never `transition: all`; never `ease-in`.
