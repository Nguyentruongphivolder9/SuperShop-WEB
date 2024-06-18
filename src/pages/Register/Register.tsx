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

  //Các biến cho Component Stepper.tsx;
  const step: number = 3;
  const messages = ['Enter your email', 'Create a password', 'Confirm your password'];
  const [currentStep, setCurrentStep] = useState<Number>(1);

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

  const handleGoNextStep = () => {

    console.log('Moving to the next step');
  };



  return (
    <div className="container mx-auto p-4">
      <Stepper
        //Step hiej tai
        current_step={1}
        // Setup tổng số step mà stepper dùng.
        steps={3}
        // Setup các message cho các step.
        messages={['Enter your email', 'Create a password', 'Confirm your password']}
        // Step đã complete chưa.
        is_complete={registerAccountMutation.isSuccess}
        //Go to next step 
        goToNextStep={() => { console.log("Next step") }}
        //Go to prev step
        goToPrevStep={() => { console.log("Go to prev step") }}
      >
        <div className="bg-cyan-300 p-8 rounded shadow-md border-r-black">
          <div className="max-w-md mx-auto">
            <form className="bg-white p-6 rounded shadow-sm" onSubmit={onSubmit} noValidate>
              <h2 className="text-2xl mb-6">Đăng ký</h2>
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
              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-8'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm_password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex items-center justify-center w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}                  >
                  Đăng ký
                </Button>
              </div>
              <div className="flex items-center justify-between mt-6">
                <hr className="w-5/12 border-gray-300" />
                <span className="text-gray-500">Hoặc</span>
                <hr className="w-5/12 border-gray-300" />
              </div>
              <div className="flex space-x-4 mt-4">
                <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded hover:bg-gray-100">
                  <img src={facebookSvg} className="w-6 h-6" alt="Facebook" />
                  <span className="ml-2 text-gray-700">Facebook</span>
                </button>
                <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded hover:bg-gray-100">
                  <img src={googleSvg} className="w-6 h-6" alt="Google" />
                  <span className="ml-2 text-gray-700">Google</span>
                </button>
              </div>
              <div className="mt-4 text-center">
                <span className="text-gray-500">Bạn đã có tài khoản?</span>
                <Link to={'/login'} className="text-red-500 ml-1">Đăng nhập</Link>
              </div>
            </form>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
              onClick={handleGoNextStep} // Thêm sự kiện nhấp vào nút Next Step
            >
              Next Step
            </button>
          </div>
        </div>
      </Stepper >
    </div >
  );
}

