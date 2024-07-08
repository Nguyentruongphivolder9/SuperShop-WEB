import { FormDataProduct } from 'src/contexts/productAdd.context'
import { PreviewImagesResponse, Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  },
  productCreate(body: FormDataProduct) {
    console.log(body)

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
