// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
// import { ProductListConfig, Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumbertoSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
// import Product from '../ProductList/components/Product'
import QuantityController from '../../components/QuantityController'
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
  // const imageRef = useRef<HTMLImageElement>(null)

  // const currentImages = useMemo(
  //   () => (product ? product.images.slice(...currentIndexImages) : []),
  //   [product, currentIndexImages]
  // )
  const currentImages = [
    {
      img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqsp7wlvy59zef_tn'
    },
    {
      img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfywumhbwrca26_tn'
    },
    {
      img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfywumhbsjmyeb_tn'
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

  // const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   const react = e.currentTarget.getBoundingClientRect()
  //   const image = imageRef.current as HTMLImageElement
  //   const { naturalHeight, naturalWidth } = image
  //   const { offsetX, offsetY } = e.nativeEvent

  //   const top = offsetY * (1 - naturalHeight / react.height)
  //   const left = offsetX * (1 - naturalWidth / react.width)
  //   image.style.height = naturalHeight + 'px'
  //   image.style.width = naturalWidth + 'px'
  //   image.style.maxWidth = 'unset'
  //   image.style.top = top + 'px'
  //   image.style.left = left + 'px'
  // }

  // const handleRemoveZoom = () => {
  //   imageRef.current?.removeAttribute('style')
  // }

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
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] overflow-hidden cursor-zoom-in'
                // onMouseMove={(e) => handleZoom(e)}
                // onMouseLeave={handleRemoveZoom}
              >
                <img
                  // src={activeImage}
                  // alt={product.name}
                  src={'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfywumhbsjmyeb'}
                  alt={
                    'Mũ bảo hiểm fullface Royal M266 2 kính,nón bảo hiểm chùm đầu có lót tháo rời vệ sinh,hàng chính hãng bảo hành 12 tháng'
                  }
                  className='absolute pointer-events-none left-0 top-0 h-full w-full bg-white object-cover'
                  // ref={imageRef}
                />
              </div>
              <div className='relative grid grid-cols-5 gap-1 mt-4'>
                <button
                  className='absolute top-1/2 left-0 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  // onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img, index) => {
                  // const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={index} onMouseEnter={() => chooseActive(img.img)}>
                      <img
                        src={img.img}
                        alt=''
                        className='absolute left-0 top-0 h-full w-fuil object-cover cursor-pointer'
                      />
                      {/* {isActive && <div className='absolute inset-0 border-2 border-orange'></div>} */}
                    </div>
                  )
                })}

                <button
                  className='absolute top-1/2 right-0 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  // onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              {/* <h1 className='text-xl font-medium uppercase'>{product.name}</h1> */}
              <h1 className='text-xl font-medium uppercase'>
                Mũ bảo hiểm fullface Royal M266 2 kính,nón bảo hiểm chùm đầu có lót tháo rời vệ sinh,hàng chính hãng bảo
                hành 12 tháng
              </h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  {/* <span className='mr-1 border-b-2 border-b-orange text-orange'>{product.rating}</span> */}
                  <span className='mr-1 border-b-2 border-b-orange text-orange'>5</span>

                  <ProductRating
                    // rating={product.rating}
                    rating={5}
                    activeClassname='h-4 w-4 text-orange fill-orange'
                    nonActiveClassname='h-4 w-4 text-gray-300 fill-gray-300'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div className='flex items-center'>
                  {/* <span>{formatNumbertoSocialStyle(product.sold)}</span> */}
                  <span>{formatNumbertoSocialStyle(5)}</span>
                  <span className='ml-1 text-gray-300'>Dã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                {/* <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div> */}
                <div className='text-gray-500 line-through'>₫{formatCurrency(200000)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(300000)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(200000, 300000)} giảm
                </div>
              </div>

              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  value={200000}
                  onDecrease={handleByCount}
                  onIncrease={handleByCount}
                  onType={handleByCount}
                  // max={product.quantity}
                  max={2}
                />
                <div className='ml-6 text-gray-500 text-sm'>{/* {product.quantity} {t('available')} */}3</div>
              </div>

              <div className='mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-orange text-orange bg-orange/10 px-5 capitalize shadow-sm hover:bg-orange/5'
                  // onClick={addToCart}
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
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
                  className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize("<div className='red'>Hello</div>")
                }}
              />
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
