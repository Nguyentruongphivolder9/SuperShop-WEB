import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import authApi from 'src/apis/auth.api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { AppContext } from 'src/contexts/app.context';
import { ErrorResponse } from 'src/types/utils.type';
import { schema, Schema } from 'src/utils/rules';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { parseJwt } from 'src/utils/auth';
import facebookSvg from '../../assets/logoSvg/Facebook.svg';
import googleSvg from '../../assets/logoSvg/Google.svg';
import { profile } from 'console';

type FormData = Pick<Schema, 'email' | 'password'>;

const loginSchema = schema.pick(['email', 'password']);

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  });

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(parseJwt(data.data.data.accessToken))
        navigate('/');
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              });
            });
          }
        }
      }
    });
  });

  return (
    <div className='bg-blue'>
      <div className='container'>
        <div className='grid grid-cols lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-8'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />
              <div className="flex items-center justify-between mt-6 mb-6">
                <hr className="w-4/12 border-gray-300" />
                <span className="text-gray-500 text-xs">Hoặc</span>
                <hr className="w-4/12 border-gray-300" />
              </div>
              <div className="flex space-x-2 mt-2">
                <button type="button" className="flex items-center justify-center w-full py-1 border border-gray-300 rounded hover:bg-gray-100">
                  <img src={facebookSvg} className="w-7 h-8" alt="Facebook" />
                  <span className="ml-1 text-gray-700 text-xs">Facebook</span>
                </button>
                <button type="button" className="flex items-center justify-center w-full py-1 border border-gray-300 rounded hover:bg-gray-100">
                  <img src={googleSvg} className="w-7 h-8" alt="Google" />
                  <span className="ml-1 text-gray-700 text-xs">Google</span>
                </button>
              </div>
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex items-center justify-center w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPaused}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                  <Link to={'/register'} className='text-red-400 ml-1'>
                    Đăng ký
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
