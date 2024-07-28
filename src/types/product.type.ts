import { CategoryResponse } from './category.type'

export interface Product {
  id: string
  shopId: string
  categoryId: string
  name: string
  price: number
  stockQuantity: number
  sold: number
  ratingStart: number
  description: string
  conditionProduct: string
  isVariant: boolean
  isActive: boolean
  productImages: ProductImagesResponse[]
  variantsGroup: VariantsGroupResponse[]
  productVariants: ProductVariantsResponse[]
  createdAt: string
  updatedAt: string
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category?: string
}

export interface ProductRequest {
  name: string
  categoryId: string
  price?: number
  stockQuantity?: number
  description?: string
  conditionProduct: string
  isVariant: boolean
  isActive: boolean
  productImages: PreviewImagesResponse[]
  productVariants?: ProductVariantsResponse[]
  variantsGroup?: VariantsGroupRequest[]
}

export interface VariantsGroupRequest {
  id: string
  name: string
  isPrimary: boolean
  variants: VariantsRequest[]
}

export interface VariantsRequest {
  id: string
  name: string
  variantImage?: PreviewImagesResponse
}

export interface ProductVariantsRequest {
  id: string
  price: number
  stockQuantity: number
  variantsGroup1Id: string
  variant1Id: string
  variantsGroup2Id?: string
  variant2Id?: string
}

export interface PreviewImagesResponse {
  id: string
  imageUrl: string
}

export interface ProductImagesResponse {
  id: string
  imageUrl: string
  isPrimary: boolean
}

export interface VariantsGroupResponse {
  id: string
  name: string
  isPrimary: boolean
  isActive: boolean
  variants: VariantsResponse[]
}

export interface VariantsResponse {
  id: string
  name: string
  imageUrl?: string | null | undefined
  isActive: boolean
}

export interface ProductVariantsResponse {
  id: string
  price: number
  stockQuantity: number
  variant1: VariantsResponse
  variant2: VariantsResponse
}
