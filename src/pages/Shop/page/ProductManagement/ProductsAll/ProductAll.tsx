import { Checkbox, Popover, Select } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import Button from 'src/components/Button'
import config from 'src/constants/config'
import path from 'src/constants/path'
import { Product, ProductImagesResponse } from 'src/types/product.type'
import { calculateFromToPrice, formatCurrency, formatNumbertoSocialStyle } from 'src/utils/utils'

interface ExtendedProduct extends Product {
  disabled: boolean
  checked: boolean
}

export default function ProductAll() {
  const { data: productsData } = useQuery({
    queryKey: ['dailyDiscoverProduct'],
    queryFn: () => productApi.getProducts()
  })
  const [extendedProduct, setExtendedProduct] = useState<ExtendedProduct[]>([])

  const location = useLocation()
  const chosenProductIdFromLocation = (location.state as { ProductId: string } | null)?.ProductId
  const products = productsData?.data.body?.content
  const isAllChecked = useMemo(() => extendedProduct?.every((product) => product.checked), [extendedProduct])
  const checkedProduct = useMemo(() => extendedProduct.filter((product) => product.checked), [extendedProduct])
  const indeterminate = extendedProduct.some((value) => value.checked) && !isAllChecked
  const checkedProductCount = checkedProduct.length

  useEffect(() => {
    setExtendedProduct((prev) => {
      const extendedProductObject = keyBy(prev, 'id')

      return (
        products?.map((product) => {
          const isChosenProductIdFromLocation = chosenProductIdFromLocation == product.id
          return {
            ...product,
            disabled: false,
            checked: isChosenProductIdFromLocation || Boolean(extendedProductObject[product.id]?.checked)
          }
        }) || []
      )
    })
  }, [products, chosenProductIdFromLocation])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleCheck = (ProductIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedProduct(
      produce((draft) => {
        draft[ProductIndex].checked = e.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedProduct((prev) =>
      prev.map((Product) => ({
        ...Product,
        checked: !isAllChecked
      }))
    )
  }
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
      {extendedProduct && (
        <div>
          <div className='px-4 py-3 flex flex-row text-sm bg-[#F6F6F6]'>
            <span className='mr-3 text-[#333333]'>Sort by:</span>
            <div className='flex flex-row items-center mx-3 gap-1'>
              <div className='text-[#999999]'>Price</div>
              <button className='text-[#333333]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                  />
                </svg>
              </button>
            </div>
            <div className='flex flex-row items-center mx-3 gap-1'>
              <div className='text-[#999999]'>Stock</div>
              <button className='text-[#333333]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                  />
                </svg>
              </button>
            </div>
            <div className='flex flex-row items-center mx-3 gap-1'>
              <div className='text-[#999999]'>Top Sales</div>
              <button className='text-[#333333]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='mt-4'>
            <div className='grid grid-cols-12 gap-2'>
              {extendedProduct.map((product, index) => (
                <div key={index} className='relative group h-auto col-span-2 rounded-sm overflow-hidden'>
                  <div className='flex items-center absolute z-20 top-3 left-3 justify-center shrink-0 pr-3'>
                    <Checkbox key={product.id} checked={product.checked} onChange={handleCheck(index)} />
                  </div>
                  <div className='overflow-hidden w-full h-auto border rounded-sm bg-white'>
                    <div className='relative w-full pt-[100%]'>
                      <img
                        src={`${config.awsURL}products/${product.productImages.find((img: ProductImagesResponse) => img.isPrimary == true)?.imageUrl}`}
                        alt={product.name}
                        className='absolute left-0 top-0 h-full w-full bg-white object-cover'
                      />
                      {!product.isActive && (
                        <div className="px-3 py-2 absolute left-0 top-0 z-[9] h-full w-full flex flex-col justify-center items-center before:content-[''] before:bg-black before:opacity-60 before:absolute before:left-1/2 before:top-1/2 before:w-full before:h-full before:-translate-x-1/2 before:-translate-y-1/2">
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={2.0}
                            stroke='currentColor'
                            className='size-8 text-white z-10'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                            />
                          </svg>
                          <div className='z-10 text-md text-white mb-1 font-bold'>Delist</div>
                          <button
                            type='button'
                            className='z-10 h-8 px-4 flex items-center justify-start border rounded-md border-white text-sm text-white'
                          >
                            <span>Publish</span>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className='overflow-hidden'>
                      <Link
                        to={`${path.home + 'shopchannel/portal/product/'}${product.id}`}
                        className='line-clamp-2 min-h-[2rem] text-sm m-2'
                      >
                        {product.name}
                      </Link>
                      <div className='my-2 px-2 py-[1px]'>
                        <div className='mb-2 flex items-start justify-start'>
                          {product.isVariant ? (
                            <div className='text-blue truncate text-orange'>
                              <span className='text-md'>{calculateFromToPrice(product.productVariants)}</span>
                            </div>
                          ) : (
                            <div className='text-blue truncate text-orange'>
                              <span className='text-md'>₫</span>
                              <span className='text-md'>{formatCurrency(product.price)}</span>
                            </div>
                          )}
                        </div>
                        <div className='text-[#333333] text-sm'>
                          <span>Stock</span> {formatNumbertoSocialStyle(product?.sold as number)}
                        </div>
                      </div>
                      <div className='flex flex-row px-2 py-[6px]'>
                        <div className='h-[18px] w-full flex flex-row justify-center gap-1 text-xs'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1}
                            stroke='currentColor'
                            className='size-4'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                            />
                          </svg>
                          <span>0</span>
                        </div>
                        <div className='h-[18px] w-full flex flex-row justify-center gap-1 text-xs'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1}
                            stroke='currentColor'
                            className='size-4'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                            />
                          </svg>
                          <span>0</span>
                        </div>
                        <div className='h-[18px] w-full flex flex-row justify-center gap-1 text-xs'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1}
                            stroke='currentColor'
                            className='size-4'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                            />
                          </svg>
                          <span>0</span>
                        </div>
                      </div>
                      <div className='py-1 flex flex-row border-t-[1px] relative'>
                        <div className='absolute top-[50%] left-[50%] h-4 w-[1px] bg-[#DCDCE0] -translate-x-[50%] -translate-y-[50%]'></div>
                        <Link
                          to={`${path.home + 'shopchannel/portal/product/'}${product.id}`}
                          className='h-6 w-1/2 flex items-center justify-center rounded-md overflow-hidden hover:bg-slate-200 mx-2'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1}
                            stroke='currentColor'
                            className='size-4'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
                            />
                          </svg>
                        </Link>
                        <Popover width={150} position='top' offset={{ mainAxis: 3, crossAxis: 35 }}>
                          <Popover.Target>
                            <button
                              type='button'
                              className='h-6 w-1/2 flex items-center justify-center rounded-md overflow-hidden hover:bg-slate-200 mx-2'
                            >
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
                                  d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                                />
                              </svg>
                            </button>
                          </Popover.Target>
                          <Popover.Dropdown
                            style={{
                              padding: 0,
                              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                              overflow: 'hidden'
                            }}
                          >
                            <div className=''>
                              {product.isActive ? (
                                <button
                                  type='button'
                                  className='bg-white w-full text-left hover:bg-gray-100 px-3 py-2 text-sm tex-[#333333]'
                                >
                                  Delist
                                </button>
                              ) : (
                                <button
                                  type='button'
                                  className='bg-white w-full text-left hover:bg-gray-100 px-3 py-2 text-sm tex-[#333333]'
                                >
                                  Publish
                                </button>
                              )}
                              <button
                                type='button'
                                className='bg-white w-full text-left hover:bg-gray-100 px-3 py-2 text-sm tex-[#333333]'
                              >
                                Delete
                              </button>
                            </div>
                          </Popover.Dropdown>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='py-6 flex items-center gap-3 justify-end'>
              <div className=''>pagination</div>
              <Select
                placeholder='Pick value'
                data={[
                  { value: '12', label: '12 / page' },
                  { value: '24', label: '24 / page' },
                  { value: '48', label: '48 / page' }
                ]}
                defaultValue='12'
                className='w-28 font-medium'
              />
            </div>
          </div>
          {checkedProductCount > 0 && (
            <div className='flex sticky bottom-0 border-t-[2px] bg-white flex-row justify-between items-center h-16'>
              <div className='flex gap-4 items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <Checkbox
                    indeterminate={indeterminate}
                    label='Receive all notifications'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <div>Select All</div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='text-[#333333]'>{checkedProductCount} products selected</div>
                <Button
                  className='text-[#333333] bg-white text-sm px-5 py-[6px] flex items-center justify-center  rounded-md border border-solid border-[#999999]'
                  type='button'
                  onClick={() => {}}
                >
                  Delete
                </Button>
                <Button
                  className='text-[#333333] bg-white text-sm px-5 py-[6px] flex items-center justify-center  rounded-md border border-solid border-[#999999]'
                  type='button'
                  onClick={() => {}}
                >
                  Delist
                </Button>
                <Button
                  className='text-white bg-blue text-sm px-5 py-[6px] flex items-center justify-center  rounded-md'
                  type='button'
                  onClick={() => {}}
                >
                  Publish
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
