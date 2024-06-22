import React, { useState } from 'react';
import Registers from 'src/components/RegisterForms/Registers';
import Stepper from 'src/components/Stepper';

export default function Register() {
    const steps = 6; // Số bước của bạn
    const messages = ['Xác nhận email của bạn', 'Nhập mật khẩu', 'Xác nhận mật khẩu', 'Chơi bóng rổ', 'Chơi minecraft', 'Final step'];
    const [currentStep, setCurrentStep] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);

    return (
        <div className="mx-auto p-3 bg-blue pb-20">
            <Stepper
                current_step={currentStep}
                steps={steps}
                messages={messages}
                is_complete={isCompleted}
                goToNextStep={() => setCurrentStep(prev => prev + 1)}
                goToPrevStep={() => setCurrentStep(prev => prev - 1)}
            >
                <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-lg">
                    <Registers
                        current_step={currentStep}
                        is_complete={isCompleted}
                        steps={steps}
                        goToNextStep={() => setCurrentStep(prev => prev + 1)}
                        goToPrevStep={() => setCurrentStep(prev => prev - 1)}
                    />
                </div>
            </Stepper>
        </div>
    );
}
