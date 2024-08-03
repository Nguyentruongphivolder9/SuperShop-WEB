import CloseIcon from "src/assets/svgs/CloseIcon";
import ImageCropper from "./ImageCropper";
import { useState } from "react";

export type ModalChangerProps = {

    updateAvatar: any,
    closeModal: boolean,
    handleCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalChanger({ updateAvatar, closeModal, handleCloseModal }: ModalChangerProps) {
    if(closeModal === true) return;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-labelledby="crop-image-dialog"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-cyan-100 bg-opacity-70 backdrop-blur-sm transition-opacity"></div>
            <div className="relative z-10 w-full max-w-lg p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-xl">
                <button
                    type="button"
                    className="absolute top-4 right-4 rounded-full p-2 text-gray-400 hover:bg-gray-200 focus:outline-none"
                    onClick={() => handleCloseModal(true)}
                >
                    <span className="sr-only">Close menu</span>
                    <CloseIcon />
                </button>
                <div className="mt-4 sm:mt-6 lg:mt-8">
                    <ImageCropper />
                </div>
            </div>
        </div>
    );
}

export default ModalChanger;
