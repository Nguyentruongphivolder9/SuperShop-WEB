import { Suspense, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import CartLayout from 'src/layouts/CartLayout'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import Login from 'src/pages/Login'
import Cart from 'src/pages/Cart'
import NotFound from 'src/pages/NotFound'
import Register from 'src/pages/Register'
import ProductDetail from 'src/pages/ProductDetail'
import ProductList from 'src/pages/ProductList'
import UserLayout from 'src/pages/User/layouts/UserLayout'
import ChangePassword from 'src/pages/User/pages/ChangePassword'
import HistoryPurchase from 'src/pages/User/pages/HistoryPurchase'
import Profile from 'src/pages/User/pages/Profile'
import ShopLayout from 'src/layouts/ShopLayout'
import ShopChannel from 'src/pages/Shop/page/ShopChannel'
import cartRouter from './cartRouter'
import VoucherShop from 'src/pages/Shop/page/VoucherShop'
import ProductManagement from 'src/pages/Shop/page/ProductManagement'
import ProductsListActive from 'src/pages/Shop/page/ProductManagement/ProductsListActive'
import ProductAll from 'src/pages/Shop/page/ProductManagement/ProductsAll'
import ProductAdd from 'src/pages/Shop/page/ProductManagement/ProductAdd'
import Home from 'src/pages/Home'
import VoucherWallet from 'src/pages/User/pages/VoucherWallet'
import VoucherAdd from 'src/pages/Shop/page/VoucherShop/pages/VoucherAdd'

import AdvertiseManagement from 'src/pages/Shop/page/AdvertiseManagement'
import AdvertiseAdd from 'src/pages/Shop/page/AdvertiseManagement/AdvertiseAdd'
import { ProductAddProvider } from 'src/contexts/productAdd.context'
import RecommendationDaily from 'src/pages/RecommendationDaily'

import VoucherEdit from 'src/pages/Shop/page/VoucherShop/pages/VoucherEdit'
import { VoucherProvider } from 'src/contexts/voucher.context'
import ProductEdit from 'src/pages/Shop/page/ProductManagement/ProductEdit'
import { ProductEditProvider } from 'src/contexts/productEdit.context'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext) //
  // getcookies -> roles
  //if user -> <Outlet >
  // shop -> <Outlet context={[role]} />"
  // admin -> <Outlet context="admin" />"
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
const ClientRoutes = [
  {
    path: '',
    element: <RejectedRoute />,
    children: [
      {
        path: path.login,
        element: (
          <RegisterLayout>
            <Suspense>
              <Login></Login>
            </Suspense>
          </RegisterLayout>
        )
      },
      {
        path: path.register,
        element: (
          <RegisterLayout>
            <Suspense>
              <Register></Register>
            </Suspense>
          </RegisterLayout>
        )
      }
    ]
  },

  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      cartRouter,
      {
        path: path.user, // localhoas//user
        element: (
          <MainLayout>
            <UserLayout></UserLayout>
          </MainLayout>
        ),
        children: [
          {
            path: path.profile,
            element: <Profile></Profile>
          },
          {
            path: path.changePassword,
            element: (
              <Suspense>
                <ChangePassword></ChangePassword>
              </Suspense>
            )
          },
          {
            path: path.historyPurchase,
            element: (
              <Suspense>
                <HistoryPurchase></HistoryPurchase>
              </Suspense>
            )
          },
          {
            path: path.voucher,
            element: (
              <Suspense>
                <VoucherWallet></VoucherWallet>
              </Suspense>
            )
          }
        ]
      },
      {
        path: path.shopChannel,
        element: <ShopLayout />,
        children: [
          {
            path: '',
            element: <ShopChannel></ShopChannel>
          },
          {
            path: path.productManagement,
            element: <ProductManagement></ProductManagement>,
            children: [
              {
                path: path.productManagementAll,
                element: <ProductAll></ProductAll>
              },
              {
                path: path.productManagementActive,
                element: <ProductsListActive></ProductsListActive>
              }
            ]
          },
          {
            path: path.productAdd,
            element: (
              <ProductAddProvider>
                <ProductAdd></ProductAdd>
              </ProductAddProvider>
            )
          },
          {
            path: path.advertiseAdd,
            element: <AdvertiseAdd></AdvertiseAdd>
          },
          {
            path: path.advertiseManagement,
            element: <AdvertiseManagement></AdvertiseManagement>
          },
          {
            path: path.voucherShop,
            element: (
              <VoucherProvider>
                <VoucherShop></VoucherShop>
              </VoucherProvider>
            )
          },
          {
            path: path.voucherShopAdd,
            element: <VoucherAdd></VoucherAdd>
          },
          {
            path: path.voucherShopEdit,
            element: <VoucherEdit></VoucherEdit>
          },
          {
            path: path.productEdit,
            element: (
              <ProductEditProvider>
                <ProductEdit></ProductEdit>
              </ProductEditProvider>
            )
          }
        ]
      },
      {
        path: path.recommendationDaily,
        element: (
          <MainLayout>
            <Suspense>
              <RecommendationDaily></RecommendationDaily>
            </Suspense>
          </MainLayout>
        )
      }
    ]
  },
  // {
  //   path: path.emailVerify,
  //   element: (
  //     <MainLayout>
  //       <Suspense>
  //         <EmailVerfication></EmailVerfication>
  //       </Suspense>
  //     </MainLayout>
  //   )
  // },
  {
    path: path.category,
    element: (
      <MainLayout>
        <Suspense>
          <ProductList></ProductList>
        </Suspense>
      </MainLayout>
    )
  },
  {
    path: path.productDetail,
    element: (
      <MainLayout>
        <Suspense>
          <ProductDetail></ProductDetail>
        </Suspense>
      </MainLayout>
    )
  },
  {
    index: true,
    path: path.home,
    element: (
      <MainLayout>
        <Suspense>
          <Home></Home>
        </Suspense>
      </MainLayout>
    )
  },
  {
    path: '*',
    element: (
      <MainLayout>
        <Suspense>
          <NotFound></NotFound>
        </Suspense>
      </MainLayout>
    )
  }
]

export default ClientRoutes
