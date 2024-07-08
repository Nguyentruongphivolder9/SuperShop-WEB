import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

export default function NavShop() {
  return (
    <div className='fixed z-10 mt-14 sidebar-height overflow-y-auto no-scrollbar hover:scrollbar-webkit hover:scrollbar-thin'>
      <div className='h-auto w-[222px] bg-white pt-4 px-4'>
        <ul>
          <li className='mb-6'>
            <div className='flex flex-row justify-between items-center text-[#999999] py-[5px]'>
              <div className='flex flex-row justify-between gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184'
                  />
                </svg>
                <div className='text-sm font-semibold'>Order</div>
              </div>
              <div className=''>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                </svg>
              </div>
            </div>
            <ul className='pl-6'>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'#'}>My Order</NavLink>
              </li>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'#'}>Mass Ship</NavLink>
              </li>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'#'}>Cancellation</NavLink>
              </li>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'#'}>Return/Refund</NavLink>
              </li>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'#'}>Shipping Settings</NavLink>
              </li>
            </ul>
          </li>
          <li className='mb-6'>
            <div className='flex flex-row justify-between items-center text-[#999999] py-[5px]'>
              <div className='flex flex-row justify-between gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                  />
                </svg>

                <div className='text-sm font-semibold'>Product</div>
              </div>
              <div className=''>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                </svg>
              </div>
            </div>
            <ul className='pl-6'>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'/shopchannel/portal/product/list/all'}>My Products</NavLink>
              </li>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'/shopchannel/portal/product/new'}>Add New Product</NavLink>
              </li>
            </ul>
          </li>
          <li className='mb-6'>
            <div className='flex flex-row justify-between items-center text-[#999999] py-[5px]'>
              <div className='flex flex-row justify-between gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z'
                  />
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 6h.008v.008H6V6Z' />
                </svg>

                <div className='text-sm font-semibold'>Marketing Centre</div>
              </div>
              <div className=''>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                </svg>
              </div>
            </div>
            <ul className='pl-6'>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'#'}>Super Shop Ads</NavLink>
              </li>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'#'}>My Shop&apos;s Flash Sale</NavLink>
              </li>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={path.voucherShop}>Vouchers</NavLink>
              </li>
            </ul>
          </li>
          <li className='mb-6'>
            <div className='flex flex-row justify-between items-center text-[#999999] py-[5px]'>
              <div className='flex flex-row justify-between gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
                  />
                </svg>

                <div className='text-sm font-semibold'>Customer Service</div>
              </div>
              <div className=''>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                </svg>
              </div>
            </div>
            <ul className='pl-6'>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'#'}>Chat Management</NavLink>
              </li>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'#'}>Review Management</NavLink>
              </li>
            </ul>
          </li>
          <li className='mb-6'>
            <div className='flex flex-row justify-between items-center text-[#999999] py-[5px]'>
              <div className='flex flex-row justify-between gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184'
                  />
                </svg>
                <div className='text-sm font-semibold'>Finance</div>
              </div>
              <div className=''>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                </svg>
              </div>
            </div>
            <ul className='pl-6'>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'#'}>My Income</NavLink>
              </li>
            </ul>
          </li>
          <li className='mb-6'>
            <div className='flex flex-row justify-between items-center text-[#999999] py-[5px]'>
              <div className='flex flex-row justify-between gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z'
                  />
                </svg>

                <div className='text-sm font-semibold'>Shop</div>
              </div>
              <div className=''>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                </svg>
              </div>
            </div>
            <ul className='pl-6'>
              <li className='text-[#333333] text-[13px] hover:text-[#0099FF] py-[5px]'>
                <NavLink to={'#'}>Shop Information</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
