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
- **BAP-362** The company contact field in `/cadastro` is "Celular" (mockup 02 says "Telefone"): the mask is always `(00) 00000-0000` and a landline is a local error, because the provider refuses it at approval.
- **BAP-170** A new numbered section `02` "Endereço" sits between Empresa and the owner, so the owner section becomes `03`: CEP (`00000-000` mask), Logradouro, Número and Complemento (opcional) in two columns, Bairro.
- **BAP-171** `RegistrationIntro` lists the steps Dados da empresa, Endereço da empresa, Responsável pela conta and Análise da administração, and its text mentions the address.
- **BAP-172** On mobile every grid is a single column.
- **BAP-173** The new fields add no animation: they inherit the states of `Field` and `Select`.
- **BAP-363** The CEP lookup starts when the field reaches 8 digits and differs from the last one looked up; fewer than 8 digits cancel it and go back to idle.
- **BAP-364** While it runs the CEP `Field` shows the hint "Buscando endereço…"; if it fails or times out (5 s) the hint is "Não foi possível buscar o endereço. Preencha os campos." and filling stays manual with no field error.
- **BAP-365** A CEP the lookup does not find is the field error "CEP não encontrado.", it blocks the submit and takes the focus like any other invalid field.
- **BAP-366** A found address replaces Logradouro and Bairro only with the values that come filled (a city-wide CEP keeps what was typed) and clears their errors; both stay editable.
- **BAP-367** Submitting while the lookup runs keeps the button loading and waits for the lookup that is current when each answer arrives (a CEP changed meanwhile is waited for, not cancelled), then validates the current data again: not found blocks the submit, found or failed lets it go with the values in the fields at that moment.
- **BAP-368** An answer for a CEP that is no longer the one in the field is discarded, and so is any answer after the route is left.
- **BAP-369** `AddressSection` always renders a `<p role="status" className="sr-only">` that announces the lookup hints and "CEP encontrado." when found (a city-wide CEP comes back without street and neighborhood, so it never says the address was filled), because the `Field` hint is conditional and is not a live region.
- **BAP-371** The same CEP is not looked up again while the lookup is loading, found or not found; after a failed lookup, typing or pasting the same CEP and blurring the CEP field with 8 digits look it up again.
