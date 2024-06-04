export default function ChangePassword() {
  return <div>ChangePassword</div>
}

// import { yupResolver } from '@hookform/resolvers/yup'
// import { useMutation } from '@tanstack/react-query'
// import omit from 'lodash/omit'
// import { useForm } from 'react-hook-form'
// import { toast } from 'react-toastify'
// import userApi from 'src/apis/user.api'
// import Button from 'src/components/Button'
// import Input from 'src/components/Input'
// import { ErrorResponse } from 'src/types/utils.type'
// import { UserSchema, userSchema } from 'src/utils/rules'
// import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

// type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
// const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])
// export default function ChangePassword() {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     setError,
//     reset
//   } = useForm<FormData>({
//     defaultValues: {
//       password: '',
//       new_password: '',
//       confirm_password: ''
//     },
//     resolver: yupResolver(passwordSchema)
//   })

//   const updateProfileMutation = useMutation({
//     mutationFn: userApi.updateProfile
//   })

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
//       toast.success(res.data.message)
//       reset()
//     } catch (error) {
//       console.log(error)
//       if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
//         const formError = error.response?.data.data
//         if (formError) {
//           Object.keys(formError).forEach((key) => {
//             setError(key as keyof FormData, {
//               message: formError[key as keyof FormData],
//               type: 'Server'
//             })
//           })
//         }
//       }
//     }
//   })
//   return (
//     <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
//       <div className='border-b text-center md:text-left border-b-gray-200 py-6'>
//         <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
//         <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
//       </div>
//       <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
//         <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
//           <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
//             <div className='sm:w-[20%] truncate pt-3 capitalize'>Mật khẩu cũ</div>
//             <div className='sm:w-[80%] sm:pl-5'>
//               <Input
//                 classNameInput='px-3 py-2 w-full rounded-sm outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm'
//                 register={register}
//                 name='password'
//                 type='password'
//                 placeholder='Mật khẩu cũ'
//                 errorMessage={errors.password?.message}
//               />
//             </div>
//           </div>

//           <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
//             <div className='sm:w-[20%] truncate pt-3 capitalize'>Mật khẩu mới</div>
//             <div className='sm:w-[80%] sm:pl-5'>
//               <Input
//                 classNameInput='px-3 py-2 w-full rounded-sm outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm'
//                 className='relative'
//                 register={register}
//                 name='new_password'
//                 type='password'
//                 placeholder='Mật khẩu mới'
//                 errorMessage={errors.new_password?.message}
//               />
//             </div>
//           </div>

//           <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
//             <div className='sm:w-[20%] truncate pt-3 capitalize'>Nhập lại mật khẩu</div>
//             <div className='sm:w-[80%] sm:pl-5'>
//               <Input
//                 classNameInput='px-3 py-2 w-full rounded-sm outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm'
//                 className='relative'
//                 register={register}
//                 name='confirm_password'
//                 type='password'
//                 placeholder='Nhập lại mật khẩu'
//                 errorMessage={errors.confirm_password?.message}
//               />
//             </div>
//           </div>

//           <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
//             <div className='sm:w-[20%] truncate pt-3 capitalize'></div>
//             <div className='sm:w-[80%] sm:pl-5'>
//               <Button
//                 className='flex items-center h-9 bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
//                 type='submit'
//               >
//                 Lưu
//               </Button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }
