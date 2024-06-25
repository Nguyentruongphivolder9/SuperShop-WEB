export default function AdvertiseAdd() {
  return (
    <div>
      <h2 className='text-2xl font-bold tracking-tight text-gray-700 my-3 '>Create Shop Adds</h2>
      <div className='relative border border-none isolate overflow-hidden bg-white rounded-lg py-4 my-3'>
        <div className='px-4 lg:px-16'>
          <div>
            <h2 className='text-xl font-bold tracking-tight text-gray-500 my-0.5'>Basic Settings</h2>
            <hr />
            <div className='mx-20'>
              <div className='flex justify-between'>
                <div className=' flex my-3'>
                  <div className='flex items-center mx-3 '>
                    <h2 className='text-lg font-bold tracking-tight text-gray-600 mx-12 '>Budget</h2>
                    <input
                      type='radio'
                      name='disabled-radio'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='disabled-radio-1'
                      className='ms-2 text-sm font-medium text-gray-600 dark:text-gray-500'
                    >
                      Unlimited
                    </label>
                  </div>
                  <div className='flex items-center mx-3 '>
                    <input
                      type='radio'
                      name='disabled-radio'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='disabled-radio-2'
                      className='ms-2 text-sm font-medium text-gray-600 dark:text-gray-500'
                    >
                      Set Daily Budget
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='mx-20'>
              <div className='flex justify-between'>
                <div className=' flex my-3'>
                  <div className='flex items-center mx-3 '>
                    <h2 className='text-lg font-bold tracking-tight text-gray-600 mx-12 '>Duration</h2>
                    <input
                      type='radio'
                      name='disabled-radio'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='disabled-radio-1'
                      className='ms-2 text-sm font-medium text-gray-600 dark:text-gray-500'
                    >
                      No end date
                    </label>
                  </div>
                  <div className='flex items-center mx-3 '>
                    <input
                      type='radio'
                      name='disabled-radio'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='disabled-radio-2'
                      className='ms-2 text-sm font-medium text-gray-600 dark:text-gray-500'
                    >
                      Set start/end date
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative border border-none isolate overflow-hidden bg-white rounded-lg py-4 my-3'>
        <div className='px-4 lg:px-16'>
          <div>
            <h2 className='text-xl font-bold tracking-tight text-gray-500 my-0.5'>Bidding</h2>
            <hr />
          </div>
        </div>
      </div>
    </div>
  )
}
