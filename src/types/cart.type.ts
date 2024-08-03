import { Product, ProductVariantsResponse } from './product.type'

export interface CartItemRequest {
  productId: string
  shopId: string
  productVariantId: string
  quantity: number
}

export interface CartItemResponse {
  id: string
  shopId: string
  quantity: number
  productVariant: ProductVariantsResponse
  product: Product
}
