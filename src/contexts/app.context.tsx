import { createContext, useEffect, useState } from 'react'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLs } from 'src/utils/auth'
import categoryApi from 'src/apis/category.api'
import { useQuery } from '@tanstack/react-query'
import { CategoryResponse } from 'src/types/category.type'
import config from 'src/constants/config'
import ContainerModal from 'src/components/ContainerModal'
import { CartItemResponse } from 'src/types/cart.type'
import cartApi from 'src/apis/cart.api'
import { Pagination } from 'src/types/utils.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  categories: CategoryResponse[] | null
  setCategories: React.Dispatch<React.SetStateAction<CategoryResponse[] | null>>
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
  setIsModal: React.Dispatch<React.SetStateAction<boolean | false>>
  setChildrenModal: React.Dispatch<React.SetStateAction<React.ReactNode | null>>
  cartItems: Pagination<CartItemResponse[]> | null
  setCartItems: React.Dispatch<React.SetStateAction<Pagination<CartItemResponse[]> | null>>
}

// interface ChildrenProp {
//   children: React.ReactNode
// }

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()), // getAccessTokenFromCookies(),
  setIsAuthenticated: () => null,
  profile: getProfileFromLs() as User,
  setProfile: () => null,
  categories: null,
  setCategories: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null,
  reset: () => null,
  setChildrenModal: () => null,
  setIsModal: () => null,
  cartItems: null,
  setCartItems: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchase)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [categories, setCategories] = useState<CategoryResponse[] | null>(initialAppContext.categories)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [childrenModal, setChildrenModal] = useState<React.ReactNode>(null)
  const [cartItems, setCartItems] = useState<Pagination<CartItemResponse[]> | null>(initialAppContext.cartItems)

  const reset = () => {
    setIsAuthenticated(false)
    setExtendedPurchase([])
    setProfile(null)
  }

  const { data: categoriesData } = useQuery({
    queryKey: [config.GET_CATEGORIES_QUERY_KEY],
    queryFn: () => categoryApi.getCategories(),
    enabled: isAuthenticated
  })

  const { data: listCartData } = useQuery({
    queryKey: [config.GET_LIST_CART_QUERY_KEY],
    queryFn: () => cartApi.getListCart(),
    enabled: isAuthenticated
  })

  useEffect(() => {
    setCategories(categoriesData?.data.body as CategoryResponse[])
    setCartItems(listCartData?.data.body as Pagination<CartItemResponse[]>)
  }, [categoriesData, listCartData])

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        categories,
        setCategories,
        extendedPurchase,
        setExtendedPurchase,
        reset,
        setChildrenModal,
        setIsModal,
        cartItems,
        setCartItems
      }}
    >
      {isModal && <ContainerModal>{childrenModal}</ContainerModal>}
      {children}
    </AppContext.Provider>
  )
}
