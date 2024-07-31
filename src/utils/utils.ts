import axios, { AxiosError } from 'axios'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { ErrorResponse } from 'src/types/utils.type'
import { format } from 'date-fns'
import { ProductVariantsResponse } from 'src/types/product.type'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}
export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  )
}

export function formatCurrency(currency: number) {
  return Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumbertoSocialStyle(value: number) {
  return Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace(',', '.')
    .toLowerCase()
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

const removeSpecialCharacter = (str: string) => {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

// export const removeBakcSpaceCharacter = (str: string)

export const generateNameId = ({ name, id, shopId }: { name: string; id: string; shopId: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i.${id}.${shopId}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i.')
  const productInfo = arr[1].split('.')
  return { id: productInfo[0], shopId: productInfo[1] }
}

export const generateCategoryNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-cat.${id}`
}

export const getIdFromCategoryNameId = (nameId: string) => {
  const arr = nameId.split('-cat.')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string) => {
  return avatarName ? `${config.baseURL}images/${avatarName}` : ''
}

export const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}

export const imageFileConvertToUrl = (file: File) => {
  return URL.createObjectURL(file)
}

export const formatDateTime = (date: string) => {
  const convertDate = new Date(date)
  return format(convertDate, 'yyyy-MM-dd kk:mm')
}

export const formatText = (text: string) => {
  let value
  if (text.trim().length < 1) {
    value = text.trim()
  } else {
    value = text.replace(/\s\s+/g, ' ')
  }
  return value
}

export const calculateLowestPrice = (productVariants: ProductVariantsResponse[]): number => {
  return productVariants.reduce((lowestPrice, variant) => {
    return variant.price < lowestPrice ? variant.price : lowestPrice
  }, productVariants[0]?.price || 0)
}

export const calculateHighestPrice = (productVariants: ProductVariantsResponse[]): number => {
  return productVariants.reduce((highestPrice, variant) => {
    return variant.price > highestPrice ? variant.price : highestPrice
  }, productVariants[0]?.price || 0)
}

export const calculateFromToPrice = (productVariants: ProductVariantsResponse[]): string => {
  const highestPrice = calculateHighestPrice(productVariants)
  const lowestPrice = calculateLowestPrice(productVariants)
  if (highestPrice == lowestPrice) {
    return '₫' + `${formatCurrency(lowestPrice)}`
  }

  return '₫' + `${formatCurrency(lowestPrice)}` + ' - ₫' + `${formatCurrency(highestPrice)}`
}

export const calculateTotalStockQuantity = (productVariants: ProductVariantsResponse[]): number => {
  return productVariants.reduce((total, variant) => total + variant.stockQuantity, 0)
}
