import Pagination from 'src/components/Pagination'
import ProductRatingStar from 'src/components/ProductRatingStar'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { formatDateTime } from 'src/utils/utils'

export default function ProductRating() {
  const queryConfig = useQueryConfig()

  return (
    <div className='bg-white mt-4 shadow'>
      <div className='px-6 pt-6 mb-4'>
        <div className='rounded text-lg pb-3 capitalize text-[#000000DE]'>Product Ratings</div>
        <div className='flex items-center mb-4 p-7 min-h-20 rounded-sm border-[1px] border-[#f9ede5] bg-[#fffbf8]'>
          <div className='mr-7'>
            <div className='flex items-end gap-2'>
              <div className='text-3xl text-blue'>4.9</div>
              <div className='text-lg text-blue'>out of 5</div>
            </div>
            <div className='h-fit mt-2'>
              <ProductRatingStar
                // rating={product.rating}
                rating={4.9}
                activeClassName='h-6 w-6 text-[#ffa727] fill-[#ffa727]'
                nonActiveClassName='h-6 w-6 text-gray-300 fill-gray-300'
              />
            </div>
          </div>
          <div className='flex-1'>
            <div className='flex flex-wrap'>
              <div className='my-[5px] mr-2 flex items-end justify-center capitalize min-w-28 p-2 border-[1px] rounded-sm border-blue text-sm bg-white'>
                All
              </div>
              <div className='my-[5px] mr-2 flex items-end justify-center capitalize min-w-28 p-2 border-[1px] rounded-sm border-gray-300 text-sm bg-white'>
                5 star (29)
              </div>
              <div className='my-[5px] mr-2 flex items-end justify-center capitalize min-w-28 p-2 border-[1px] rounded-sm border-gray-300 text-sm bg-white'>
                4 star (29)
              </div>
              <div className='my-[5px] mr-2 flex items-end justify-center capitalize min-w-28 p-2 border-[1px] rounded-sm border-gray-300 text-sm bg-white'>
                3 star (29)
              </div>
              <div className='my-[5px] mr-2 flex items-end justify-center capitalize min-w-28 p-2 border-[1px] rounded-sm border-gray-300 text-sm bg-white'>
                2 star (29)
              </div>
              <div className='my-[5px] mr-2 flex items-end justify-center capitalize min-w-28 p-2 border-[1px] rounded-sm border-gray-300 text-sm bg-white'>
                1 star (29)
              </div>
              <div className='my-[5px] mr-2 flex items-end justify-center capitalize min-w-28 p-2 border-[1px] rounded-sm border-gray-300 text-sm bg-white'>
                with comments (17)
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='px-6 pb-6'>
        <div className=''>
          <div className='flex items-start pl-5 py-4 border-b-[1px]'>
            <div className='mr-2'>
              <div className='h-10 w-10 rounded-full bg-[#F5F5F5] flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6 text-[#999999]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                  />
                </svg>
              </div>
            </div>
            <div className='flex-1 flex flex-col justify-start'>
              <div className='text-xs text-[#000000DE] h-fit'>nguoidoi_08</div>
              <div className='mt-1'>
                <ProductRatingStar
                  // rating={product.rating}
                  rating={4.9}
                  activeClassName='h-4 w-4 text-[#ffa727] fill-[#ffa727]'
                  nonActiveClassName='h-4 w-4 text-gray-300 fill-gray-300'
                />
              </div>
              <div className='mt-1 mb-4 text-xs text-[#000000DE] h-fit'>
                {formatDateTime('2024-06-03 16:30:46.222556')}
              </div>
              <div className='text-sm mb-1'>
                <span className='text-[#00000066]'>Thiết kế bìa: </span>
                <span className='text-[#000000DE]'>good</span>
              </div>
              <div className='text-sm'>
                <span className='text-[#00000066]'>Đối tượng độc giả: </span>
                <span className='text-[#000000DE]'>mọi lứa tuổi</span>
              </div>
              <div className='mt-3 text-sm text-[#000000DE]'>
                Mình mới đọc hết chương 1. Lối văn nghe rất đời, rất dễ thương. Chuyện tình của 2 cụ rất đáng để học hỏi
                Nhất định phải mua cuốn này đọc đi ạaaa Mua theo PR mà mang về không phải bàn vì nó hay thật
              </div>
              <div className='mt-4'>
                <div className='flex flex-wrap'>
                  <div className='h-[72px] w-[72px] mr-2 mb-2'>
                    <img
                      className='object-cover h-full w-full'
                      src='https://down-cvs-vn.img.susercontent.com/vn-11134103-7r98o-lva3uwxht1t010_tn.webp'
                      alt=''
                    />
                  </div>
                </div>
              </div>
              <div className='bg-[#f5f5f5] p-3 text-sm'>
                <div className='text-[#000000DE]'>Seller&rsquo;s Response:</div>
                <div className='text-[#000000A6] mt-2'>
                  Cảm ơn bạn soo_eun đã tin tưởng và ủng hộ Nhã Nam! Hy vọng cuốn sách này sẽ mang đến cho bạn thật
                  nhiều niềm vui{' '}
                </div>
              </div>
              <div className='mt-5'>
                <div className='flex items-center gap-2'>
                  <button type='button'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='size-5 text-[#00000066]'
                    >
                      <path d='M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z' />
                    </svg>
                  </button>

                  <div className='text-[#00000066]'>Helpful?</div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <Pagination
              queryConfig={queryConfig}
              // pageSize={productsData.data.data.pagination.page_size}
              pageSize={20}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
