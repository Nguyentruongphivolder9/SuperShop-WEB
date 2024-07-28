import { NavLink } from 'react-router-dom'
import BoxData from 'src/pages/Shop/components/BoxData'
import 'react-datepicker/dist/react-datepicker.css'

export default function AdvertiseManagement() {
  return (
    <div>
      <div className='relative border border-blue isolate overflow-hidden bg-white rounded-lg py-4 '>
        <div className='px-4 lg:px-16'>
          <div className='flex justify-between'>
            <h2 className='text-4xl font-bold tracking-tight text-blue '>ShopChannel Ads</h2>
            <div className='flex items-center'>
              <NavLink
                to={''}
                className='p-2 px-5 mr-5 bg-blue text-white font-semibold rounded-full shadow-md hover:bg-blue-300 focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-75'
              >
                Create New AD
              </NavLink>
              <NavLink
                to={''}
                className='p-2 px-5  bg-gray-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-300 focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-75'
              >
                Transaction History
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold tracking-tight text-black p-2  '> All Ads Performance : </h2>
        <div className='flex p-2'>
          <div></div>
          <button
            type='button'
            className='py-2.5 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-inheritance rounded-lg border border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            Export Data
          </button>
        </div>
      </div>
      <div className='flex justify-between py-4 sm:py-4'>
        <div>
          {' '}
          <BoxData title={'Impressions '} number={23} />
        </div>
        <div>
          {' '}
          <BoxData title={'Clicks'} number={23} />
        </div>
        <div>
          {' '}
          <BoxData title={'CTR'} number={23} />
        </div>
        <div>
          {' '}
          <BoxData title={'Expense '} number={23} />
        </div>
      </div>
      <h2 className='text-xl font-bold tracking-tight text-black p-2 px-5 '> All Ads List : </h2>
      <div className=' p-4 px-5 mb-3 '>
        <form>
          <label htmlFor='search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='search'
              id='search'
              className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search'
              required
            />
            <button
              type='submit'
              className='text-blue absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div>
        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  ADs
                </th>
                <th scope='col' className='px-6 py-3'>
                  Impressions
                </th>
                <th scope='col' className='px-6 py-3'>
                  Clicks
                </th>
                <th scope='col' className='px-6 py-3'>
                  CTR
                </th>
                <th scope='col' className='px-6 py-3'>
                  Expense
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  Apple MacBook Pro 17"
                </th>
                <td className='px-6 py-4'>Silver</td>
                <td className='px-6 py-4'>Laptop</td>
                <td className='px-6 py-4'>$2999</td>
                <td></td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  Microsoft Surface Pro
                </th>
                <td className='px-6 py-4'>White</td>
                <td className='px-6 py-4'>Laptop PC</td>
                <td className='px-6 py-4'>$1999</td>
                <td></td>
              </tr>
              <tr className='bg-white dark:bg-gray-800'>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  Magic Mouse 2
                </th>
                <td className='px-6 py-4'>Black</td>
                <td className='px-6 py-4'>Accessories</td>
                <td className='px-6 py-4'>$99</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
