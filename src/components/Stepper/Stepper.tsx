import { useState } from 'react';
import { StepperProps } from 'src/types/stepper.type';

const Stepper = ({ steps, current_step = 1, messages, is_complete, children, goToNextStep, goToPrevStep }: StepperProps) => {
    const [currentStep, setCurrentStep] = useState(current_step);
    const [complete, setComplete] = useState(is_complete);

    const handleGoPrevStep = () => {
        if (currentStep === 1) return;
        else {
            setCurrentStep(prev => prev - 1);
        }
    }
    const handleGoNextStep = () => {
        if (currentStep === steps) {
            setComplete(true);
            return;
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    return (
        <>
            <ol className="flex justify-between items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse container">
                {messages.map((message: string, i) => (
                    <li key={i} className={`flex items-center space-x-2.5 rtl:space-x-reverse ${currentStep === i + 1 ? 'text-cyan-600 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
                        <span className={`flex items-center justify-center w-8 h-8 border ${currentStep === i + 1 ? 'border-blue-600' : 'border-gray-700'} rounded-full shrink-0 dark:border-${currentStep === i + 1 ? 'green' : 'gray'}-400 transition-colors duration-500`}>
                            {i + 1}
                        </span>
                        <span>
                            <h3 className="font-medium leading-tight">{message}</h3>
                            <p className="text-sm">Step details here</p>
                            <li>{steps}</li>
                        </span>
                    </li>
                ))}
            </ol>
            {!complete && (
                <div className='flex justify-between'>
                    <button
                        className="mt-4 px-4 py-2 bg-cyan-400 text-black rounded  hover:bg-cyan-600 transition duration-300"
                        onClick={handleGoNextStep}
                    >
                        {currentStep === steps ? "Finish" : "Next"}
                    </button>

                    <button
                        className="mt-4 px-4 py-2 bg-cyan-400 text-black rounded hover:bg-cyan-600 transition duration-300"
                        onClick={handleGoPrevStep}
                    >
                        {currentStep === 1 ? "Cancel" : "Previous"}
                    </button>
                </div>
            )}

            <div className="mt-6">
                {children}
            </div>
        </>
    );
};

export default Stepper;
