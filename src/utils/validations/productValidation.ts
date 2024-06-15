import * as yup from 'yup'

const MAX_PRICE_VALUE = 120000000
const MIN_PRICE_VALUE = 1000
const MAX_STOCK_VALUE = 10000000
const MIN_STOCK_VALUE = 1

const handlePriceProductYup = (refBoolean: string) => {
  return yup
    .number()
    .transform((value, originalValue) => {
      return originalValue.trim() === '' ? null : value
    })
    .when(refBoolean, {
      is: true,
      then: (schema) => schema.notRequired().nullable(),
      otherwise: (schema) =>
        schema
          .required('This field cannot be empty')
          .max(MAX_PRICE_VALUE, 'Price has exceeded maximum value: ' + MAX_PRICE_VALUE)
          .min(MIN_PRICE_VALUE, 'The value should be at least ' + MIN_PRICE_VALUE)
    })
}
const handleStockQuantityProductYup = (refString: string) => {
  return yup
    .number()
    .transform((value, originalValue) => {
      return originalValue.trim() === '' ? null : value
    })
    .when(refString, {
      is: true,
      then: (schema) => schema.notRequired().nullable(),
      otherwise: (schema) =>
        schema
          .required('This field cannot be empty')
          .max(MAX_STOCK_VALUE, 'Stock should be more than 0 and less than ' + MAX_STOCK_VALUE)
          .min(MIN_STOCK_VALUE, 'The value should be at least ' + MIN_STOCK_VALUE)
    })
}

export const productSchema = yup.object({
  name: yup.string().trim().required('This field cannot be empty'),
  price: handlePriceProductYup('isVariant') as yup.NumberSchema<number | undefined, yup.AnyObject, undefined, ''>,
  stockQuantity: handleStockQuantityProductYup('isVariant') as yup.NumberSchema<
    number | undefined,
    yup.AnyObject,
    undefined,
    ''
  >,
  description: yup
    .string()
    .max(3000)
    .min(100, 'Your product description is too short. Please input at least 100 characters.'),
  isVariant: yup.boolean().required('This field cannot be empty'),
  productVariants: yup.array().of(
    yup.object({
      id: yup.string().required('This field cannot be empty'),
      price: yup
        .number()
        .required('This field cannot be empty')
        .max(MAX_STOCK_VALUE, 'Stock should be more than 0 and less than ' + MAX_STOCK_VALUE)
        .min(MIN_STOCK_VALUE, 'The value should be at least ' + MIN_STOCK_VALUE),
      stockQuantity: yup
        .number()
        .required('This field cannot be empty')
        .max(MAX_STOCK_VALUE, 'Stock should be more than 0 and less than ' + MAX_STOCK_VALUE)
        .min(MIN_STOCK_VALUE, 'The value should be at least ' + MIN_STOCK_VALUE),
      variantsGroup1: yup.string().required('This field cannot be empty'),
      variant1: yup.string().required('This field cannot be empty'),
      variantsGroup2: yup.string().required('This field cannot be empty'),
      variant2: yup.string().required('This field cannot be empty')
    })
  ),
  variantsGroup: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required('This field cannot be empty'),
        name: yup.string().required('This field cannot be empty'),
        isPrimary: yup.boolean().required('This field cannot be empty'),
        isActive: yup.boolean().required('This field cannot be empty'),
        variants: yup.array().of(
          yup.object({
            id: yup.string().required('This field cannot be empty'),
            isActive: yup.boolean().required('This field cannot be empty'),
            name: yup.string().required('This field cannot be empty'),
            imageUrl: yup.string().url('Invalid URL format').nullable()
          })
        )
      })
    )
    .test({
      name: 'unique-variantsGroup-names',
      message: 'Variant group names must be unique',
      test: function (value) {
        if (!value) return true

        const seenNames = new Set()
        let isValid = true

        value.forEach((group) => {
          if (seenNames.has(group.name)) {
            isValid = false
          } else {
            seenNames.add(group.name)
          }
        })

        return isValid
      }
    })
})
export type ProductSchema = yup.InferType<typeof productSchema>
