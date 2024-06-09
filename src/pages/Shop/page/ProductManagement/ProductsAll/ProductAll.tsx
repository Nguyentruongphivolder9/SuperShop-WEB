import Button from 'src/components/Button'

export default function ProductAll() {
  return (
    <div className='w-full'>
      <div className='grid grid-cols-12 gap-4 justify-between items-center mb-6'>
        <form className='col-span-5 '>
          <div className='bg-white rounded-sm p-1 flex relative'>
            <input
              type='text'
              className='pl-10 border text-sm rounded-md border-solid text-black px-3 py-2 flex-grow outline-none bg-transparent'
              placeholder='Search Product Name'
            />
            <div className='absolute top-[30%] left-4 flex-shrink-0 bg-orange hover:opacity-95'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 text-[#999999]'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
            </div>
          </div>
        </form>

        <div className='col-span-5 px-5 border h-10 rounded-md flex items-center p-1'>
          <div className='bg-white rounded-sm p-1 flex items-center flex-row justify-between w-full'>
            <div className='text-sm text-[#999999]'>Search by category</div>
            <div className='flex-shrink-0 bg-orange hover:opacity-95'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-5 text-[#999999]'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                />
              </svg>
            </div>
          </div>
        </div>

        <Button className='text-blue text-sm h-9 col-span-1 border-[1px] rounded-sm border-blue'>Apply</Button>
        <Button className='text-[#333333] text-sm h-9 col-span-1 border-[1px] rounded-sm'>Retype</Button>
      </div>
      <div className='mb-4 flex flex-row items-center gap-2'>
        <div className='text-md text-[#333333]'>0 Product</div>
        <div className='flex flex-row gap-1 items-center rounded-full px-2 py-1  bg-[#F6F6F6]'>
          <div className='text-xs text-[#999999]'>Listing Limit: 1000</div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-4 text-[#999999]'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
