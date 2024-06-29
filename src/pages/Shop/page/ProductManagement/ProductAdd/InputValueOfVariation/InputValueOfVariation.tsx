import { useContext, useRef } from 'react'
import { ProductAddContext } from 'src/contexts/productAdd.context'

interface Props {
  indexVariants: number
  indexVariantsGroup: number
  handlerRemoveVariant: (index: number) => void
  isPrimary: boolean
  sizeVariants: number
}

export default function InputValueOfVariation({
  handlerRemoveVariant,
  indexVariants,
  isPrimary,
  indexVariantsGroup,
  sizeVariants
}: Props) {
  const fileInputImagesRef = useRef<HTMLInputElement>(null)
  const { productMethods } = useContext(ProductAddContext)

  const {
    register,
    watch,
    formState: { errors }
  } = productMethods

  // useEffect(() => {
  //   arraysVariantsGroupTest?.[indexVariantsGroup]?.variants?.forEach((variant, index) => {
  //     const { name } = variant

  //     if (name !== null && name !== undefined && name !== '') {
  //       clearErrors(`variantsGroup.${indexVariantsGroup}.variants.${index}.name`)
  //       arraysVariantsGroupTest?.[indexVariantsGroup]?.variants?.forEach((otherVariant, otherIndex) => {
  //         if (index !== otherIndex && otherVariant.name === name) {
  //           setError(`variantsGroup.${indexVariantsGroup}.variants.${index}.name`, {
  //             type: 'unique',
  //             message: 'Options of variations should be different.'
  //           })
  //         }
  //       })
  //     }
  //   })
  // }, [arraysVariantsGroupTest, setError, indexVariantsGroup, clearErrors])

  const handleUploadImage = () => {
    fileInputImagesRef.current?.click()
  }
  return (
    <div className='col-span-1'>
      <div className='col-span-1 flex flex-row gap-1 h-9'>
        {isPrimary && (
          <div className='w-9 h-full border-dashed border-[1px] border-gray-400 bg-white rounded-sm flex items-center justify-center hover:border-blue hover:bg-sky-100'>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' ref={fileInputImagesRef} />
            <button
              className='h-full w-full flex flex-col justify-center items-center'
              type='button'
              onClick={handleUploadImage}
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
                  d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                />
              </svg>
            </button>
          </div>
        )}
        <div
          className={`flex-1 h-full px-3 border bg-[#fff] rounded-sm flex items-center ${errors.variantsGroup?.[indexVariantsGroup]?.variants?.[indexVariants]?.name?.message ? 'border-[#ff4742]' : 'hover:border-[#999999]'}`}
        >
          <div className='p-1 flex items-center flex-row justify-between w-full'>
            <input
              {...register(`variantsGroup.${indexVariantsGroup}.variants.${indexVariants}.name`)}
              type='text'
              maxLength={20}
              className='text-sm text-[#333333] w-full border-none outline-none pr-3'
              placeholder='Input'
            />
            <div className='text-sm text-[#999999]'>
              {watch().variantsGroup?.[indexVariantsGroup]?.variants?.[indexVariants]?.name?.length}/20
            </div>
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          {/* <button className='group' type='button'>
            <svg
              className='group-hover:fill-[#333333]'
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              fill='#999999'
              viewBox='0 0 256 256'
            >
              <path d='M90.34,61.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,0l32,32a8,8,0,0,1-11.32,11.32L136,43.31V96a8,8,0,0,1-16,0V43.31L101.66,61.66A8,8,0,0,1,90.34,61.66Zm64,132.68L136,212.69V160a8,8,0,0,0-16,0v52.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm83.32-72-32-32a8,8,0,0,0-11.32,11.32L212.69,120H160a8,8,0,0,0,0,16h52.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,237.66,122.34ZM43.31,136H96a8,8,0,0,0,0-16H43.31l18.35-18.34A8,8,0,0,0,50.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32Z'></path>
            </svg>
          </button> */}
          <button
            className={`group ${sizeVariants === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            type='button'
            onClick={() => {
              handlerRemoveVariant(indexVariants)
            }}
          >
            <svg
              className='group-hover:fill-[#333333]'
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              fill='#999999'
              viewBox='0 0 256 256'
            >
              <path d='M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z'></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`${errors.variantsGroup?.[indexVariantsGroup]?.variants?.[indexVariants]?.name?.message ? 'visible' : 'invisible'} mt-2 h-4 text-xs text-[#ff4742]`}
      >
        {errors.variantsGroup?.[indexVariantsGroup]?.variants?.[indexVariants]?.name?.message}
      </div>
    </div>
  )
}
