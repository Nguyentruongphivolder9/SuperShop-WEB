import { Link } from 'react-router-dom'
import Button from 'src/components/Button'

interface Props {
  handlerShowCategoryList: () => void
}

export default function CategoryList({ handlerShowCategoryList }: Props) {
  return (
    <div className='z-50 bottom-0 top-0 left-0 right-0 fixed overflow-hidden bg-[#00000066]'>
      <div className='absolute top-10 bottom-10 left-0 right-0 flex justify-center items-center'>
        <div className='max-h-full flex relative'>
          <div className='w-[960px] bg-white border-dashed border-[1px] border-blue rounded-md shadow flex flex-col overflow-y-auto h-full'>
            <div className='min-h-6 p-6 flex-shrink-0 pr-7 text-xl font-medium overflow-hidden text-[#333333] '>
              Edit Category
            </div>
            <div className='relative text-sm px-6 overflow-auto flex-grow'>
              <div className='p-4 bg-[#f6f6f6]'>
                <div className='flex flex-row justify-between items-center h-8'>
                  <div className='w-72 flex-row flex items-center bg-white border border-solid border-[#e5e5e5] rounded-md overflow-hidden text-'>
                    <div className='bg-white rounded-sm p-1 flex items-center flex-row justify-between w-full cursor-pointer'>
                      <input
                        type='text'
                        className='text-sm text-[#333333] w-full border-none outline-none pr-3 placeholder:text-[#999999]'
                        placeholder='Please input least 1 character'
                      />
                      <div className='flex-shrink-0 bg-orange hover:opacity-95 text-[#999999]'>
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
                    </div>
                  </div>
                  <div className='text-sm text-[#999999]'>
                    How to set category,{' '}
                    <Link to={'#'} className='text-blue'>
                      Click here to learn more
                    </Link>
                  </div>
                </div>
                <div className='relative overflow-x-auto mt-4 rounded-sm'>
                  <div className='w-[1200px] py-3 relative flex flex-row bg-white'>
                    <ul className='max-h-80 flex-1 overflow-y-auto scrollbar-webkit scrollbar-thin'>
                      <li className='leading-8 px-4 flex flex-row justify-between items-center text-[#333333] cursor-pointer'>
                        <p className='line-clamp-1 flex-1'>
                          Tìm hiểu thêm về ngành hàng và thuộc tính ngành hàng của Shopee
                        </p>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-4'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                        </svg>
                      </li>
                    </ul>
                    <ul className='h-80 flex-1 overflow-y-auto border-l-2'>
                      <li className='leading-8 px-4 flex flex-row justify-between items-center text-[#333333]'>
                        <span>Men Shoes</span>{' '}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-4'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                        </svg>
                      </li>
                    </ul>
                    <ul className='h-80 flex-1 overflow-y-auto border-l-2'>
                      <li className='leading-8 px-4 flex flex-row justify-between items-center text-[#333333]'>
                        <span>Men Shoes</span>{' '}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-4'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                        </svg>
                      </li>
                    </ul>
                    <ul className='h-80 flex-1 overflow-y-auto border-l-2'>
                      <li className='leading-8 px-4 flex flex-row justify-between items-center text-[#333333]'>
                        <span>Men Shoes</span>{' '}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-4'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                        </svg>
                      </li>
                    </ul>
                    <ul className='h-80 flex-1 overflow-y-auto border-l-2'>
                      <li className='leading-8 px-4 flex flex-row justify-between items-center text-[#333333]'>
                        <span>Men Shoes</span>{' '}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-4'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                        </svg>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-row  justify-between items-center p-6 '>
              <div className='text-sm text-[#999999]'>The currently selected :No category has been chosen</div>
              <div className='flex flex-row gap-5'>
                <Button
                  onClick={handlerShowCategoryList}
                  className='text-sm hover:bg-gray-100 text-[#999999] border border-solid border-gray-300 rounded-md px-4 py-2'
                >
                  Cancel
                </Button>
                <button className='text-sm border border-solid border-gray-300 rounded-md px-4 py-2 bg-blue text-white'>
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handlerShowCategoryList}
            type='button'
            className='text-[#999999] h-6 p-1 absolute right-12 top-6 w-6'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
