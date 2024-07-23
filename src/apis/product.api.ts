import { FormDataProduct } from 'src/contexts/productAdd.context'
import { PreviewImagesResponse, Product } from 'src/types/product.type'
import { Pagination, SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const productApi = {
  getProducts() {
    return http.get<SuccessResponse<Pagination<Product[]>>>('products')
  },
  getProductById(id: string) {
    console.log(id)
    return http.get<SuccessResponse<Product>>(`products/${id}`)
  },
  productCreate(body: FormDataProduct) {
    return http.post<SuccessResponse<string>>('products', body)
  },
  preCheckImageInfoProCreate(body: FormData) {
    return http.post<SuccessResponse<PreviewImagesResponse[]>>('preview-images', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  preCheckImageInfoProRemove(id: string) {
    return http.delete<SuccessResponse<null>>(`preview-images/${id}`)
  }
}

export default productApi
