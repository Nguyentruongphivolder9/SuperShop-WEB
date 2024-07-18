import { useState } from "react";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
} from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';

const MIN_DIMENSION = 200;
const ASPECT_RATIO = 1;

const ImageCropper = () => {
    const [crop, setCrop] = useState<Crop | undefined>(undefined);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [errMessage, setErrMessage] = useState<string | null>(null);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {

            const imageElement = new Image();
            const imgUrl = reader.result?.toString() || "";
            imageElement.src = imgUrl;

            imageElement.addEventListener("load", () => {
                const { naturalHeight, naturalWidth } = imageElement;
                console.log(naturalHeight, naturalWidth);
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setErrMessage("Chiều dài và chiều rộng của ảnh đại diện phải lớn 200px");
                    return setImgSrc(null);
                }
            });
            setImgSrc(imgUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);

        setCrop(centeredCrop);
    };

    const onCropChange = (newCrop: Crop) => {
        setCrop(newCrop);
    };

    return (
        <>
            <label className="block mb-3 w-fit">
                <span className="sr-only">Choose profile photo</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 
                file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300
                hover:file:bg-gray-600"
                />
            </label>
            {errMessage && <p className="text-red-400 text-xs">{errMessage}</p>}
            {imgSrc && (
                <>
                    <div className="flex flex-col items-center">
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            circularCrop
                            keepSelection
                            aspect={ASPECT_RATIO}
                        >
                            <img
                                src={imgSrc}
                                alt="Upload"
                                style={{ maxHeight: "70vh" }}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    </div>
                    <div className="flex w-full justify-center mt-4">
                        <button className="bg-cyan-300 pl-4 pr-4 pt-2 pb-2 rounded-lg active:bg-cyan-500 hover:bg-cyan-500">Hoàn thành cắt xén</button>
                    </div></>
            )}

        </>
    );
};

export default ImageCropper;
