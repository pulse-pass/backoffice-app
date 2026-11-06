---
description: Deviations from the mockup on the registration screen
paths:
  - 'src/app/cadastro/**'
  - 'src/services/legal-person/forms/**'
---

# Design: registration

- **BAP-167** An e-mail already used by another company comes from the API (409 `ONB00010`) and is shown in a toast.
- **BAP-168** `/cadastro` follows mockup 02 with fields the mockup does not have, required at approval.
- **BAP-169** In Empresa: "Tipo da empresa" (`Select`, empty option "Selecione o tipo") and "Faturamento mensal" (`Field` with the `R$ 0,00` mask, `numeric`), after the phone in the two-column grid.
- **BAP-170** A new numbered section `02` "Endereço" sits between Empresa and the owner, so the owner section becomes `03`: CEP (`00000-000` mask), Logradouro, Número and Complemento (opcional) in two columns, Bairro.
- **BAP-171** `RegistrationIntro` lists the steps Dados da empresa, Endereço da empresa, Responsável pela conta and Análise da administração, and its text mentions the address.
- **BAP-172** On mobile every grid is a single column.
- **BAP-173** The new fields add no animation: they inherit the states of `Field` and `Select`.
