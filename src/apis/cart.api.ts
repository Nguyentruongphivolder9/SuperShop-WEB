import { CartItemRequest } from 'src/types/cart.type'
import { Pagination, SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const cartApi = {
  getListCart() {
    return http.get<SuccessResponse<Pagination<CartItemRequest[]>>>(`cart`)
  },
  addToCart(body: CartItemRequest) {
    return http.post<SuccessResponse<string>>(`cart`, body)
  }
}

export default cartApi
