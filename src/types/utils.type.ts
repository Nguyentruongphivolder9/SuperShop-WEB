export interface SuccessResponse<Data> {
  body?: Data
  message: string
  statusCode: number
  timeStamp: string
}
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
