import config from 'src/constants/config'
import { VariantsResponse } from 'src/types/product.type'

interface Props {
  variantData: VariantsResponse
}

export default function VariantButton({ variantData }: Props) {
  return (
    <div className='h-auto w-auto'>
      {variantData.imageUrl ? (
        <button className='relative text-sm pl-10 p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
          {variantData.name}
          <img
            className='h-6 w-6 absolute top-[50%] -translate-y-[50%] object-cover left-2'
            src={`${config.awsURL}products/${variantData.imageUrl}`}
            alt={variantData.name}
          />
        </button>
      ) : (
        <button className='text-sm p-2 mt-2 mr-2 flex items-center rounded-sm border border-[#00000017] min-h-10 min-w-20 outline-0 justify-center '>
          {variantData.name}
        </button>
      )}
    </div>
  )
}
