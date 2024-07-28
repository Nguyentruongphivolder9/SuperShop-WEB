import { SuccessResponse } from 'src/types/utils.type'
import { PaginationVoucherResponse, VoucherRequest, VoucherResponse } from 'src/types/voucher.type'
import http from 'src/utils/http'

const voucherApi = {
  createVoucher(body: VoucherRequest) {
    return http.post<SuccessResponse<VoucherResponse>>('vouchers', body)
  },
  getVouchers() {
    return http.get<SuccessResponse<PaginationVoucherResponse>>('vouchers')
  },
  async getVoucher(id: string) {
    return http.get<SuccessResponse<VoucherResponse>>(`vouchers/${id}`)
  },
  updateVoucher(formData: { id: string; body: VoucherRequest }) {
    return http.patch<SuccessResponse<VoucherResponse>>(`vouchers/${formData.id}`, formData.body)
  },
  deleteVoucher(id: string) {
    return http.delete<SuccessResponse<null>>(`vouchers/${id}`)
  }
}

export default voucherApi
