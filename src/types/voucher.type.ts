export interface Voucher {
  id: string
  name: string
  code: string
  voucherType: 'global' | 'shop' | 'shipping'
  discountType: 'fixed' | 'percentage'
  discountAmount: number
  maximumDiscount?: number
  minimumTotalOrder: number
  isLimit: boolean
  quantity: number
  maxUsage: number
  maxDistribution: number
  status: string
  startDate: Date
  endDate: Date
}

export type VoucherRequest = Omit<Voucher, 'id' | 'status'>

export type VoucherResponse = Voucher & {
  status: string
}
