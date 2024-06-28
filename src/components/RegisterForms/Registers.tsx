import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import omit from 'lodash/omit';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { userSchema, schema, Schema, UserSchema } from '../../utils/rules';
import authApi from '../../apis/auth.api';
import google from "../../assets/logoSvg/googleSvg.svg";
import facebook from "../../assets/logoSvg/faceBookSvg.svg";
import { Link } from 'react-router-dom';


//Schema cho việc Xác nhận Email : Chỉ cần input là Email dạng String.
type FormData = Pick<Schema, 'email'>;
const emailVerification = schema.pick(['email']);
//Schema cho việc đăng ký tài khoản : có các fields bắc buộc để đăng kí.
type FormDataRegister = Pick<UserSchema, 'name' | 'phone' | 'email' | 'address' | 'avatar' | 'date_of_birth' | 'password' | 'confirm_password'>;
const registerSchema = userSchema.pick(['name', 'phone', 'email', 'address', 'avatar', 'date_of_birth', 'password', 'confirm_password']);

type SubRegisterProps = {
    current_step: number;
    steps: number;
    is_complete: boolean;
    goToNextStep: () => void;
    goToPrevStep: () => void;
}


function Registers({ current_step, steps, is_complete, goToNextStep, goToPrevStep }: SubRegisterProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(emailVerification)
    });

    const [isWaitingForVerification, setIsWaitingForVerification] = useState(false);
    const [yourEmail, setYourEmail] = useState('');

    const emailVerfication = useMutation({
        mutationFn: async (body: FormData) => await authApi.verifyEmail(body)
    });
    const onSubmit = handleSubmit((data) => {
        console.log("Email: ", data.email);
        setYourEmail(data.email);
        setIsWaitingForVerification(true);
        emailVerfication.mutate(data);
    });

    const handleGoNextStep = () => {
        goToNextStep();
    };

    const handleGoPrevStep = () => {
        setIsWaitingForVerification(false);

    };

    return (
        <>
            <h2 className="text-2xl mb-4">Đăng ký</h2>
            <form className="bg-white pb-4 rounded-2" onSubmit={onSubmit} noValidate>
                {current_step === 4 && (
                    isWaitingForVerification ? (
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
                                    Hãy vào Gmail <a href={`https://mail.google.com/mail/u/0/#inbox`} className='underline font-semibold text-indigo-700' target="_blank" >{yourEmail}</a> của bạn và ấn vào nút xác nhận được đính kèm bên trong thư.
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
                                    onClick={handleGoNextStep}
                                    className={`flex items-center justify-center w-full text-center py-3 px-5 uppercase bg-blue text-white text-sm font-medium hover:bg-cyan-400 mr-2  ${isWaitingForVerification ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isWaitingForVerification}
                                >
                                    Tiếp theo
                                </Button>
                                <Button
                                    onClick={handleGoPrevStep}
                                    className="flex items-center justify-center w-full text-center py-3 px-5 uppercase bg-blue text-white text-sm font-medium hover:bg-cyan-400 ml-2 "
                                >
                                    Quay về
                                </Button>
                            </div>
                        </div>


                    ) : (
                        <>
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
                        </>
                    )
                )}
                {current_step === 2 && (
                    <VerifyEmail goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} current_step={0} is_complete={false} steps={0} />
                )}
                {current_step === 3 && (
                    <WaitingForVerifying goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} current_step={0} is_complete={false} steps={0} />
                )}
                {current_step === 1 && (
                    <UserInformation goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} current_step={0} is_complete={false} steps={0} />
                )}
                {current_step === 5 && (
                    <UserAvatar goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} current_step={0} is_complete={false} steps={0} />
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
            </form>
        </>
    );
}

const VerifyEmail = ({ goToNextStep, goToPrevStep }: SubRegisterProps) => {
    return (
        <div>
            This is verify step.
            <div className='flex justify-between'>
                <Button
                    onClick={goToNextStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400 mr-2 mt-10'
                >Tiếp theo</Button>
                <Button
                    onClick={goToPrevStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400  ml-2 mt-10'
                >Quay về</Button>
            </div>
        </div>
    );
}

const WaitingForVerifying = ({ goToNextStep, goToPrevStep }: SubRegisterProps) => {
    return (
        <div>
            Waiting for verifying.
            <div className='flex justify-between'>
                <Button
                    onClick={goToNextStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400 mr-2 mt-10'
                >Tiếp theo</Button>
                <Button
                    onClick={goToPrevStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400  ml-2 mt-10'
                >Quay về</Button>
            </div>
        </div>
    );
}

const UserInformation = ({ goToNextStep, goToPrevStep }: SubRegisterProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormDataRegister>({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = handleSubmit((data: FormData) => {

    });

    const handleGoNextStep = () => {
        goToNextStep();
    };

    const handleGoPrevStep = () => {

    };
    return (
        <div>
            <div className='flex justify-between'>
                <Input
                    name='full_name'
                    register={register}
                    type='text'
                    className='mt-6 pr-2'
                    errorMessage={errors.full_name?.message}
                    placeholder='Nhập họ tên đầy đủ'
                />
                <Input
                    name='user_name'
                    register={register}
                    type='text'
                    className='mt-6 pl-2'
                    errorMessage={errors.user_name?.message}
                    placeholder='Nhập tên tài khoản'
                />
            </div>
            <Input
                name='phone'
                register={register}
                type='number'
                className='mt-6'
                errorMessage={errors.phone?.message}
                placeholder='Nhập số điện thoại của bạn'
            />
            <Input
                name='password'
                register={register}
                type='text'
                className='mt-6'
                errorMessage={errors.password?.message}
                placeholder='Nhập mật khẩu của bạn'
            />
            <Input
                name='confirm_password'
                register={register}
                type='text'
                className='mt-6'
                errorMessage={errors.confirm_password?.message}
                placeholder='Nhập lại mật khẩu của bạn'
            />
            <label className="text-gray-500 text-md font-semibold block mt-6 -mb-5">Ngày sinh nhật : </label>
            <Input
                name='date_of_birth'
                register={register}
                type='datetime-local'
                className='mt-6'
                errorMessage={errors.date_of_birth?.message}
                placeholder='Nhập ngày sinh của bạn'
            />
            <label className="text-gray-500 text-md font-semibold block mt-6 -mb-5">Giới tính : </label>
            <Input
                name=''
                register={register}
                type='radio'
                className='mt-6'
                errorMessage={errors.date_of_birth?.message}
                placeholder='Nhập ngày sinh của bạn'
            />

            <div className='flex justify-between'>
                <Button
                    onClick={goToNextStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400 mr-2 mt-10'
                >Tiếp theo</Button>
                <Button
                    onClick={goToPrevStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400  ml-2 mt-10'
                >Quay về</Button>
            </div>
        </div>
    );
}

const UserAvatar = ({ goToNextStep, goToPrevStep }: SubRegisterProps) => {
    return (
        <div>
            Giving avatar.
            <div className='flex justify-between'>
                <Button
                    onClick={goToNextStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400 mr-2 mt-10'
                >Tiếp theo</Button>
                <Button
                    onClick={goToPrevStep}
                    className='flex items-center justify-center w-full text-center py-2 px-2 uppercase bg-blue text-white text-sm hover:bg-cyan-400  ml-2 mt-10'
                >Quay về</Button>
            </div>
        </div>
    );
}

export default Registers;
