import { SuccessResponse } from 'src/types/utils.type'
import { PaginationVoucherResponse, VoucherRequest, VoucherResponse } from 'src/types/voucher.type'
import http from 'src/utils/http'

const voucherApi = {
  createVoucher(body: VoucherRequest) {
    return http.post<SuccessResponse<VoucherResponse>>('vouchers', body)
  },
  getVouchers() {
    return http.get<SuccessResponse<PaginationVoucherResponse>>('vouchers')
  }
}

export default voucherApi
