import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import useQueryParams from './useQueryParams'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
// export interface ProductListConfig {
//   page?: number | string
//   limit?: number | string
//   sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
//   order?: 'asc' | 'desc'
//   exclude?: string
//   rating_filter?: number | string
//   price_max?: number | string
//   price_min?: number | string
//   name?: string
//   category?: string
// }

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 15,
      sort_by: queryParams.sort_by,
      category: queryParams.category,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      exclude: queryParams.exclude
    },
    isUndefined
  )

  return queryConfig
}
