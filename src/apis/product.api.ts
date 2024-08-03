import { FormDataProduct } from 'src/contexts/productAdd.context'
import { FormDataEditProduct } from 'src/contexts/productEdit.context'
import { PreviewImagesResponse, Product } from 'src/types/product.type'
import { Pagination, SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const productApi = {
  getProducts() {
    return http.get<SuccessResponse<Pagination<Product[]>>>('products')
  },
  getProductById(id: string, shopId: string) {
    return http.get<SuccessResponse<Product>>(`products/${id}/shop/${shopId}`)
  },
  getProductByIdForEdit(id: string) {
    return http.get<SuccessResponse<Product>>(`products/${id}/shop/edit`)
  },
  productCreate(body: FormDataProduct) {
    return http.post<SuccessResponse<string>>('products', body)
  },
  productUpdate(body: FormDataEditProduct) {
    return http.put<SuccessResponse<string>>(`products/${body.id}/shop/edit`, body)
  },
  preCheckImageInfoProCreate(body: FormData) {
    return http.post<SuccessResponse<PreviewImagesResponse[]>>('preview-images', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  preCheckImageInfoProRemove(id: string) {
    return http.delete<SuccessResponse<null>>(`preview-images/${id}`)
  },
  getListProductInterest() {
    return http.get<SuccessResponse<Product[]>>(`products-interest`)
  },
  addToListProductInterest(productId: string, shopId: string) {
    return http.get<SuccessResponse<Product>>(`products-interest/${productId}/shop/${shopId}`)
  }
}

export default productApi
