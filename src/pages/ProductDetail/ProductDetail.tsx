// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import productApi from 'src/apis/product.api'
// import { ProductListConfig, Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatDateTime, formatNumbertoSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
// import Product from '../ProductList/components/Product'
import QuantityController from '../../components/QuantityController'
import ImageSmallSlider from 'src/components/ImageSmallSlider'
import { ProductImagesResponse } from 'src/types/product.type'
import { Link } from 'react-router-dom'
import ProductRatingStar from 'src/components/ProductRatingStar'
import ProductRating from './ProductRating'
// import purchaseApi from 'src/apis/purchase.api'
// import { purchasesStatus } from 'src/constants/purchase'
// import { toast } from 'react-toastify'
// import path from 'src/constants/path'
// import { useTranslation } from 'react-i18next'

export default function ProductDetail() {
  // const { t } = useTranslation('product')
  // const navigate = useNavigate()
  // const queryClient = useQueryClient()
  const [buyCount, setBuyCount] = useState(1)
  // const { nameId } = useParams()
  // const id = getIdFromNameId(nameId as string)
  // const { data: ProductDetailData } = useQuery({
  //   queryKey: ['product', id],
  //   queryFn: () => productApi.getProductDetail(id as string)
  // })
  // const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  // const product = ProductDetailData?.data.data
  const imageRef = useRef<HTMLImageElement>(null)

  // const currentImages = useMemo(
  //   () => (product ? product.images.slice(...currentIndexImages) : []),
  //   [product, currentIndexImages]
  // )
  const currentImages: ProductImagesResponse[] = [
    {
      id: 'dhjfbsdhka-sfkjsdfs',
      imageUrl:
        'https://super-shop.s3.ap-south-1.amazonaws.com/products/ss-picture-307efaa9-aec7-48bf-b129-52443200bbc2',
      isPrimary: false
    },
    {
      id: '754-sdkjfhsk',
      imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqsp7wlvy59zef_tn',
      isPrimary: true
    },
    {
      id: '999-sdkjfhsk',
      imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqsp7wlvy59zef_tn',
      isPrimary: true
    },
    {
      id: '467-sdkjfhsk',
      imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqsp7wlvy59zef_tn',
      isPrimary: true
    },
    {
      id: 'gdjfgsj-sdkjfhsk',
      imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqsp7wlvy59zef_tn',
      isPrimary: true
    },
    {
      id: 'gdjfgsj-sdddddddd',
      imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfywumhbsjmyeb_tn',
      isPrimary: false
    }
  ]

  // const queryConfig: ProductListConfig = { limit: '15', page: '1', category: product?.category._id }
  // const { data: productsData } = useQuery({
  //   queryKey: ['products', queryConfig],
  //   queryFn: () => {
  //     return productApi.getProducts(queryConfig)
  //   },
  //   staleTime: 3 * 60 * 1000,
  //   enabled: Boolean(product)
  // })

  // const addToCartMutation = useMutation({
  //   mutationFn: (body: { buy_count: number; product_id: string }) => purchaseApi.addToCart(body)
  // })

  // useEffect(() => {
  //   if (product && product.images) {
  //     setActiveImage(product.images[0])
  //   }
  // }, [product])

  // const next = () => {
  //   if (currentIndexImages[1] < (product as ProductType).images.length) {
  //     setCurrentIndexImages((prev) => {
  //       setActiveImage((product as ProductType).images[prev[0] + 1])
  //       return [prev[0] + 1, prev[1] + 1]
  //     })
  //   }
  // }
  // const prev = () => {
  //   if (currentIndexImages[0] > 0) {
  //     setCurrentIndexImages((prev) => {
  //       setActiveImage((product as ProductType).images[prev[1] - 1])
  //       return [prev[0] - 1, prev[1] - 1]
  //     })
  //   }
  // }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const react = e.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = e.nativeEvent

    const top = offsetY * (1 - naturalHeight / react.height)
    const left = offsetX * (1 - naturalWidth / react.width)
    image.style.height = naturalHeight + 'px'
    image.style.width = naturalWidth + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleByCount = (value: number) => {
    setBuyCount(value)
  }

  // const addToCart = () => {
  //   addToCartMutation.mutate(
  //     { buy_count: buyCount, product_id: product?._id as string },
  //     {
  //       onSuccess: (data) => {
  //         queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
  //         toast.success(data.data.message, { autoClose: 2000 })
  //       }
  //     }
  //   )
  // }

  // const buyNow = async () => {
  //   const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
  //   const purchase = res.data.data
  //   navigate(path.cart, {
  //     state: {
  //       purchaseId: purchase._id
  //     }
  //   })
  // }

  // if (!product) return null
  return (
    <div className='bg-[#f6f6f6]'>
      <div className='pt-5'>
        <div className='container'>
          <div className='flex items-center justify-start line-clamp-1'>
            <Link to={'/'} className='text-[13px] text-[#05a]'>
              Super Shop
            </Link>
            <div className='mx-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.2}
                stroke='currentColor'
                className='size-4 text-[#757575]'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </div>
            <div className='text-sm text-[#000000cc]'>
              Mũ bảo hiểm fullface Royal M266 2 kính,nón bảo hiểm chùm đầu có lót tháo rời vệ sinh,hàng chính hãng bảo
              hành 12 tháng
            </div>
          </div>
        </div>
      </div>

      <div className='container bg-transparent'>
        <div className='bg-white p-4 mt-5 shadow rounded-sm'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] overflow-hidden cursor-pointer'
                onMouseMove={(e) => handleZoom(e)}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  // src={activeImage}
                  // alt={product.name}
                  src={activeImage}
                  alt={
                    'Mũ bảo hiểm fullface Royal M266 2 kính,nón bảo hiểm chùm đầu có lót tháo rời vệ sinh,hàng chính hãng bảo hành 12 tháng'
                  }
                  className='absolute pointer-events-none left-0 top-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='mt-4'>
                <ImageSmallSlider activeImage={activeImage} chooseActive={chooseActive} images={currentImages} />
              </div>
            </div>
            <div className='col-span-7'>
              {/* <h1 className='text-xl font-medium uppercase'>{product.name}</h1> */}
              <h1 className='text-xl font-medium line-clamp-2'>
                Mũ bảo hiểm fullface Royal M266 2 kính,nón bảo hiểm chùm đầu có lót tháo rời vệ sinh,hàng chính hãng bảo
                hành 12 tháng
              </h1>
              <div className='mt-3 flex items-center'>
                <div className='flex items-center'>
                  {/* <span className='mr-1 border-b-2 border-b-orange text-orange'>{product.rating}</span> */}
                  <span className='mr-1 border-b-2 border-b-blue text-blue'>4.7</span>

                  <ProductRatingStar
                    // rating={product.rating}
                    rating={4.7}
                    activeClassName='h-5 w-5 text-[#ffa727] fill-[#ffa727]'
                    nonActiveClassName='h-5 w-5 text-gray-300 fill-gray-300'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div className='flex items-center'>
                  {/* <span>{formatNumbertoSocialStyle(product.sold)}</span> */}
                  <span>{formatNumbertoSocialStyle(3333333)}</span>
                  <span className='ml-1 text-gray-300'>Rating</span>
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div className='flex items-center'>
                  {/* <span>{formatNumbertoSocialStyle(product.sold)}</span> */}
                  <span>{formatNumbertoSocialStyle(5)}</span>
                  <span className='ml-1 text-gray-300'>Sold</span>
                </div>
              </div>
              <div className='mt-4 flex items-center bg-gray-50 px-5 py-4'>
                {/* <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div> */}
                <div className='text-gray-500 line-through'>₫{formatCurrency(200000)}</div>
                <div className='ml-3 text-3xl font-medium text-blue'>₫{formatCurrency(300000)}</div>
                <div className='ml-4 rounded-sm bg-red-400 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(300000, 200000)} OFF
                </div>
              </div>

              {/* variations */}
              <div className='mt-4 flex flex-col px-5 pb-4'>
                <div className='w-full'>
                  <div className='mb-6 grid grid-cols-9'>
                    <div className='col-span-2 h-10 flex items-center mt-2'>
                      <div className='text-[#757575] text-sm w-full'>color</div>
                    </div>
                    <div className='col-span-7 flex flex-wrap overflow-y-auto max-h-56 text-[#000000cc] h-auto'>
                      <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
                        Đen nhám+kính trong
                        <img
                          className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
                          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqrmhk3mjbcn3a'
                          alt=''
                        />
                      </button>
                      <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
                        Đen nhám+kính trong
                        <img
                          className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
                          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqrmhk3mjbcn3a'
                          alt=''
                        />
                      </button>
                      <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
                        Đen nhám+kính trong
                        <img
                          className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
                          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqrmhk3mjbcn3a'
                          alt=''
                        />
                      </button>
                      <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
                        Đen nhám+kính trong
                        <img
                          className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
                          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqrmhk3mjbcn3a'
                          alt=''
                        />
                      </button>
                      <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
                        Đen nhám+kính trong
                        <img
                          className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
                          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqrmhk3mjbcn3a'
                          alt=''
                        />
                      </button>
                      <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
                        Đen nhám+kính trong
                        <img
                          className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
                          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqrmhk3mjbcn3a'
                          alt=''
                        />
                      </button>
                      <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
                        Đen nhám+kính trong
                        <img
                          className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
                          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqrmhk3mjbcn3a'
                          alt=''
                        />
                      </button>
                      <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
                        Đen nhám+kính trong
                        <img
                          className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
                          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqrmhk3mjbcn3a'
                          alt=''
                        />
                      </button>
                      <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
                        Đen nhám+kính trong
                        <img
                          className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
                          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqrmhk3mjbcn3a'
                          alt=''
                        />
                      </button>
                      <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
                        Đen nhám+kính trong
                        <img
                          className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
                          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqrmhk3mjbcn3a'
                          alt=''
                        />
                      </button>
                      <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
                        Đen nhám+kính trong
                        <img
                          className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
                          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqrmhk3mjbcn3a'
                          alt=''
                        />
                      </button>
                    </div>
                  </div>
                  <div className='mb-6'></div>
                </div>
              </div>

              <div className='flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  value={buyCount}
                  onDecrease={handleByCount}
                  onIncrease={handleByCount}
                  onType={handleByCount}
                  // max={product.quantity}
                  max={100}
                />
                <div className='ml-6 text-gray-500 text-sm'>
                  {/* {product.quantity} {t('available')} */}3 pieces available
                </div>
              </div>

              <div className='mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-blue text-blue bg-blue/10 px-5 capitalize shadow-sm hover:bg-blue/5'
                  // onClick={addToCart}
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-blue text-blue'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>

                <button
                  // onClick={buyNow}
                  className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-[#FF424E] px-5 capitalize text-white shadow-sm outline-none hover:bg-[#FF424E]/90'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container bg-transparent'>
        <div className='bg-white flex flex-1 p-8 mt-4 shadow rounded-sm'>
          <div className='flex items-center w-fit max-w-[440px] pr-6 border-r-[1px] border-gray-200'>
            <Link to={'#'} className='mr-5'>
              <div className='h-20 w-20'>
                <div className='h-full w-full border rounded-full overflow-hidden'>
                  <img
                    className='w-full h-full object-cover'
                    src='https://down-vn.img.susercontent.com/file/98c1184d78a4d0c8c2be276a5bf115bd_tn'
                    alt=''
                  />
                </div>
              </div>
            </Link>
            <div className='flex flex-col gap-2'>
              <div className='h-auto w-full text-md text[#000000DE] line-clamp-1'>Thế Giới Mũ Bảo Hiểm - Hà Nội</div>
              <div className='flex gap-2'>
                <button
                  type='button'
                  className='flex gap-1 px-4 py-2 items-center border rounded-sm border-blue bg-blue/10 capitalize shadow-sm hover:bg-blue/5 '
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5 text-blue'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
                    />
                  </svg>

                  <span className='text-sm text-blue'>Chat Now</span>
                </button>
                <button type='button' className='flex gap-1 px-4 py-2 items-center border rounded-sm'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5 text-[#757575]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z'
                    />
                  </svg>

                  <span className='text-sm text-[#757575]'>View Shop</span>
                </button>
              </div>
            </div>
          </div>
          <div className='pl-6 flex-1 flex items-center'>
            <div className='grid grid-cols-7 gap-y-4 gap-x-12 h-fit w-full'>
              <div className='col-span-2 flex justify-between items-center'>
                <span className='text-sm text-[#00000066]'>Ratings</span>
                <span className='text-blue text-sm'>{formatNumbertoSocialStyle(158000)}</span>
              </div>
              <div className='col-span-3 flex justify-between items-center'>
                <span className='text-sm text-[#00000066]'>Response Rate</span>
                <span className='text-blue text-sm'>100%</span>
              </div>
              <div className='col-span-2 flex justify-between items-center'>
                <span className='text-sm text-[#00000066]'>Joined</span>
                <span className='text-blue text-sm'>5 years ago</span>
              </div>
              <div className='col-span-2 flex justify-between items-center'>
                <span className='text-sm text-[#00000066]'>Products</span>
                <span className='text-blue text-sm'>{formatNumbertoSocialStyle(665)}</span>
              </div>
              <div className='col-span-3 flex justify-between items-center'>
                <span className='text-sm text-[#00000066]'>Response Time</span>
                <span className='text-blue text-sm'>within hours</span>
              </div>
              <div className='col-span-2 flex justify-between items-center'>
                <span className='text-sm text-[#00000066]'>Follower</span>
                <span className='text-blue text-sm'>{formatNumbertoSocialStyle(298000)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <div className='container'>
          <div className='flex items-start gap-4'>
            <div className='flex-1'>
              <div className='bg-white shadow'>
                <section className='pt-4 px-4'>
                  <div className='rounded bg-gray-50 p-3 text-lg capitalize text-[#000000DE]'>
                    Product Specifications
                  </div>
                  <div className='mx-3 mt-6 mb-4 text-sm leading-loose'>
                    <div className='flex justify-start items-center h-fit mb-2'>
                      <div className='w-36 text-[#00000066] pr-3'>Category</div>
                      <div className='flex items-center justify-start line-clamp-1'>
                        <Link to={'/'} className='text-[13px] text-[#05a]'>
                          Super Shop
                        </Link>
                        <div className='mx-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.2}
                            stroke='currentColor'
                            className='size-4 text-[#757575]'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-start items-center h-fit mb-2'>
                      <div className='w-36 text-[#00000066] pr-3'>Injury Support Area</div>
                      <div className='flex items-center text-[#000000CC] justify-start line-clamp-1'>Back & Lumbar</div>
                    </div>
                  </div>
                </section>
                <section className='pt-4 px-4'>
                  <div className='rounded bg-gray-50 p-3 text-lg capitalize text-[#000000DE]'>Product Description</div>
                  <div className='mx-3 text-[#000000CC] mt-6 mb-4 text-sm leading-loose'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize("<div className='red'>Hello</div>")
                      }}
                    />
                  </div>
                </section>
              </div>
              <ProductRating />
            </div>

            <div className='w-56'>
              <div className='bg-white p-2 shadow h-96'></div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>FROM THE SAME SHOP</div>
          {/* {productsData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 '>
              {productsData.data.data.products.map((product, index) => (
                <div key={index} className='col-span-1'>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}
