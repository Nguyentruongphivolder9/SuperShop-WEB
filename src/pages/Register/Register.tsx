import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import omit from 'lodash/omit';
import Input from 'src/components/Input';
import { schema, Schema } from 'src/utils/rules';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { ErrorResponse } from 'src/types/utils.type';
import Button from 'src/components/Button';
import path from 'src/constants/path';
import authApi from 'src/apis/auth.api';
import googleSvg from "../../assets/logoSvg/Google.svg";
import facebookSvg from "../../assets/logoSvg/Facebook.svg";
import Stepper from 'src/components/Stepper';
import { useState } from 'react';

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>;
const registerSchema = schema.pick(['email', 'password', 'confirm_password']);

export default function Register() {
  const navigate = useNavigate();

  const step: number = 7;
  const messages = ['Xác nhận email của bạn', 'Nhập mật khẩu', 'Xác nhận mật khẩu', 'Chơi bóng rổ', 'Dạy Robot', 'Chơi minecraft', 'Final step'];
  const [currentStep, setCurrentStep] = useState<number>(1);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  });

  const registerAccountMutation = useMutation({
    mutationFn: async (body: Omit<FormData, 'confirm_password'>) => await authApi.registerAccount(body)
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password']);
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        navigate(path.login);
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'validate'
              });
            });
          }
        }
      }
    });
  });


  return (
    <div className="mx-auto p-4 bg-blue">
      <Stepper
        current_step={currentStep}
        steps={step}
        messages={messages}
        is_complete={registerAccountMutation.isSuccess}
        goToNextStep={() => { setCurrentStep(prev => prev + 1) }}
        goToPrevStep={() => { setCurrentStep(prev => prev - 1) }}
      >
        <div className="p-2">
          <div className="max-w-md mx-auto"> 
            <form className="bg-white p-4 rounded shadow-sm" onSubmit={onSubmit} noValidate>
              <h2 className="text-xl mb-4">Đăng ký</h2>
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
                  className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}                  
                >
                 Tiếp theo
                </Button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <hr className="w-4/12 border-gray-300" />
                <span className="text-gray-500 text-xs">Hoặc</span>
                <hr className="w-4/12 border-gray-300" />
              </div>
              <div className="flex space-x-2 mt-2">
                <button className="flex items-center justify-center w-full py-1 border border-gray-300 rounded hover:bg-gray-100">
                  <img src={facebookSvg} className="w-4 h-6" alt="Facebook" />
                  <span className="ml-1 text-gray-700 text-xs">Facebook</span>
                </button>
                <button className="flex items-center justify-center w-full py-1 border border-gray-300 rounded hover:bg-gray-100">
                  <img src={googleSvg} className="w-4 h-6" alt="Google" />
                  <span className="ml-1 text-gray-700 text-xs">Google</span>
                </button>
              </div>
              <div className="mt-2 text-center">
                <span className="text-gray-500 text-xs">Bạn đã có tài khoản?</span>
                <Link to={'/login'} className="text-red-500 ml-1 text-xs">Đăng nhập</Link>
              </div>
            </form>
            <button
              className="mt-2 px-2 py-1 bg-blue-500 text-black rounded hover:bg-blue-600 text-xs"
              onClick={() => {setCurrentStep(prev => prev + 1)}}
            >
              Next Step
            </button>
          </div>
        </div>
      </Stepper >
    </div >
  );
}
