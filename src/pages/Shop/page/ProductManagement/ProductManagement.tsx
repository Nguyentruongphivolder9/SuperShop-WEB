import { Link, NavLink, Outlet } from 'react-router-dom'
import path from 'src/constants/path'

export default function ProductManagement() {
  return (
    <div className='w-full'>
      <div className='h-10 w-full mb-4 flex flex-row justify-between items-center'>
        <div className='text-xl'>Product</div>
        <Link
          to={path.productAdd}
          className='bg-blue h-full flex items-center justify-center rounded-md px-4 text-white'
        >
          Add a new product
        </Link>
      </div>
      <div className='flex flex-row items-center h-14'>
        <NavLink
          to={'/shopchannel/portal/product/list/all'}
          className='h-full flex items-center text-md text-[#333333] hover:text-blue px-4'
        >
          All
        </NavLink>
        <NavLink
          to={'/shopchannel/portal/product/list/live/all'}
          className='h-full flex items-center text-md text-[#333333] hover:text-blue px-4'
        >
          Live (0)
        </NavLink>
        <NavLink to={'#'} className='h-full flex items-center text-md text-[#333333] hover:text-blue px-4'>
          Violation (0)
        </NavLink>
        <NavLink to={'#'} className='h-full flex items-center text-md text-[#333333] hover:text-blue px-4'>
          Under Super Shop Review (0)
        </NavLink>
        <NavLink to={'#'} className='h-full flex items-center text-md text-[#333333] hover:text-blue px-4'>
          Unpublished (0)
        </NavLink>
      </div>
      <div className='w-full bg-white rounded-xl px-6 pt-2 pb-6 shadow-sm'>
        <Outlet />
      </div>
    </div>
  )
}
