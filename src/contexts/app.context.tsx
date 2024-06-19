import { yupResolver } from '@hookform/resolvers/yup'
import { createContext, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getProfileFromLs } from 'src/utils/auth'
import { productSchema, ProductSchema } from 'src/utils/validations/productValidation'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
  productMethods: UseFormReturn<FormDataProduct>
}

// interface ChildrenProp {
//   children: React.ReactNode
// }

type FormDataProduct = Pick<
  ProductSchema,
  | 'name'
  | 'price'
  | 'stockQuantity'
  | 'description'
  | 'isVariant'
  | 'isActive'
  | 'condition'
  | 'variantsGroup'
  | 'productImages'
  | 'productVariants'
>

const createProductSchema = productSchema.pick([
  'name',
  'price',
  'stockQuantity',
  'description',
  'isVariant',
  'isActive',
  'condition',
  'variantsGroup',
  'productImages',
  'productVariants'
])

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(false), // getAccessTokenFromCookies(),
  setIsAuthenticated: () => null,
  profile: getProfileFromLs(),
  setProfile: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null,
  reset: () => null,
  productMethods: {} as UseFormReturn<FormDataProduct>
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchase)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const productMethods = useForm<FormDataProduct>({
    defaultValues: {
      isVariant: false,
      productImages: [],
      variantsGroup: []
    },
    mode: 'onChange',
    resolver: yupResolver(createProductSchema)
  })

  const reset = () => {
    setIsAuthenticated(false)
    setExtendedPurchase([])
    setProfile(null)
  }
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchase,
        setExtendedPurchase,
        reset,
        productMethods
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
