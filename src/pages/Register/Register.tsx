import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import authApi from 'src/apis/auth.api'
import googleSvg from "../../assets/logoSvg/Google.svg"
import facebookSvg from "../../assets/logoSvg/Facebook.svg"

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: async (body: Omit<FormData, 'confirm_password'>) => await authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: () => navigate(path.login),
      onError: (error) => {
        console.log(errors)
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'validate'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div>
      <div className='bg-orange'>
        <div className='container'>
          <div className='grid grid-cols lg:grid-cols-5 py-10 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form className='p-8 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-2xl'>Đăng ký</div>
                <Input
                  name='email'
                  register={register}
                  type='email'
                  className='mt-4'
                  errorMessage={errors.email?.message}
                  placeholder='Email'
                />
                <div className='mt-3'>
                  <Button
                    type='submit'
                    className='flex items-center justify-center w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                    isLoading={registerAccountMutation.isPending}
                    disabled={registerAccountMutation.isPending}
                  >
                    Đăng ký
                  </Button>
                </div>
                <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-300" />
                  <span className="px-3 font-medium text-gray-300 bg-white left-1/2 dark:text-gray-300">Hoặc</span>
                  <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-300" />
                </div>

                <div className="flex items-center justify-center w-full space-x-4 p-4">
                  <div className="flex items-center text-white font-bold py-2 px-4 rounded-lg shadow-lg transition transform hover:scale-105 w-full">
                    <img className='w-9' src={facebookSvg} />
                    <p className='text-gray-900  text-center font-medium pl-3'>Facebook</p>
                  </div>
                  <div className="flex items-center text-white text-center font-bold py-2 px-4 rounded-sm shadow-lg transition transform hover:scale-105 w-full">
                    <img className='w-9' src={googleSvg} />
                    <p className='text-gray-900 font-medium pl-3'>Google</p>
                  </div>
                </div>

                <div className='mt-8 text-center '>

                  <div className='flex items-center justify-center'>
                    <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                    <Link to={'/login'} className='text-red-400 ml-1'>
                      Đăng nhập
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
