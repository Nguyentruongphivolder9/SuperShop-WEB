import { Button, Popover } from '@mantine/core'
import { useClickOutside, useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { Product, ProductVariantsResponse } from 'src/types/product.type'

interface Props {
  product: Product
  productVariant?: ProductVariantsResponse
}

export default function VariationsPopover({ product, productVariant }: Props) {
  const [opened, { close, open }] = useDisclosure(false)
  const [selectedVariants, setSelectedVariants] = useState<string[]>(['', ''])
  const [selectedProductVariantId, setSelectedProductVariantId] = useState<string>('')
  const [variantName, setVariantName] = useState<string>('')
  const ref = useClickOutside(() =>
    setTimeout(() => {
      close()
    }, 100)
  )

  useEffect(() => {
    if (product) {
      if (selectedVariants[0] || selectedVariants[1]) {
        const getProductVariant = () => {
          if (product.variantsGroup.length === 1 && selectedVariants[0]) {
            return product.productVariants.find((item) => item.variant1.id == selectedVariants[0])
          } else if (product.variantsGroup.length == 2 && selectedVariants[0] && selectedVariants[1]) {
            return product.productVariants.find(
              (item) => item.variant1.id == selectedVariants[0] && item.variant2.id == selectedVariants[1]
            )
          }
          return null
        }

        const productVariant = getProductVariant()
        setSelectedProductVariantId(productVariant ? productVariant.id : '')
      }
    }
  }, [selectedVariants, product])

  useEffect(() => {
    if (productVariant && product) {
      let variant1 = ''
      let variant2 = ''
      let variantName1 = ''
      let variantName2 = ''
      product.variantsGroup
        .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
        .forEach((groupVariant) => {
          groupVariant.variants.forEach((variant) => {
            if (variant.id == productVariant.variant1.id) {
              variant1 = variant.id
              variantName1 = variant.name
            }

            if (variant.id == productVariant.variant2.id) {
              variant2 = variant.id
              variantName2 = variant.name
            }
          })
        })
      setVariantName(variantName1 + `${variantName2 != '' ? `, ${variantName2}` : ''}`)
      setSelectedVariants([variant1, variant2])
    }
  }, [productVariant, product])

  const isSelectedVariants = (selectedVariant: string[], id: string): boolean => {
    return selectedVariant.filter((item) => item === id).length > 0
  }

  const handleBeforeCancelAndClose = () => {
    if (productVariant && product) {
      let variant1 = ''
      let variant2 = ''
      product.variantsGroup
        .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
        .forEach((groupVariant) => {
          groupVariant.variants.forEach((variant) => {
            if (variant.id == productVariant.variant1.id) {
              variant1 = variant.id
            }

            if (variant.id == productVariant.variant2.id) {
              variant2 = variant.id
            }
          })
        })
      setSelectedVariants([variant1, variant2])
    }
    close()
  }

  const handleUpdateSelectedVariant = () => {
    if (selectedProductVariantId == productVariant?.id) {
      handleBeforeCancelAndClose()
    }
  }

  return (
    <Popover width={365} opened={opened} position='bottom' withArrow shadow='lg' arrowSize={12}>
      <Popover.Target>
        <button onClick={!opened ? open : () => ref} className='text-[#0000008A]'>
          <div className='flex items-center gap-1'>
            <div className='text-sm font-medium'>Variations</div>
            <div
              className={`${
                opened ? 'rotate-180' : 'rotate-0'
              } bg-none border-0 border-l-4 border-r-4 border-t-[5px] border-transparent border-t-[rgba(0,0,0,0.54)] mx-0 my-0 ml-[10px] p-0 rotate-0 transition-transform duration-[100ms] ease-[cubic-bezier(0.4,0,0.6,1)]`}
            ></div>
          </div>
          <div className='font-medium'>{variantName}</div>
        </button>
      </Popover.Target>
      <Popover.Dropdown bg='bg-white' ref={opened ? ref : null}>
        <div className='bg-transparent flex flex-col w-full'>
          {product.variantsGroup &&
            product.variantsGroup
              .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
              .map((groupItem, iGroup) => (
                <div key={iGroup} className='w-full'>
                  <div className='mb-4 flex gap-1'>
                    <div className='flex flex-wrap overflow-y-auto max-h-56 text-[#000000cc] h-auto'>
                      <div className='h-[34px] flex items-center mt-2 mr-2'>
                        <div className='text-[#757575] text-md truncate'>{groupItem.name}:</div>
                      </div>
                      {groupItem.variants &&
                        groupItem.variants.map((variant, iVariant) => (
                          <button
                            key={iVariant}
                            onClick={() => {
                              if (iGroup == 0) {
                                if (selectedVariants[0] == variant.id) {
                                  setSelectedVariants(['', selectedVariants[1]])
                                } else {
                                  setSelectedVariants([variant.id, selectedVariants[1]])
                                }
                              }
                              if (iGroup == 1) {
                                if (selectedVariants[1] == variant.id) {
                                  setSelectedVariants([selectedVariants[0], ''])
                                } else {
                                  setSelectedVariants([selectedVariants[0], variant.id])
                                }
                              }
                            }}
                            className={`relative bg-white border ${isSelectedVariants(selectedVariants, variant.id) ? 'border-[#ee4d2d]' : 'border-[#00000017]'} hover:border-[#ee4d2d] text-sm p-2 mt-2 mr-2 flex items-center rounded-sm h-[34px] min-w-20 outline-0 justify-center`}
                          >
                            {variant.name}
                            {isSelectedVariants(selectedVariants, variant.id) && (
                              <div className="absolute w-[15px] h-[15px] bottom-0 right-0 overflow-hidden before:contents-[''] before:border-[15px] before:border-transparent before:bottom-0 before:absolute before:-right-[15px] before:border-b-[15px] before:border-b-[#ee4d2d]">
                                <div className='h-2 w-2 absolute bottom-0 right-0 flex items-center justify-center'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={2.5}
                                    stroke='currentColor'
                                    className='size-2 text-white'
                                  >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          <div className='flex flex-row justify-end items-center gap-2'>
            <button
              className='text-[#999999] uppercase bg-white hover:bg-gray-100 text-sm h-8 w-32 flex items-center justify-center  rounded-sm'
              type='button'
              onClick={handleBeforeCancelAndClose}
            >
              Cancel
            </button>
            <button
              className='text-white uppercase bg-blue text-sm h-8 w-32 flex items-center justify-center rounded-sm'
              type='button'
              onClick={handleUpdateSelectedVariant}
            >
              Confirm
            </button>
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}
