import { useState } from 'react';
import { StepperProps, StepperIcons } from 'src/types/stepper.type';
import classNames from 'classnames';

const StepperIcon = ({ is_active, is_complete, step_number }: StepperIcons) => {
    return (
        <span
            className={classNames(
                'flex items-center justify-center w-8 h-8 border rounded-full shrink-0 transition-colors duration-500',
                {
                    'border-green-600 border-2': is_active,
                    'border-gray-600': !is_active && !is_complete,
                    'dark:border-green-400': is_active,
                    'dark:border-gray-400': !is_active && !is_complete
                }
            )}
        >
            {!is_active ? (
                is_active || is_complete ? (

                    <li>
                        <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                            <svg className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                            </svg>

                        </span>
                    </li>


                ) : (
                    step_number
                )
            ) : (
                step_number
            )}
        </span>
    );
};

const Stepper = ({ steps, current_step, messages, is_complete, children, goToNextStep, goToPrevStep }: StepperProps) => {
    const [complete, setComplete] = useState(is_complete);

    const handleStepChange = (direction: string) => {
        if (direction === 'next') {
            if (current_step <= steps) {
                goToNextStep();
            } else {
                setComplete(true);
            }
        } else {
            if (current_step > 1) {
                goToPrevStep();
            }
        }
    };

    return (
        <>
            <div className='relative '>
                <ol className="flex justify-between items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse container bg-white rounded-md">

                    {messages.map((message, i) => {
                        const stepNumber = i + 1;
                        const isActive = current_step === stepNumber;
                        const isCompleted = current_step > stepNumber;
                        return (
                            <li
                                key={i}
                                className={classNames(
                                    'z-0 p-5 flex items-center space-x-2.5 rtl:space-x-reverse transition-colors duration-500',
                                    {
                                        'text-green-600 font-semibold': isActive,
                                        'text-gray-500 dark:text-gray-400': !isActive
                                    }
                                )}
                            >
                                <StepperIcon is_active={isActive} is_complete={isCompleted} step_number={stepNumber} />
                                {isCompleted ? (
                                    <span className="text-blue-600 font-semibold">Step {i + 1}</span>
                                ) : (
                                    <span>
                                        <h3 className="font-medium leading-tight">{message}</h3>
                                        {/* <p className="text-sm">Step details here</p> */}
                                    </span>
                                )}
                            </li>

                        );
                    })}
                </ol>
            </div>
            {!complete && (
                <div className="flex justify-between">
                    <button
                        className="mt-4 px-4 py-2 bg-cyan-400 text-black rounded hover:bg-cyan-600 transition duration-300"
                        onClick={() => handleStepChange('next')}
                    >
                        {current_step === steps ? 'Finish' : 'Next'}
                    </button>
                    <button
                        className="mt-4 px-4 py-2 bg-cyan-400 text-black rounded hover:bg-cyan-600 transition duration-300"
                        onClick={() => handleStepChange('prev')}
                    >
                        {current_step === 1 ? 'Cancel' : 'Previous'}
                    </button>
                </div>
            )}
            <div className="mt-6">{children}</div>
        </>
    );
};

export default Stepper;
