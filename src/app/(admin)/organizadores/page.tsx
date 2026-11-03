'use client'

import { type ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

import { toast } from '@/lib/toast'
import type { PaginatedResponse } from '@/services/api/api.types'
import { getApiErrorMessage } from '@/services/api/api-error.handlers'
import { legalPersonApi } from '@/services/legal-person/legal-person.api'
import type { GetInternalLegalPersonResponse } from '@/services/legal-person/legal-person.types'
import { organizationApi } from '@/services/organization/organization.api'
import type {
  ListInternalOrganizationsParams,
  ListInternalOrganizationsResponse,
  OrganizationStatus,
} from '@/services/organization/organization.types'
import { onlyDigits } from '@/utils/document.handlers'

import type { OrganizersPageState } from './page.types'
import { PageView } from './PageView'

const DEBOUNCE_MS = 300
const INITIAL_DETAIL: OrganizersPageState['detail'] = {
  legalPerson: null,
  isLoading: false,
  hasError: false,
}
const INITIAL_STATE: OrganizersPageState = {
  filters: { status: 'PENDING', search: '' },
  list: {
    items: [],
    page: 1,
    hasMore: false,
    isLoading: true,
    isLoadingMore: false,
    hasError: false,
    appliedSearch: '',
    announcement: '',
  },
  selection: { organizationKey: null },
  detail: INITIAL_DETAIL,
}
const PAGE_SIZE = 30
type SearchFilters = Pick<ListInternalOrganizationsParams, 'name' | 'document_number'>

const SEARCH_DOCUMENT_PATTERN = /^[\d./-]+$/

const getSearchFilters = (search: string): SearchFilters => {
  const trimmed = search.trim()
  if (!trimmed) return {}
  if (!SEARCH_DOCUMENT_PATTERN.test(trimmed)) return { name: trimmed }
  const digits = onlyDigits(trimmed)
  return digits ? { document_number: digits } : {}
}

const getIsSameSearch = (first: string, second: string): boolean => {
  const firstFilters = getSearchFilters(first)
  const secondFilters = getSearchFilters(second)
  return (
    firstFilters.name === secondFilters.name && firstFilters.document_number === secondFilters.document_number
  )
}

const getListAnnouncement = (count: number, isFirstPage: boolean): string => {
  if (isFirstPage) {
    if (count === 0) return 'Nenhuma empresa encontrada'
    return count === 1 ? '1 empresa' : `${count} empresas`
  }
  if (count === 0) return ''
  return count === 1 ? 'Mais 1 empresa carregada' : `Mais ${count} empresas carregadas`
}

function OrganizersPage() {
  const [state, setState] = useState<OrganizersPageState>(INITIAL_STATE)
  const requestIdRef = useRef(0)
  const detailRequestIdRef = useRef(0)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const selectedKeyRef = useRef<string | null>(null)

  const clearDebounce = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = null
  }, [])

  const invalidateRequests = useCallback(() => {
    requestIdRef.current += 1
    detailRequestIdRef.current += 1
    clearDebounce()
  }, [clearDebounce])

  const loadDetail = async (legalPersonKey: string) => {
    const requestId = ++detailRequestIdRef.current
    setState((current) => ({ ...current, detail: { legalPerson: null, isLoading: true, hasError: false } }))
    let legalPerson: GetInternalLegalPersonResponse
    try {
      legalPerson = await legalPersonApi.getInternalLegalPerson(legalPersonKey)
    } catch (error) {
      if (requestId !== detailRequestIdRef.current) return
      toast.error(getApiErrorMessage(error))
      setState((current) => ({ ...current, detail: { legalPerson: null, isLoading: false, hasError: true } }))
      return
    }
    if (requestId !== detailRequestIdRef.current) return
    setState((current) => ({ ...current, detail: { legalPerson, isLoading: false, hasError: false } }))
  }

  const clearSelection = () => {
    selectedKeyRef.current = null
    detailRequestIdRef.current += 1
    setState((current) => ({
      ...current,
      selection: { organizationKey: null },
      detail: INITIAL_DETAIL,
    }))
  }

  const selectOrganization = async (organization: ListInternalOrganizationsResponse) => {
    selectedKeyRef.current = organization.organization_key
    setState((current) => ({ ...current, selection: { organizationKey: organization.organization_key } }))
    await loadDetail(organization.legal_person_key)
  }

  const loadList = useCallback(async (status: OrganizationStatus, search: string, page: number) => {
    const requestId = ++requestIdRef.current
    const isFirstPage = page === 1
    let response: PaginatedResponse<ListInternalOrganizationsResponse>
    try {
      response = await organizationApi.listInternalOrganizations({
        organization_status: status,
        ...getSearchFilters(search),
        page,
        page_size: PAGE_SIZE,
      })
    } catch (error) {
      if (requestId !== requestIdRef.current) return
      toast.error(getApiErrorMessage(error))
      if (isFirstPage) {
        detailRequestIdRef.current += 1
        selectedKeyRef.current = null
      }
      setState((current) => ({
        ...current,
        list: { ...current.list, isLoading: false, isLoadingMore: false, hasError: isFirstPage },
        selection: isFirstPage ? { organizationKey: null } : current.selection,
        detail: isFirstPage ? INITIAL_DETAIL : current.detail,
      }))
      return
    }
    if (requestId !== requestIdRef.current) return
    const keepsSelection =
      !isFirstPage || response.data.some((item) => item.organization_key === selectedKeyRef.current)
    if (!keepsSelection) {
      detailRequestIdRef.current += 1
      selectedKeyRef.current = null
    }
    setState((current) => {
      const knownKeys = new Set(current.list.items.map((item) => item.organization_key))
      const newItems = isFirstPage
        ? response.data
        : response.data.filter((item) => !knownKeys.has(item.organization_key))
      return {
        ...current,
        list: {
          ...current.list,
          items: isFirstPage ? newItems : [...current.list.items, ...newItems],
          page,
          hasMore: response.data.length === PAGE_SIZE,
          isLoading: false,
          isLoadingMore: false,
          hasError: false,
          announcement: getListAnnouncement(newItems.length, isFirstPage),
        },
        selection: keepsSelection ? current.selection : { organizationKey: null },
        detail: keepsSelection ? current.detail : INITIAL_DETAIL,
      }
    })
  }, [])

  const requestList = (status: OrganizationStatus, search: string, page: number) => {
    setState((current) => ({
      ...current,
      list:
        page === 1
          ? { ...current.list, appliedSearch: search, isLoading: true, hasError: false, announcement: '' }
          : { ...current.list, isLoadingMore: true, announcement: '' },
    }))
    return loadList(status, search, page)
  }

  useEffect(() => {
    void loadList(INITIAL_STATE.filters.status, INITIAL_STATE.filters.search, 1)
    return invalidateRequests
  }, [loadList, invalidateRequests])

  const handleStatusChange = (status: OrganizationStatus) => {
    if (status === state.filters.status) return
    clearDebounce()
    setState((current) => ({ ...current, filters: { ...current.filters, status } }))
    void requestList(status, state.filters.search, 1)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    const status = state.filters.status
    setState((current) => ({ ...current, filters: { ...current.filters, search } }))
    clearDebounce()
    if (getIsSameSearch(search, state.list.appliedSearch)) return
    debounceRef.current = setTimeout(() => {
      void requestList(status, search, 1)
    }, DEBOUNCE_MS)
  }

  const handleSelect = (organization: ListInternalOrganizationsResponse) => {
    if (state.selection.organizationKey !== organization.organization_key) {
      void selectOrganization(organization)
      return
    }
    clearSelection()
  }

  const handleLoadMore = () =>
    requestList(state.filters.status, state.list.appliedSearch, state.list.page + 1)

  const handleRetryList = () => requestList(state.filters.status, state.list.appliedSearch, 1)

  const selectedOrganization =
    state.list.items.find((item) => item.organization_key === state.selection.organizationKey) ?? null

  const handleRetryDetail = () => {
    if (selectedOrganization) void loadDetail(selectedOrganization.legal_person_key)
  }

  return (
    <PageView
      filters={state.filters}
      list={state.list}
      selectedOrganization={selectedOrganization}
      detail={state.detail}
      onStatusChange={handleStatusChange}
      onSearchChange={handleSearchChange}
      onSelect={handleSelect}
      onLoadMore={handleLoadMore}
      onRetryList={handleRetryList}
      onRetryDetail={handleRetryDetail}
    />
  )
}

export default OrganizersPage
