import { CategoryResponse } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<CategoryResponse[]>>('categories')
  },
  addCategory(body: FormData) {
    return http.post<SuccessResponse<CategoryResponse>>('categories', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export default categoryApi
