export interface PaginationResponse {
  page: number
  page_size: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationResponse
}
