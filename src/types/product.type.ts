export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
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
  price?: number
  stockQuantity?: number
  description?: string
  condition: string
  isVariant: boolean
  productVariantsRequest: ProductVariantsRequest[]
  variantsGroupRequest: VariantsGroupRequest[]
}

export interface VariantsGroupRequest {
  variants?: VariantsRequest[]
  name: string
  id: string
  isPrimary: boolean
  isActive: boolean
}

export interface VariantsRequest {
  id: string
  imageUrl?: string | null | undefined
  name: string
  isActive: boolean
}

export interface ProductVariantsRequest {
  id: string
  price: number
  stockQuantity: number
  variantsGroup1: string
  variant1: string
  variantsGroup2: string
  variant2: string
}
