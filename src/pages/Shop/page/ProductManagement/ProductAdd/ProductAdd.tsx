import { useRef, useState } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragEndEvent
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ImageItem from './ImageItem'
import CategoryList from './CategoryList'
import { Link } from 'react-router-dom'
import Popover from 'src/components/Popover'
import VariationsForm from './VariationsForm'
import { generateUniqueId } from 'src/utils/utils'
import { productSchema, ProductSchema } from 'src/utils/validations/productValidation'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'src/components/Button'
import { VariantsGroupRequest } from 'src/types/product.type'

interface Image {
  id: string
  name: string
  url: string
}

type FormData = Pick<ProductSchema, 'name' | 'price' | 'stockQuantity' | 'description' | 'isVariant' | 'variantsGroup'>
// type FormDataError = Omit<FormData, 'date_of_birth'> & {
//   date_of_birth?: string
// }

const createProductSchema = productSchema.pick([
  'name',
  'price',
  'stockQuantity',
  'description',
  'isVariant',
  'variantsGroup'
])

export default function ProductAdd() {
  const fileInputImagesRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<Image[]>([])
  const [isDisplayCateList, setIsDisplayCateList] = useState(false)
  const [isDisplayFormVariations, setIsDisplayFormVariations] = useState(false)
  const methods = useForm<FormData>({
    defaultValues: {
      isVariant: false,
      variantsGroup: []
    },
    mode: 'onChange',
    resolver: yupResolver(createProductSchema)
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError,
    getValues
  } = methods

  const handleUploadImages = () => {
    fileInputImagesRef.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const maxImages = 9
    const currentImageCount = images.length
    const remainingSlots = maxImages - currentImageCount
    const filesToAdd = Math.min(files.length, remainingSlots)

    for (let i = 0; i < filesToAdd; i++) {
      const fileExtension = files[i].name.split('.').pop()?.toLowerCase()
      const validExtensions = ['png', 'jpg', 'jpeg']

      if (!fileExtension || !validExtensions.includes(fileExtension)) continue
      if (files[i].type.split('/')[0] !== 'image') continue

      if (files[i].size > 2097152) continue

      if (!images.some((e) => e.name === files[i].name)) {
        console.log(files[i].name)
        setImages((prevImages) => [
          ...prevImages,
          {
            id: generateUniqueId(),
            name: files[i].name,
            url: URL.createObjectURL(files[i])
          }
        ])
      }
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const getTaskPos = (id: string) => images.findIndex((image) => image.id === id)

  const handleImageDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id === over?.id) return

    setImages((images) => {
      const originalPos = getTaskPos(active.id as string)
      const newPos = getTaskPos(over?.id as string)

      return arrayMove(images, originalPos, newPos)
    })
  }

  const deleteImage = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id))
  }

  const handlerShowCategoryList = () => {
    if (isDisplayCateList) {
      document.body.style.overflow = 'auto'
      setIsDisplayCateList(false)
    } else {
      document.body.style.overflow = 'hidden'
      setIsDisplayCateList(true)
    }
  }

  const handlerRemoveVariations = (id: string) => {
    const currentVariantsGroup = getValues('variantsGroup') as VariantsGroupRequest[]
    if (currentVariantsGroup.length === 1) {
      setValue('isVariant', false)
      setValue('variantsGroup', [])
      setIsDisplayFormVariations(false)
    } else {
      const updatedVariantsGroup = currentVariantsGroup.filter((item) => item.id !== id)
      setValue('variantsGroup', updatedVariantsGroup)
    }
  }

  const handlerAddVariations = () => {
    const currentVariantsGroup = getValues('variantsGroup') as VariantsGroupRequest[]
    if (currentVariantsGroup === null || currentVariantsGroup.length === 0 || currentVariantsGroup === undefined) {
      setValue('isVariant', true)
      setValue('variantsGroup', [
        {
          id: generateUniqueId(),
          name: '',
          isPrimary: true,
          isActive: true,
          variants: []
        }
      ])
      setIsDisplayFormVariations(true)
    }

    if (currentVariantsGroup.length === 1) {
      const newVariant = {
        id: generateUniqueId(),
        name: '',
        isPrimary: false,
        isActive: true,
        variants: []
      }
      const updatedVariantsGroup = [...currentVariantsGroup, newVariant]
      setValue('variantsGroup', updatedVariantsGroup)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div>
      {isDisplayCateList && <CategoryList handlerShowCategoryList={handlerShowCategoryList} />}
      <div className='grid grid-cols-12 gap-4'>
        <FormProvider {...methods}>
          <form className='col-span-9'>
            <div className='sticky z-10 top-14 h-14 flex flex-row rounded-md bg-white items-center shadow mb-4'>
              <div className='px-4 text-sm font-normal hover:text-blue'>Basic information</div>
              <div className='px-4 text-sm font-normal hover:text-blue'>Specification</div>
              <div className='px-4 text-sm font-normal hover:text-blue'>Sales Information</div>
              <div className='px-4 text-sm font-normal hover:text-blue'>Shipping</div>
              <div className='px-4 text-sm font-normal hover:text-blue'>Others</div>
            </div>

            {/* Basic Information */}
            <div className='p-6 rounded-md bg-white shadow mb-6'>
              <div className='text-xl text-[#333333] font-bold mb-6'>Basic Information</div>
              <div className='mb-6'>
                {/* Product Image */}
                <div className='grid grid-cols-12 mb-6'>
                  <div className='col-span-3 flex flex-row justify-end items-start gap-1 mr-5'>
                    <span className='text-red-600 text-xs'>*</span>
                    <div className='text-sm text-[#333333]'>Product Images</div>
                  </div>
                  <div className='col-span-9 flex items-center'>
                    <div className='bg-white rounded-sm p-1 flex-wrap flex items-center flex-row gap-3 w-full'>
                      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleImageDragEnd}>
                        <SortableContext items={images} strategy={verticalListSortingStrategy}>
                          {images.map((image) => (
                            <ImageItem
                              key={image.id}
                              id={image.id as string}
                              name={image.name as string}
                              url={image.url as string}
                              deleteImage={deleteImage}
                            />
                          ))}
                        </SortableContext>
                      </DndContext>
                      {images.length < 9 && (
                        <div className='w-24 h-24 border-dashed border-2 border-blue rounded-md flex items-center justify-center'>
                          <input
                            className='hidden'
                            type='file'
                            accept='.jpg,.jpeg,.png'
                            ref={fileInputImagesRef}
                            onChange={onFileChange}
                            multiple
                          />
                          <button
                            className='h-full w-full flex flex-col justify-center items-center'
                            type='button'
                            onClick={handleUploadImages}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width={30}
                              height={30}
                              fill='#0099FF'
                              viewBox='0 0 256 256'
                            >
                              <path d='M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM72,56H216v62.75l-10.07-10.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L72,109.37ZM184,200H40V88H56v80a16,16,0,0,0,16,16H184Zm32-32H72V132l36-36,49.66,49.66a8,8,0,0,0,11.31,0L194.63,120,216,141.38V168ZM160,84a12,12,0,1,1,12,12A12,12,0,0,1,160,84Z' />
                            </svg>
                            <div className='text-xs text-blue flex flex-col'>
                              <span>Add Image</span>
                              <span>({images.length}/9)</span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Promotion Name */}
                <div className='grid grid-cols-12 mb-6'>
                  <div className='col-span-3 flex flex-row justify-end items-center gap-1 mr-5'>
                    <span className='text-red-600 text-xs'>*</span>
                    <div className='text-sm text-[#333333]'>Promotion Name</div>
                  </div>
                  <div className='col-span-9 flex items-center'>
                    <div className='bg-white rounded-sm p-1 flex items-center flex-row gap-3 w-full'>
                      {images.length !== 0 ? (
                        <div className='group w-24 h-24 relative border-dashed border-2 border-blue rounded-md overflow-hidden flex items-center'>
                          <img className='object-cover h-full w-full' src={images[0].url} alt={images[0].name} />
                        </div>
                      ) : (
                        <div className='w-24 h-24 border-dashed border-2 border-blue rounded-md flex items-center justify-center'>
                          <div className='h-full w-full flex flex-col justify-center items-center cursor-not-allowed'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width={30}
                              height={30}
                              fill='#0099FF'
                              viewBox='0 0 256 256'
                            >
                              <path d='M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM72,56H216v62.75l-10.07-10.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L72,109.37ZM184,200H40V88H56v80a16,16,0,0,0,16,16H184Zm32-32H72V132l36-36,49.66,49.66a8,8,0,0,0,11.31,0L194.63,120,216,141.38V168ZM160,84a12,12,0,1,1,12,12A12,12,0,0,1,160,84Z' />
                            </svg>
                            <div className='text-xs text-blue flex flex-col'>
                              <span>(0/1)</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <ul className='flex-1 pl-4'>
                        <li className='text-xs text-[#999999] list-disc'>Size: Max 2Mb</li>
                        <li className='text-xs text-[#999999] list-disc'>Format: .png, .jpg, .jpeg</li>
                        <li className='text-xs text-[#999999] list-disc'>
                          Promotion Image will be used on the promotion page, search result page, daily discover,
                          etc，Upload Promotion Image will inspire buyers to click on your product.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12 mb-3 items-start'>
                  <div className='col-span-3 h-10 flex flex-row justify-end items-center gap-1 mr-5'>
                    <span className='text-red-600 text-xs'>*</span>
                    <div className='text-sm text-[#333333]'>Product Name</div>
                  </div>
                  <div className='col-span-9'>
                    <div
                      className={`px-5 border h-10 rounded-md flex items-center p-1 ${errors.name?.message ? 'border-[#ff4742]' : 'hover:border-[#999999]'}`}
                    >
                      <div className='bg-white rounded-sm p-1 flex items-center flex-row justify-between w-full'>
                        <input
                          type='text'
                          {...register('name')}
                          maxLength={120}
                          className='text-sm text-[#333333] w-full border-none outline-none pr-3'
                          placeholder='Brand Name + Product Type + Key Features (Materials, Colors, Size, Model)'
                        />
                        <div className='text-sm text-[#999999]'>0/120</div>
                      </div>
                    </div>
                    <div
                      className={`${errors.name?.message ? 'visible' : 'invisible'} mt-1 h-4 text-xs px-2 text-[#ff4742]`}
                    >
                      {errors.name?.message}
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12 mb-6'>
                  <div className='col-span-3 flex flex-row justify-end items-center gap-1 mr-5'>
                    <span className='text-red-600 text-xs'>*</span>
                    <div className='text-sm text-[#333333]'>Category</div>
                  </div>
                  <div className='col-span-9 px-5 border h-10 rounded-md flex items-center p-1 hover:border-[#999999]'>
                    <button
                      onClick={handlerShowCategoryList}
                      type='button'
                      className='bg-white rounded-sm p-1 flex items-center flex-row justify-between w-full cursor-pointer'
                    >
                      <input
                        type='text'
                        className='text-sm text-[#333333] w-full border-none outline-none pr-3 cursor-pointer'
                        placeholder='Please set category'
                        readOnly
                      />
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
                    </button>
                  </div>
                </div>

                <div className='grid grid-cols-12 mb-6'>
                  <div className='col-span-3 flex flex-row justify-end gap-1 mr-5'>
                    <span className='text-red-600 text-xs'>*</span>
                    <div className='text-sm text-[#333333]'>Product Description</div>
                  </div>
                  <div className='col-span-9 relative'>
                    {/* <Editor /> */}
                    {/* <div
                      className={`${errors.name?.message ? 'visible' : 'invisible'} mt-1 h-4 text-xs px-2 text-[#ff4742]`}
                    >
                      {errors.name?.message}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Specification */}
            <div className='p-6 rounded-md bg-white shadow mb-6'>
              <div className='mb-6'>
                <h2 className='text-xl text-[#333333] font-bold'>Basic information</h2>
                <p className='text-sm text-[#999999]'>
                  <span className='text-[#333333]'>Complete: 0 / 9 </span>Fill in more attributes to boost the exposure
                  of your product.
                  <Link to={'#'} className='text-blue'>
                    How to set attributes
                  </Link>
                </p>
              </div>
            </div>

            {/* Sales Information */}
            <div className='p-6 rounded-md bg-white shadow mb-6'>
              <div className='text-xl text-[#333333] font-bold mb-6'>Sales Information</div>
              <div className='mb-6'>
                <div className='grid grid-cols-12 mb-6 items-start'>
                  <div className='col-span-3 h-10 flex flex-row justify-end items-center gap-2 mr-5'>
                    <span className='relative flex h-2 w-2'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-75' />
                      <span className='relative inline-flex rounded-full h-2 w-2 bg-sky-500' />
                    </span>

                    <div className='text-sm text-[#333333]'>Variations</div>
                  </div>

                  {isDisplayFormVariations ? (
                    <VariationsForm
                      variantsGroup={getValues('variantsGroup')}
                      handlerAddVariations={handlerAddVariations}
                      handlerRemoveVariations={handlerRemoveVariations}
                    />
                  ) : (
                    <div
                      onClick={handlerAddVariations}
                      aria-hidden={true}
                      className='w-48 px-5 h-10 rounded-md flex items-center p-1 hover:border-blue hover:bg-sky-100 border-dashed border-[1px] border-[#999999] cursor-pointer'
                    >
                      <div className=' rounded-sm p-1 flex items-center flex-row justify-between w-full text-blue bg-transparent'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.3}
                          stroke='currentColor'
                          className='size-5'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                        </svg>
                        <span className='text-sm'>Enable Variations</span>
                      </div>
                    </div>
                  )}
                </div>

                {getValues('isVariant') === false && (
                  <div className='grid grid-cols-12 mb-3 items-start'>
                    <div className='col-span-3 h-10 flex flex-row justify-end items-center gap-1 mr-5'>
                      <span className='text-red-600 text-xs'>*</span>
                      <div className='text-sm text-[#333333]'>Price</div>
                    </div>

                    <div className='col-span-9'>
                      <div
                        className={`w-80 px-2 border h-10 rounded-md flex items-center p-1 ${errors.price?.message ? 'border-[#ff4742]' : 'hover:border-[#999999]'}`}
                      >
                        <div className='bg-white rounded-sm p-1 flex items-center flex-row justify-between w-full'>
                          <div className='border-r-2 pr-2'>
                            <span className='text-md text-[#999999]'>₫</span>
                          </div>
                          <input
                            type='number'
                            {...register('price')}
                            className='text-sm text-[#333333] w-full border-none outline-none pl-2'
                            placeholder='Input'
                          />
                        </div>
                      </div>
                      <div
                        className={`${errors.price?.message ? 'visible' : 'invisible'} mt-1 h-4 text-xs px-2 text-[#ff4742]`}
                      >
                        {errors.price?.message}
                      </div>
                    </div>
                  </div>
                )}

                {getValues('isVariant') === false && (
                  <div className='grid grid-cols-12 mb-3 items-start'>
                    <div className='col-span-3 h-10 flex flex-row justify-end items-center gap-1 mr-5'>
                      <span className='text-red-600 text-xs'>*</span>
                      <div className='text-sm text-[#333333]'>Stock</div>
                      {/* <Popover
                        className='flex cursor-pointer items-center z-20 py-1 hover:text-white/70'
                        placement='bottom'
                        initialOpen={true}
                        renderPopover={
                          <ul className='flex flex-col p-4 w-80 relative rounded-sm border border-gray-200 bg-white shadow-md'>
                            <li className=''>
                              Stock refers to the total stock that seller has in their own inventory, including those
                              reserved for promotions.
                            </li>
                            <li className=''>
                              Reserved refers to stock reserved for promotions, which can only be used during ongoing
                              promotions.
                            </li>
                          </ul>
                        }
                      >
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
                            d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
                          />
                        </svg>
                      </Popover> */}
                    </div>

                    <div className='col-span-9'>
                      <div
                        className={`w-80 px-2 border h-10 rounded-md flex items-center p-1 ${errors.stockQuantity?.message ? 'border-[#ff4742]' : 'hover:border-[#999999]'}`}
                      >
                        <div className='bg-white rounded-sm p-1 flex items-center w-full'>
                          <input
                            type='number'
                            {...register('stockQuantity')}
                            className='text-sm text-[#333333] w-full border-none outline-none pl-2'
                            placeholder='Input'
                          />
                        </div>
                      </div>
                      <div
                        className={`${errors.stockQuantity?.message ? 'visible' : 'invisible'} mt-1 h-4 text-xs px-2 text-[#ff4742]`}
                      >
                        {errors.stockQuantity?.message}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* submit */}
            <div className='px-6 py-4 shadow-inner flex justify-end sticky bg-[#fff] bottom-0  z-10'>
              <div className='flex flex-row gap-4'>
                <Button
                  className='text-[#999999] bg-white text-sm h-8 w-36 flex items-center justify-center  rounded-md border border-solid border-[#999999]'
                  type='reset'
                >
                  Cancel
                </Button>
                <Button
                  className='text-[#999999] bg-white text-sm h-8 w-36 flex items-center justify-center  rounded-md border border-solid border-[#999999]'
                  type='button'
                  onClick={onSubmit}
                >
                  Save and Delist
                </Button>
                <Button
                  className='text-white bg-blue text-sm h-8 w-36 flex items-center justify-center  rounded-md'
                  type='button'
                >
                  Save and Publish
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>

        {/* Filling Suggestion */}
        <div className='col-span-3'>
          <div className='rounded-md bg-white shadow sticky top-20'>
            <div className='h-14 bg-[#E5EEFB] flex flex-row items-center justify-center'>Filling Suggestion</div>
            <div className='py-4'>
              <div className='flex flex-row items-start text-[#333333] py-2 px-4'>
                <div className='w-5 h-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
                    />
                  </svg>
                </div>
                <div className='text-sm h-fit pl-3'>Add at least 3 images</div>
              </div>
              <div className='flex flex-row items-start text-[#333333] py-2 px-4'>
                <div className='w-5 h-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
                    />
                  </svg>
                </div>
                <div className='text-sm h-fit pl-3'>Add characters for name to 25~100</div>
              </div>
              <div className='flex flex-row items-start text-[#333333] py-2 px-4'>
                <div className='w-5 h-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
                    />
                  </svg>
                </div>
                <div className='text-sm h-fit pl-3'>Add at least 100 characters or 1 image for description</div>
              </div>
              <div className='flex flex-row items-start text-[#333333] py-2 px-4'>
                <div className='w-5 h-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
                    />
                  </svg>
                </div>
                <div className='text-sm h-fit pl-3'>Add brand info</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
