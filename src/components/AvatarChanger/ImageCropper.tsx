import { useContext, useState } from "react";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { AppContext } from "src/contexts/app.context";
import UploadImage from "../../assets/images/UploadImgIcn-removebg-preview.png";
import spinImage from "/mnt/data/spin.gif";

const MIN_DIMENSION = 200;
const ASPECT_RATIO = 1;
type imageDetail = {
    dai: number;
    rong: number;
};

const ImageCropper = () => {
    const { profile } = useContext(AppContext);
    const [crop, setCrop] = useState<Crop | undefined>(undefined);
    const [imgSrc, setImgSrc] = useState<string | null>(
        profile?.avatarUrl ? profile.avatarUrl : null
    );
    const [errMessage, setErrMessage] = useState<string | null>(null);
    const [imageDetail, setImageDetail] = useState<imageDetail>({
        dai: 0,
        rong: 0,
    });
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // Handle drag events
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            setIsDragging(false);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDropImage = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        alert("You dropped an image.")
        setIsDragging(false);
    };

    // Handle file selection
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
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setErrMessage(
                        "Chiều dài và chiều rộng của ảnh đại diện phải lớn 200px"
                    );
                    return setImgSrc(profile?.avatarUrl ? profile.avatarUrl : null);
                }
            });
            setImgSrc(imgUrl);
            setErrMessage(null);
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
        setImageDetail({ dai: height, rong: width });
        setCrop(centeredCrop);
    };

    const onCropChange = (newCrop: Crop) => {
        setCrop(newCrop);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            {/* Khối kéo thả ảnh ở đây */}
            <div
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDropImage}
                className="relative bg-cyan-100 bg-opacity-40 rounded-md border-dashed border-2 border-sky-500 w-full p-8 flex justify-center items-center"
            >
                <div
                    className={`absolute inset-0 flex justify-center items-center text-white transition-all duration-300 ${isDragging ? "bg-black bg-opacity-30" : "bg-opacity-0"
                        }`}
                >
                    
                </div>
                <div className="text-center relative z-10">
                    <div className="flex flex-col justify-center items-center space-y-4">
                        <div className="relative">
                            <img src={UploadImage} alt="Uploaded" className="w-32" />
                        </div>
                        <p className="text-xl text-gray-700">
                            Drag & Drop to Upload Avatar Image
                        </p>
                        <p className="font-semibold text-xl text-gray-700">Or</p>
                        <label className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                            Select Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onSelectFile}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div className="mt-4">
                        {errMessage && (
                            <div className="flex items-center text-red-500 text-xs">
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m-2-4h.01M12 18h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                                    ></path>
                                </svg>
                                <p>{errMessage}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-gray-200 bg-opacity-40 rounded-md border-separate border-gray-500 border-2 w-50 p-8 flex flex-col items-center">
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
                        {imageDetail.dai + "x" + imageDetail.rong}
                        <div className="flex w-full justify-center mt-4">
                            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg active:bg-cyan-700 hover:bg-cyan-600">
                                <p className="text-center">Lưu</p>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageCropper;
