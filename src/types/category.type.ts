export interface CategoryResponse {
  id: string
  name: string
  parentId: string
  isActive: boolean
  isChild: boolean
  categoriesChild: CategoryResponse[]
  categoryImages: CategoryImageResponse[]
}

export interface CategoryImageResponse {
  id: string
  imageUrl: string
}
