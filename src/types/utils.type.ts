export interface SuccessResponse<Data> {
  message: string
  data: Data
  statusCode: string
}
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
