---
description: Deviations from the mockup on the status screen
paths:
  - 'src/app/situacao/**'
---

# Design: status

- **BAP-174** `/situacao` follows mockups 03 and 03b, with no `ORG-xxxx` code: the footer asks to quote the CNPJ instead.
- **BAP-175** No "Fazer novo cadastro" button on the rejected state.
- **BAP-176** The hero text does not promise an e-mail, since no notification exists.
- **BAP-177** A load error state is a toast with the API message plus a block with "Tentar de novo".
- **BAP-178** The time column of the current step reads "agora" and its three bars are static.
- **BAP-179** The current analysis step keeps the lemon-lime circle of the mockup because it is the in-progress state.
- **BAP-180** The rejected step uses a coral circle with an inline SVG "x".
- **BAP-181** The `DotRow` of the dark block is visible on mobile here.
- **BAP-183** On mobile the header has no "Sair": it is a full-width button at the end of the page, also present in the load error state.
- **BAP-184** The hero mentions the reason only when the API sends a description.
