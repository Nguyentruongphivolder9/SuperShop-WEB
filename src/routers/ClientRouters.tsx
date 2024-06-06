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

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
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
      {
        path: path.cart,
        element: (
          <CartLayout>
            <Suspense>
              <Cart></Cart>
            </Suspense>
          </CartLayout>
        )
      },
      {
        path: path.user,
        element: (
          <MainLayout>
            <UserLayout></UserLayout>
          </MainLayout>
        ),
        children: [
          {
            path: path.profile,
            element: (
              <Suspense>
                <Profile></Profile>
              </Suspense>
            )
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
          }
        ]
      }
    ]
  },
  {
    index: true,
    path: '/',
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
