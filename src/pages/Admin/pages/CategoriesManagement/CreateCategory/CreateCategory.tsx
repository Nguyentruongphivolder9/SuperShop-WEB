import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ImageItem from 'src/pages/Shop/page/ProductManagement/ProductAdd/ImageItem'

interface Props {
  handlerShowCategoryList: () => void
}

export interface CategoryImagesRequest {
  id: number
  imageFile: object
}

export default function CreateCategory({ handlerShowCategoryList }: Props) {
  const fileInputImagesRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<CategoryImagesRequest[]>([])

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

      setImages((prev) => [...prev, { id: i, imageFile: files[i] }])
    }
  }

  const deleteImage = async (id: number, index: number) => {}

  const handleUploadImages = () => {
    fileInputImagesRef.current?.click()
  }

  return (
    <div className='z-50 bottom-0 top-0 left-0 right-0 fixed overflow-hidden bg-[#00000066]'>
      <div className='absolute top-10 bottom-10 left-0 right-0 flex justify-center items-center'>
        <div className='max-h-full flex relative'>
          <div className='w-[960px] bg-white border-dashed border-[1px] border-blue rounded-md shadow flex flex-col overflow-y-auto h-full'>
            <div className='min-h-6 p-6 flex-shrink-0 pr-7 text-xl font-medium overflow-hidden text-[#333333] '>
              Create Category
            </div>
            <div className='relative text-sm px-6 overflow-auto flex-grow'>
              <div className='p-4 bg-[#f6f6f6]'>
                <div className='grid grid-cols-8 mb-6'>
                  <div className='col-span-2 flex flex-row justify-end items-start gap-1 mr-5'>
                    <span className='text-red-600 text-xs'>*</span>
                    <div className='text-sm text-[#333333]'>Product Images</div>
                  </div>
                  <div className='col-span-6 flex flex-col justify-center'>
                    <div className='bg-white rounded-sm p-1 flex-wrap flex items-center flex-row gap-3 w-full'>
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className='group w-24 h-24 relative border-dashed border-2 border-blue rounded-md overflow-hidden flex items-center'
                        >
                          <img className='object-cover h-full w-full cursor-move' src={''} alt={'upload file'} />
                          <div className='absolute bottom-0 left-0 w-full h-6 bg-[#333333] hidden group-hover:grid group-hover:grid-cols-2 '>
                            <div className='col-span-1'></div>
                            <div className='col-span-1 items-center justify-center flex'>
                              <button
                                type='button'
                                onClick={() => {
                                  deleteImage(image.id, index)
                                }}
                                className='w-fit h-fit'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='18'
                                  height='18'
                                  fill='#fff'
                                  viewBox='0 0 256 256'
                                >
                                  <path d='M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z'></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
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
                <div className='grid grid-cols-8 gap-4 '>
                  <div className='h-10 col-span-2 flex items-center text-[#333333] justify-end gap-2'>
                    <span className='text-red-600 text-xs'>*</span>
                    <div className='text-sm text-[#333333]'>Category Name</div>
                  </div>
                  <div className='flex flex-row col-span-6 justify-between items-center h-10'>
                    <div className='w-full h-full px-2 flex items-center bg-white border border-solid border-[#e5e5e5] rounded-md overflow-hidden text-'>
                      <div className='bg-white rounded-sm p-1 h-full flex items-center flex-row justify-between w-full'>
                        <input
                          type='text'
                          maxLength={120}
                          className='text-sm text-[#333333] w-full border-none outline-none pr-3'
                          placeholder='Brand Name + Product Type + Key Features (Materials, Colors, Size, Model)'
                        />
                        <div className='text-sm text-[#999999]'>12/120</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='relative mt-4 rounded-sm'>
                  <div className='w-full py-3 relative flex flex-row bg-white'>
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
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-row  justify-between items-center p-6 '>
              <div className='text-sm text-[#999999]'>The currently selected :No category has been chosen</div>
              <div className='flex flex-row gap-5'>
                <button
                  onClick={handlerShowCategoryList}
                  className='text-sm hover:bg-gray-100 text-[#999999] border border-solid border-gray-300 rounded-md px-4 py-2'
                >
                  Cancel
                </button>
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
