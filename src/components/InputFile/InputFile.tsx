export default function InputFile() {
  return <div>InputFile</div>
}

// import { useRef } from 'react'
// import { toast } from 'react-toastify'
// import config from 'src/constants/config'

// interface Props {
//   onChange?: (file?: File) => void
// }

// export default function InputFile({ onChange }: Props) {
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleUploadAvatar = () => {
//     fileInputRef.current?.click()
//   }

//   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const fileFromLocal = e.target.files?.[0]

//     if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
//       toast.error('Dung lượng file tối đa 1 MB. Định dạng: jpg, jpeg, png')
//     } else {
//       onChange && onChange(fileFromLocal)
//     }
//   }

//   return (
//     <>
//       <input
//         className='hidden'
//         type='file'
//         accept='.jpg,.jpeg,.png'
//         ref={fileInputRef}
//         onChange={onFileChange}
//         onClick={(event) => {
//           ;(event.target as any).value = null
//         }}
//       />
//       <button
//         className='flex py-2 px-7 items-center justify-end rounded-sm border bg-white  text-sm text-gray-600 shadow-sm'
//         type='button'
//         onClick={handleUploadAvatar}
//       >
//         Chọn ảnh
//       </button>
//     </>
//   )
// }
