import { ReactNode } from "react";

export type StepperProps = {
    steps : number;
    messages: string[];
    is_complete: boolean;
    children: ReactNode;
    current_step: number;
    goToPrevStep: () => void;
    goToNextStep: () => void;
}