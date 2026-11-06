---
description: Form objects, rules, masks and field errors
paths:
  - 'src/services/**/forms/**'
  - 'src/app/**/page.tsx'
  - 'src/utils/form.handlers.ts'
  - 'src/services/**/*.handlers.ts'
---

# TypeScript: forms

- **BAP-251** A form is named after the action it submits and lives in `src/services/<resource>/forms/<action>-<resource>.form.ts` (`create-legal-person.form.ts`), with its types in `.form.types.ts`.
- **BAP-252** It exports a single object `<action><Resource>Form` typed as `Form<Data, FieldKey, Section, Request>` (`src/utils/form.handlers.ts`); pages call `createLegalPersonForm.validate(data)`, never one loose export per function.
- **BAP-253** Members in this order: `fields`, `initialData`, `update`, `validateField`, `validate`, `isSectionValid`, `toRequest`.
- **BAP-254** Field rules are declarative: a `RULES: Record<FieldKey, FieldRule[]>` built with the generic validators of `form.handlers.ts` (`required`, `minLength`, `maxLength`, `valid`), never a `switch`.
- **BAP-255** Masks are a `MASKS` map from field to a `format*` function.
- **BAP-256** The field order is the order of `RULES`, which must match the order on screen.
- **BAP-257** Form types are in snake_case, grouped by section (`company`, `owner`), with masked values as strings.
- **BAP-258** The field key is derived from the data (`` `company.${keyof CompanyFormData}` ``).
- **BAP-259** Mask on `update`, unmask only in `toRequest`.
- **BAP-260** Fixed lists that feed a `Select` and the admin detail (`COMPANY_TYPES` in `legal-person.handlers.ts`: API value plus pt-BR label) are a declarative map in the resource `.handlers.ts`, so the form and the detail share one list.
- **BAP-261** A select field is a string in the form data (empty until chosen), its rule is `valid(isCompanyType, ...)` and `toRequest` narrows it to the API union.
- **BAP-262** A section's optional field (`address.complement`) has only a `maxLength` rule and goes to the request as `undefined` when blank.
- **BAP-263** Field refs (`registerField`) accept `HTMLInputElement | HTMLSelectElement` (`FieldElement`), so the first invalid field takes focus whichever control it is.
- **BAP-264** Field errors are only the client-side validation that runs before the request (on blur of a touched field and on submit, focusing the first invalid field).
- **BAP-265** A gateway error never marks a field.
