import { VoucherSchema } from 'src/utils/validations/voucher.rules'

export interface Voucher {
  id: string
  name: string
  code: string
  voucherType: 'global' | 'shop' | 'shipping'
  discountType: 'fixed' | 'percentage'
  fixedAmount: number
  percentageAmount: number
  maximumDiscount: number
  minimumTotalOrder: number
  isLimit: boolean
  quantity: number
  maxDistribution: number
  status: string
  startDate: string
  endDate: string
}

export type VoucherRequest = Omit<VoucherSchema, 'startDate' | 'endDate'> & {
  startDate: string
  endDate: string
}

export type VoucherResponse = Voucher & {
  shopId: string
  status: string
}

export type PaginationVoucherResponse = {
  content: VoucherResponse[]
  pageable: Pageable
  metadata: Metadata
}

interface Pageable {
  pageNumber: number
  pageSize: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
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
