import { useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import CreateCategory from './CreateCategory'

export default function CategoriesManagement() {
  const queryConfig = useQueryConfig()
  const [isDisplayCateList, setIsDisplayCateList] = useState(false)

  const handlerShowCategoryList = () => {
    if (isDisplayCateList) {
      document.body.style.overflow = 'auto'
      setIsDisplayCateList(false)
    } else {
      document.body.style.overflow = 'hidden'
      setIsDisplayCateList(true)
    }
  }

  return (
    <div>
      {isDisplayCateList && <CreateCategory handlerShowCategoryList={handlerShowCategoryList} />}
      <div className='flex flex-col'>
        <form action='' method='get'>
          <div className='flex items-center gap-2 h-7'>
            <div className='bg-white rounded-sm p-1 flex items-center flex-row justify-between flex-1 shadow'>
              <div className='text-sm text-[#999999]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </div>
              <input
                type='text'
                maxLength={120}
                className='text-sm text-[#333333] w-full border-none outline-none pl-3'
                placeholder='Category Name'
              />
            </div>
            <div className='relative text-sm text-[#333333] uppercase h-full rounded-sm border border-gray-200 border-r-0 border-r-transparent hover:border-gray-300 transition-colors'>
              <select defaultValue='fixed' className='h-full w-[140px] text-sm rounded border-none focus:outline-none'>
                <option value='fixed'>Fix Amount</option>
                <option value='percentage'>By Percentage</option>
              </select>
            </div>
            <button className='h-full flex items-center px-3 bg-blue text-white rounded-sm'>Search</button>
          </div>
        </form>
        <div className='mt-4 bg-gray-50 shadow rounded-sm py-4'>
          <div className='flex items-center justify-between px-6 mb-4'>
            <div className='text-xl text-[#333333]'>List Of Categories</div>
            <button onClick={handlerShowCategoryList} type='button' className='py-2 px-4 bg-blue text-white rounded-md'>
              Create New Category
            </button>
          </div>
          <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase'>
                <tr className='flex'>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Categories 1
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Categories 2
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Categories 3
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Categories 4
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Categories 5
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Create Date
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='flex odd:bg-white even:bg-gray-50 border-b'>
                  <td className='flex-1 px-6 py-4 items-center flex'>Silver Categories 3 Categories 3 Cate</td>
                  <td className='flex-1 px-6 py-4 items-center flex'>Silver</td>
                  <td className='flex-1 px-6 py-4 items-center flex'>Laptop</td>
                  <td className='flex-1 px-6 py-4 items-center flex'>Laptop</td>
                  <td className='flex-1 px-6 py-4 items-center flex'>$2999</td>
                  <td className='flex-1 px-6 py-4 items-center flex'>$2999</td>
                  <td className='flex-1 px-6 py-4 items-center flex'>
                    <Link to='#' className='font-medium text-blue-600 hover:underline'>
                      Edit
                    </Link>
                  </td>
                </tr>
                <tr className='flex odd:bg-white even:bg-gray-50 border-b'>
                  <td className='flex-1 px-6 py-4 items-center flex'>
                    <p className='line-clamp-2'>Silver Categories 3rrfsf Categoffries 3 Cate</p>
                  </td>
                  <td className='flex-1 px-6 py-4 items-center flex'>
                    <p className='line-clamp-2'>jhkjdhfs</p>
                  </td>
                  <td className='flex-1 px-6 py-4 items-center flex'>
                    <p className='line-clamp-2'>jhkjdhfs</p>
                  </td>
                  <td className='flex-1 px-6 py-4 items-center flex'>
                    <p className='line-clamp-2'>jhkjdhfs</p>
                  </td>
                  <td className='flex-1 px-6 py-4 items-center flex'>
                    <p className='line-clamp-2'>jhkjdhfs</p>
                  </td>
                  <td className='flex-1 px-6 py-4 items-center flex'>
                    <p className='line-clamp-2'>jhkjdhfs</p>
                  </td>
                  <td className='flex-1 px-6 py-4 items-center flex'>
                    <Link to='#' className='font-medium text-blue-600 hover:underline'>
                      Edit
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination
              queryConfig={queryConfig}
              // pageSize={productsData.data.data.pagination.page_size}
              pageSize={20}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
