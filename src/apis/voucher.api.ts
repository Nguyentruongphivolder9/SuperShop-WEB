import { SuccessResponse } from 'src/types/utils.type'
import { VoucherRequest, VoucherResponse } from 'src/types/voucher.type'
import http from 'src/utils/http'

const URL = 'vouchers'

const voucherApi = {
  createVoucher(body: VoucherRequest) {
    return http.post<SuccessResponse<VoucherResponse>>('vouchers', body)
  }
  // getVouchers() {
  //   return http.get<SuccessResponse<any>>(URL)
  // }
}
