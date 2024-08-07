import { Product, ProductVariantsResponse } from './product.type'

export interface CartItemRequest {
  productId: string
  shopId: string
  productVariantId: string
  quantity: number
}

export interface CartItemResponse {
  id: string
  quantity: number
  productVariantId: string
  product: Product
  createdAt: string
  updatedAt: string
}
