export interface SuccessResponse<Data> {
  body?: Data
  message: string
  statusCode: number
  timeStamp: string
}
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export interface ErrorServerResponse {
  response: {
    data: {
      error: string
      message: string
      statusCode: number
    }
  }
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export type Pagination<Data> = {
  content: Data
  pageable: Pageable
  metadata: Metadata
}

interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  paged: boolean
  unpaged: boolean
}
interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

interface Metadata {
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: Sort
  first: boolean
  numberOfElements: number
  empty: boolean
}
