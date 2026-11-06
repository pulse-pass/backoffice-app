---
description: Deviations from the mockup on the organizers screen, detail and actions
paths:
  - 'src/app/*/organizadores/**'
---

# Design: organizers

## List and detail

- **BAP-094** `/organizadores` (admin, inside `BackofficeLayout`) follows mockups 08 and 08b for the list and the detail, which carry the actions.
- **BAP-095** No counts in the tabs or in the header eyebrow (no endpoint counts by status; the eyebrow is only "Administração"), and no coral counter in the navigation.
- **BAP-096** No `ORG-xxxx` code, since the API has none: the detail header shows "Criado em <date> às <time>" and "Última atualização <date> às <time>" in DM Mono.
- **BAP-097** No owner name in the row: the list endpoint does not carry it, and loading it per row would be one request per company. The row shows razão social, CNPJ, "Criado em" and the badge.
- **BAP-098** No events/team line in the approved detail (data not available).
- **BAP-099** The detail shows the contact with e-mail and the phones, one per line, because a company can have several.
- **BAP-100** The company block of the detail also shows "Tipo da empresa", "Faturamento mensal" and "Endereço" (logradouro and number, complement, neighborhood, CEP with mask), all with `break-words`; mockups 08 and 08b do not have them.
- **BAP-101** The list is paged by 30 with a "Carregar mais" outline button, shown only when the last page came full, instead of the mockup's fixed list.
- **BAP-102** The search is debounced (300 ms) and sends one field: text made only of digits, `.`, `/` or `-` goes as the CNPJ, anything else as the name.
- **BAP-103** The search field is a `SearchField` (`type="search"`, 16 px, `sr-only` label "Buscar por razão social ou CNPJ") instead of a visible label.
- **BAP-105** Tabs keep automatic activation by arrow keys, because stale requests are discarded.

## Selection

- **BAP-106** Nothing is pre-selected on any width.
- **BAP-107** The desktop right column shows an `EmptyState` ("Selecione uma empresa para ver os dados.") only while the list has items and nothing is selected; first load, empty list, search without result and list error leave the column empty.
- **BAP-108** The selection survives crossing 1024 px: only the detail position changes (beside the list on desktop, below the row on mobile).
- **BAP-109** The row is a button with `aria-expanded` on both widths, never `aria-current` or `aria-pressed`, because clicking the selected row closes the detail.
- **BAP-110** `aria-controls` of the row points at the detail ids while it is selected.
- **BAP-111** Reloading the list (tab or search) clears the selection only when the selected company is not in the new list.
- **BAP-112** The selected row has a 2 px sky aqua border (`border-2` always, so the row does not shift) instead of the mockup's 1 px lighter border plus outline.
- **BAP-113** Sky aqua is 2.1:1 on white, so the selection never depends on it alone: the desktop arrow goes from `text-text-secondary` to an inverted square (`bg-bg-inverse text-text-inverse`), and on mobile the open inline detail is the signal.
- **BAP-115** Opening a row scrolls its list item into view (`block: 'nearest'`, `scroll-my-md`) once the detail finishes loading (success or error), so the measured height is final. On desktop the inline detail is `display: none` and only the row comes into view; on mobile the open inline detail comes along instead of staying off screen.
- **BAP-116** That scroll never happens on close, nor when the list reloads keeping the selection; it is smooth only without `prefers-reduced-motion`.

## Layout

- **BAP-117** Two columns start at `lg` (1024 px), not `md`: next to the sidebar the content is only about 400 px wide at 768 px.
- **BAP-118** At `lg` the columns are equal; from `xl` the detail has the fixed width `--column-detail` and the list takes the rest, which keeps the row on one line.
- **BAP-119** Below `lg` the tabs become the native `StatusFilter` select ("Situação: Pendentes") and the detail opens inline below the tapped row.
- **BAP-120** The list wrapper is always `role="tabpanel"` labelled by the active tab.
- **BAP-124** On desktop the detail sits in a sticky column that scrolls inside itself and is focusable, so keyboard users can scroll it.
- **BAP-125** The inline instance has no wrapper, no inner scroll and is not focusable.

## Loading and results

- **BAP-127** On a reload the old items stay with `aria-busy="true"`, `inert` and reduced opacity.
- **BAP-128** Selection and detail only change when the new list is in.
- **BAP-129** A search equal to the applied one (same `name`/`document_number`) does not reload.
- **BAP-130** "Carregar mais", retry and the empty message use the applied search, not the typed one.
- **BAP-132** A total that is an exact multiple of 30 shows one extra "Carregar mais" that answers an empty page (accepted).
- **BAP-133** Results are announced by an always-mounted `role="status"` `sr-only` region in `PageView`: "N empresas", "Nenhuma empresa encontrada" and "Mais N empresas carregadas".
- **BAP-134** The detail opens without animation: it is a frequent action and the content changes place.
- **BAP-135** Loading, empty, search-without-result and error states reuse `role="status"`, `EmptyState` and the error toast; the list error block and the detail error carry "Tentar de novo".

## Actions

- **BAP-136** The detail ends with `OrganizerActions` (route component), shown only once the company data loaded.
- **BAP-138** `REJECTED` and `DELETED` have no actions.
- **BAP-139** The reasons are fetched once, on the first open of a pending company, and not again while the list stays empty.
- **BAP-141** On failure a toast plus a short message and "Tentar de novo" replace the select; an empty list (no error) shows "Nenhum motivo de reprovação disponível." with the same retry. In both cases Reprovar is disabled.
- **BAP-146** While a request is in flight the buttons of any company stay disabled, even after closing and reopening the detail.
- **BAP-149** The reload after a success uses the status and the applied search at the moment of the response, not the ones captured at the click.
- **BAP-150** The organization status `ERROR` does not exist in the app: no tab, badge or alert, and the analysis is done outside the screens.
- **BAP-151** When the approval answers 422 `ORG00005`, the toast shows the API message, the detail closes and the tab reloads, because the company left the pending list.
- **BAP-152** An owner in that status sees the awaiting approval state in `/situacao`.
- **BAP-153** The reason is chosen in a `Select` fed by the reasons table, not free text; the removal has no reason field.
- **BAP-154** The footnote promises no e-mail ("mostra o motivo na tela de situação").
- **BAP-155** The removal alert text does not mention members, events or the audit ("A dona deixa de entrar no backoffice. A empresa fica na aba Removidos.").
- **BAP-156** "Remover empresa" comes before the confirmation block, which the mockup shows already open; Aprovar has no confirmation.
- **BAP-157** Reprovar without a reason shows the local error "Selecione o motivo para reprovar." on the `Select` and moves the focus to it.
- **BAP-158** The Reprovar button is never disabled for a missing reason; only while the reasons load, when the list is empty or failed, or while an action runs.
- **BAP-159** The footnote keeps the mockup's 2 px lemon-lime left border even though `craft-floor` discourages colored side borders above 1 px: it is the identity of that note and carries no state.
- **BAP-160** Opening the removal confirmation focuses the alert (`tabIndex={-1}`, `preventScroll`) and scrolls the whole block (alert plus Cancelar/Confirmar) into view with `block: 'nearest'` and `scroll-my-md`.
- **BAP-161** That scroll keeps the buttons from ever staying below the fold of the side column and is smooth only without `prefers-reduced-motion`; Cancelar returns the focus to "Remover empresa".
- **BAP-163** Success: success toast, the focus goes to the tab panel (`tabIndex={-1}`, labelled by the active tab) so the position stays in the list after the detail unmounts, the selection closes and the current tab reloads.
- **BAP-164** A success for a company that is no longer selected only reloads.
- **BAP-165** Error: the API message toast and the detail stays open; the pending state is released whichever company is selected, because it belongs to the request.
