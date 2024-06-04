export default function Profile() {
  return <div>Profile</div>
}

// import { yupResolver } from '@hookform/resolvers/yup'
// import { useMutation, useQuery } from '@tanstack/react-query'
// import { useContext, useEffect, useMemo, useRef, useState } from 'react'
// import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
// import userApi from 'src/apis/user.api'
// import Button from 'src/components/Button'
// import Input from 'src/components/Input'
// import InputNumber from 'src/components/InputNumber'
// import { UserSchema, userSchema } from 'src/utils/rules'
// import DateSelect from '../../components/DateSelect'
// import { toast } from 'react-toastify'
// import { AppContext } from 'src/contexts/app.context'
// import { setProfileToLS } from 'src/utils/auth'
// import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
// import { ErrorResponse } from 'src/types/utils.type'
// import config from 'src/constants/config'
// import InputFile from 'src/components/InputFile'
// function Info() {
//   const {
//     register,
//     control,
//     formState: { errors }
//   } = useFormContext<FormData>()
//   return (
//     <>
//       <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
//         <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
//         <div className='sm:w-[80%] sm:pl-5'>
//           <Input
//             classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
//             register={register}
//             name='name'
//             placeholder='Tên'
//             errorMessage={errors.name?.message}
//           />
//         </div>
//       </div>
//       <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
//         <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
//         <div className='sm:w-[80%] sm:pl-5'>
//           <Controller
//             control={control}
//             name='phone'
//             render={({ field }) => (
//               <InputNumber
//                 classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
//                 placeholder='Số điện thoại'
//                 errorMessage={errors.phone?.message}
//                 {...field}
//                 onChange={field.onChange}
//               />
//             )}
//           />
//         </div>
//       </div>
//     </>
//   )
// }

// type FormData = Pick<UserSchema, 'name' | 'address' | 'date_of_birth' | 'avatar' | 'phone'>
// type FormDataError = Omit<FormData, 'date_of_birth'> & {
//   date_of_birth?: string
// }
// const profileSchema = userSchema.pick(['name', 'address', 'date_of_birth', 'avatar', 'phone'])
// export default function Profile() {
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const { setProfile } = useContext(AppContext)
//   const [file, setFile] = useState<File>()
//   const previewImage = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file])
//   const methods = useForm<FormData>({
//     defaultValues: {
//       name: '',
//       address: '',
//       avatar: '',
//       phone: '',
//       date_of_birth: new Date(1990, 0, 1)
//     },
//     resolver: yupResolver(profileSchema)
//   })

//   const {
//     register,
//     control,
//     formState: { errors },
//     handleSubmit,
//     setValue,
//     watch,
//     setError
//   } = methods

//   const avatar = watch('avatar')

//   const { data: profileData } = useQuery({
//     queryKey: ['profile'],
//     queryFn: userApi.getProfile
//   })
//   const profile = profileData?.data.data

//   const updateProfileMutation = useMutation({
//     mutationFn: userApi.updateProfile
//   })

//   const uploadAvatarMutation = useMutation({
//     mutationFn: userApi.uploadAvatar
//   })

//   useEffect(() => {
//     if (profile) {
//       setValue('name', profile.name)
//       setValue('phone', profile.phone)
//       setValue('address', profile.address)
//       setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
//       setValue('avatar', profile.avatar)
//     }
//   }, [profile, setValue])

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       let avatarName = avatar
//       if (file) {
//         const form = new FormData()
//         form.append('image', file)
//         const uploadRes = await uploadAvatarMutation.mutateAsync(form)
//         avatarName = uploadRes.data.data
//         setValue('avatar', avatarName)
//       }
//       const res = await updateProfileMutation.mutateAsync({
//         ...data,
//         date_of_birth: data.date_of_birth?.toISOString(),
//         avatar: avatarName
//       })
//       setProfile(res.data.data)
//       setProfileToLS(res.data.data)
//       // refetch()
//       toast.success(res.data.message)
//     } catch (error) {
//       console.log(error)
//       if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
//         const formError = error.response?.data.data
//         if (formError) {
//           Object.keys(formError).forEach((key) => {
//             setError(key as keyof FormDataError, {
//               message: formError[key as keyof FormDataError],
//               type: 'Server'
//             })
//           })
//         }
//       }
//     }
//   })

//   const handleUploadAvatar = () => {
//     fileInputRef.current?.click()
//   }

//   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const fileFromLocal = e.target.files?.[0]

//     if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
//       toast.error('Dung lượng file tối đa 1 MB. Định dạng: jpg, jpeg, png')
//     } else {
//       setFile(fileFromLocal)
//     }
//   }

//   const handleChangeFile = (file?: File) => {
//     setFile(file)
//   }

//   return (
//     <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
//       <div className='border-b text-center md:text-left border-b-gray-200 py-6'>
//         <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
//         <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
//       </div>
//       <FormProvider {...methods}>
//         <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
//           <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
//             <div className='flex flex-wrap flex-col sm:flex-row'>
//               <div className='sm:w-[20%] truncate pt-3 capitalize'>Email</div>
//               <div className='sm:w-[80%] sm:pl-5'>
//                 <div className='pt-3 text-gray-700 text-left'>{profile?.email}</div>
//               </div>
//             </div>

//             <Info />

//             <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
//               <div className='sm:w-[20%] truncate pt-3 capitalize'>Địa chỉ</div>
//               <div className='sm:w-[80%] sm:pl-5'>
//                 <Input
//                   classNameInput='px-3 py-2 w-full rounded-sm outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm'
//                   register={register}
//                   name='address'
//                   placeholder='Địa chỉ'
//                   errorMessage={errors.address?.message}
//                 />
//               </div>
//             </div>
//             <Controller
//               control={control}
//               name='date_of_birth'
//               render={({ field }) => (
//                 <DateSelect
//                   errorMessage={errors.date_of_birth?.message}
//                   value={field.value}
//                   onChange={field.onChange}
//                 />
//               )}
//             />
//             <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
//               <div className='sm:w-[20%] truncate pt-3 capitalize'></div>
//               <div className='sm:w-[80%] sm:pl-5'>
//                 <Button
//                   className='flex items-center h-9 bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
//                   type='submit'
//                 >
//                   Lưu
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <div className='flex justify-center md:w-72 md:border-l md:borrder-gray-200'>
//             <div className='flex flex-col items-center'>
//               <div className='my-5 h-24 w-24'>
//                 <img
//                   src={previewImage || getAvatarUrl(avatar)}
//                   alt='avatar'
//                   className='h-full w-full rounded-full object-cover'
//                 />
//               </div>
//               <InputFile onChange={handleChangeFile} />
//               <div className='mt-3 text-gray-400'>
//                 <p>Dung lượng file tối đa 1 MB</p>
//                 <p>Định dạng: jpg, jpeg, png</p>
//               </div>
//             </div>
//           </div>
//         </form>
//       </FormProvider>
//     </div>
//   )
// }
