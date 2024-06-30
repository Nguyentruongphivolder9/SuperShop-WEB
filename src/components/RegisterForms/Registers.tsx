import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { userSchema, schema, Schema, UserSchema } from '../../utils/rules';
import authApi from '../../apis/auth.api';
import google from "../../assets/logoSvg/googleSvg.svg";
import facebook from "../../assets/logoSvg/faceBookSvg.svg";
import { Link } from 'react-router-dom';

const emailVerification = schema.pick(['email']);
type FormDataEmail = Pick<Schema, 'email'>;
type FormDataRegister = Pick<UserSchema, 'user_name' | 'full_name' | 'gender' | 'phone' | 'email' | 'address' | 'avatar' | 'date_of_birth' | 'password' | 'confirm_password'>;


type SubRegisterProps = {
    current_step: number;
    steps: number;
    is_complete: boolean;
    goToNextStep: () => void;
    goToPrevStep: () => void;
    handleSetEmail?: React.Dispatch<React.SetStateAction<FormDataEmail>>;
    email?: FormDataEmail;
};



function Registers({ current_step, steps, is_complete, goToNextStep, goToPrevStep }: SubRegisterProps) {
    const [email, setEmail] = useState<FormDataEmail>({
        email: ''
    });
    return (
        <>
            <h2 className="text-2xl mb-4">Đăng ký</h2>
            {current_step === 1 && (
                <TypingEmail
                    goToNextStep={goToNextStep}
                    goToPrevStep={goToPrevStep}
                    current_step={current_step}
                    is_complete={is_complete}
                    steps={steps}
                    handleSetEmail={setEmail}
                    email={email}
                />
            )}
            {current_step === 2 && (
                <WaitingEmailVerifyCation
                    goToNextStep={goToNextStep}
                    goToPrevStep={goToPrevStep}
                    current_step={current_step}
                    is_complete={is_complete}
                    steps={steps}
                    email={email}
                />
            )}


            {current_step === 4 && (
                <WatingForVerifyCation
                    goToNextStep={goToNextStep}
                    goToPrevStep={goToPrevStep}
                    current_step={current_step}
                    is_complete={is_complete}
                    steps={steps}
                />
            )}

            {current_step === 3 && (
                <UserInformation
                    goToNextStep={goToNextStep}
                    goToPrevStep={goToPrevStep}
                    current_step={current_step}
                    is_complete={is_complete}
                    steps={steps}
                />
            )}


            <div className="flex items-center justify-between mt-6 mb-6">
                <hr className="w-4/12 border-gray-300" />
                <span className="text-gray-500 text-md">Hoặc</span>
                <hr className="w-4/12 border-gray-300" />
            </div>

            <div className="flex space-x-2 mt-2">
                <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded hover:bg-gray-100">
                    <img src={facebook} alt="Facebook" className="w-7 h-7" />
                    <span className="ml-1 text-gray-700 text-md">Facebook</span>
                </button>
                <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded hover:bg-gray-100">
                    <img src={google} alt="Google" className="w-7 h-7" />
                    <span className="ml-1 text-gray-700 text-md">Google</span>
                </button>
            </div>

            <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                    <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                    <Link to={'/login'} className='text-red-400 ml-1'>
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Registers;




const UserInformation = ({ current_step, steps, is_complete, goToNextStep, goToPrevStep }: SubRegisterProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormDataRegister>({
        resolver: yupResolver(userSchema),
    });

    const onSubmit = handleSubmit((data) => {

    });
    return (
        <>
            <form className="bg-white pb-4 rounded-2" onSubmit={onSubmit} noValidate>
                <label className="text-gray-500 text-md font-semibold block mt-6 -mb-5">Họ tên đầy đủ : <b className='text-red-500'>(*)</b></label>
                <Input
                    name='full_name'
                    register={register}
                    type='text'
                    className='mt-6'
                    errorMessage={errors.full_name?.message}
                    placeholder='Nhập họ tên đầy đủ'

                />
                <label className="text-gray-500 text-md font-semibold block mt-6 -mb-5">Tên tài khoản : <b className='text-red-500'>(*)</b></label>
                <Input
                    name='user_name'
                    register={register}
                    type='text'
                    className='mt-6'
                    errorMessage={errors.user_name?.message}
                    placeholder='Nhập tên tài khoản'
                />
                <label className="text-gray-500 text-md font-semibold block mt-6 -mb-5">Số điện thoại : <b className='text-red-500'>(*)</b></label>
                <Input
                    name='phone'
                    register={register}
                    type='number'
                    className='mt-6'
                    errorMessage={errors.phone?.message}
                    placeholder='Nhập số điện thoại của bạn'
                />
                <label className="text-gray-500 text-md font-semibold block mt-6 -mb-5">Địa chỉ : </label>
                <Input
                    name='address'
                    register={register}
                    type='text'
                    className='mt-6'
                    errorMessage={errors.address?.message}
                    placeholder='Nhập địa chỉ của bạn'
                />
                <label className="text-gray-500 text-md font-semibold block mt-6 -mb-5">Mật khẩu : <b className='text-red-500'>(*)</b></label>
                <Input
                    name='password'
                    register={register}
                    type='password'
                    className='mt-6'
                    errorMessage={errors.password?.message}
                    placeholder='Nhập mật khẩu của bạn'
                />
                <Input
                    name='confirm_password'
                    register={register}
                    type='password'
                    className='mt-6'
                    errorMessage={errors.confirm_password?.message}
                    placeholder='Nhập lại mật khẩu của bạn'
                />
                <label className="text-gray-500 text-md font-semibold block mt-6 -mb-5">Ngày sinh nhật : <b className='text-red-500'>(*)</b></label>
                <Input
                    name='date_of_birth'
                    register={register}
                    type='date'
                    className='mt-6'
                    errorMessage={errors.date_of_birth?.message}
                />
                <label className="text-gray-500 text-md font-semibold block mt-6 -mb-5">Giới tính : <b className='text-red-500'>(*)</b></label>
                <div className='flex mt-6 justify-between'>
                    <div className='flex items-center bg-cyan-200 rounded-md p-3 w-full m-4 cursor-pointer'>
                        <label htmlFor='gender_male' className='font-bold text-gray-800 ml-3'>
                            Nam
                        </label>
                        <Input
                            name='gender'
                            register={register}
                            type='radio'
                            value="male"
                            errorMessage={errors.gender?.message}
                        />
                    </div>
                    <div className='flex items-center bg-cyan-200 rounded-md p-3 w-full m-4 cursor-pointer'>
                        <label htmlFor='gender_female' className='font-bold text-gray-800 ml-3'>
                            Nữ
                        </label>
                        <Input
                            name='gender'
                            register={register}
                            type='radio'
                            value='female'
                            errorMessage={errors.gender?.message}
                        />
                    </div>

                </div>

                <div className='flex justify-between'>
                    <Button
                        type='submit'
                        className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400 mr-2 mt-10'
                    >
                        Tiếp theo
                    </Button>
                    <Button
                        onClick={goToPrevStep}
                        className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400  ml-2 mt-10'
                        disabled={current_step === 1}
                    >
                        Quay về
                    </Button>
                </div>
            </form>
        </>
    )
}


const WatingForVerifyCation = ({ current_step, steps, is_complete, goToNextStep, goToPrevStep }: SubRegisterProps) => {
    return (
        <>
            Waiting for verification.
            <div className='flex justify-between'>
                <Button
                    onClick={goToNextStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400 mr-2 mt-10'
                >
                    Tiếp theo
                </Button>
                <Button
                    onClick={goToPrevStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400  ml-2 mt-10'
                >
                    Quay về
                </Button>
            </div>
        </>
    )
}

const TypingEmail = ({ current_step, steps, is_complete, goToNextStep, goToPrevStep, handleSetEmail, email }: SubRegisterProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormDataEmail>({
        resolver: yupResolver(emailVerification),
        defaultValues: email
    });

    const emailVerificationMutation = useMutation({
        mutationFn: async (body: FormDataEmail) => await authApi.verifyEmail(body)
    });
    const onSubmit = handleSubmit((data) => {
        if (handleSetEmail && typeof data !== 'undefined') {
            handleSetEmail(data);
            emailVerificationMutation.mutate(data);
            console.log(data);
        }

    })
    return (<>
        <form className="bg-white pb-4 rounded-2" onSubmit={onSubmit} noValidate>
            <Input
                name='email'
                register={register}
                type='email'
                className='mt-6'
                errorMessage={errors.email?.message}
                placeholder='Nhập Email của bạn'
            />
            <div className='mt-4'>
                <Button
                    type='submit'
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400'
                >
                    Gửi Email xác nhận
                </Button>
            </div>
            <div className='flex justify-between'>
                <Button
                    onClick={goToNextStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400 mr-2 mt-10'
                >
                    Tiếp theo
                </Button>
                <Button
                    onClick={goToPrevStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400  ml-2 mt-10'
                    disabled={current_step === 1}
                >
                    Quay về
                </Button>
            </div>
        </form>

    </>)
}

const WaitingEmailVerifyCation = ({ current_step, steps, is_complete, goToNextStep, goToPrevStep, email }: SubRegisterProps) => {
    const [isCompleted, setIsCompleted] = useState(false);
    return (
        <div className="verification-container bg-gray-100 p-6 shadow-lg max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Kiểm tra hòm thư của bạn</h2>
            <div className="flex items-center justify-center mb-6">
                <button
                    type='button'
                    className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow text-white bg-red-500 hover:bg-red-400 transition ease-in-out duration-150 cursor-not-allowed'
                >
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chờ đợi xác thực từ bạn...
                </button>
            </div>
            <ul className="text-center list-disc text-gray-700 bg-green-100 rounded-lg p-6">
                <li className="mb-4">
                    Hãy vào Gmail <a href={`https://mail.google.com/mail/u/0/#inbox`} className='underline font-semibold text-indigo-700' target="_blank" >{email?.email}</a> của bạn và ấn vào nút xác nhận được đính kèm bên trong thư.
                </li>
                <li className="mb-4">
                    Nếu bạn không thấy email xác nhận, hãy nhấn vào nút
                </li>
                <a
                    className='py-2 px-4 uppercase bg-blue text-white text-sm font-medium hover:bg-cyan-400 inline-block'
                    href='/anhtien'>
                    Gửi lại
                </a>
            </ul>
            <div className="flex justify-between pt-7">
                <Button
                    onClick={goToNextStep}
                    className={`flex items-center justify-center w-full text-center py-3 px-5 uppercase bg-blue text-white text-sm font-medium hover:bg-cyan-400 mr-2  ${isCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Tiếp theo
                </Button>
                <Button
                    onClick={goToPrevStep}
                    className="flex items-center justify-center w-full text-center py-3 px-5 uppercase bg-blue text-white text-sm font-medium hover:bg-cyan-400 ml-2 "
                >
                    Quay về
                </Button>
            </div>
        </div>
    )
}