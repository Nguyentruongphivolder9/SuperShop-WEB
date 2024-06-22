import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import omit from 'lodash/omit';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { userSchema, schema, Schema } from '../../utils/rules';
import authApi from '../../apis/auth.api';
import google from "../../assets/logoSvg/googleSvg.svg";
import facebook from "../../assets/logoSvg/faceBookSvg.svg";
import { Link } from 'react-router-dom';

type FormData = Pick<Schema, 'email'>;
//Schema cho việc Xác nhận Email : Chỉ cần input là Email dạng String.
const emailVerification = schema.pick(['email']);
//Schema cho việc đăng ký tài khoản : có các fields bắc buộc để đăng kí.
const registerSchema = userSchema.pick(['name', 'phone', 'address', 'avatar', 'date_of_birth', 'password', 'new_password', 'confirm_password']);

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

    const registerAccountMutation = useMutation({
        mutationFn: async (body: FormData) => await authApi.verifyEmail(body)
    });
    const onSubmit = handleSubmit((data) => {
        console.log("Email: ", data.email);
        setYourEmail(data.email);
        setIsWaitingForVerification(true);
        registerAccountMutation.mutate(data);
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
                {current_step === 1 && (
                    isWaitingForVerification ? (
                        <div className="verification-container bg-gray-100 p-6 shadow-lg  max-w-md mx-auto mt-10">
                            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Kiểm tra hòm thư của bạn</h2>
                            <ul className="text-center text-gray-700 bg-green-100 rounded-lg p-6">
                                <li className="mb-4">
                                    Hãy vào Gmail <a href={`https://mail.google.com/mail/u/0/#inbox`} className='underline font-bold' target="_blank" >{yourEmail}</a> của bạn và ấn vào nút xác nhận được đính kèm bên trong thư.
                                </li>
                                <li className="mb-4">
                                    Nếu bạn không thấy email xác nhận, hãy nhấn vào nút
                                </li>
                                <li>
                                    <a
                                        className='py-2 px-4 uppercase bg-blue text-white text-sm font-medium rounded-md hover:bg-cyan-400 inline-block'
                                        href='/anhtien'>
                                        Gửi lại
                                    </a>
                                </li>
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
                {current_step === 4 && (
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
    return (
        <div>
            Typing user info.
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
