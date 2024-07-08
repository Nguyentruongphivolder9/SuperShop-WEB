import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'
import CategoriesManagement from 'src/pages/Admin/pages/CategoriesManagement'
import DashBoard from 'src/pages/Admin/pages/Dashboard'

function ProtectedRouteAdmin() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const AdminRoutes = [
  {
    // path: '',
    // element: <ProtectedRouteAdmin></ProtectedRouteAdmin>,
    // children: [
    //   {
    path: path.adminSuperShop,
    element: <AdminLayout />,
    children: [
      {
        path: path.adminSuperShop,
        element: <DashBoard />
      },
      {
        path: path.adminCategories,
        element: <CategoriesManagement />
      }
    ]
    //   }
    // ]
  }
]

export default AdminRoutes
