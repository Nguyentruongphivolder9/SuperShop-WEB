import { VariantsGroupRequest } from 'src/types/product.type'
import InputValueOfVariation from '../InputValueOfVariation'

interface Props {
  handlerRemoveVariations: (id: string) => void
  data: VariantsGroupRequest
}

export default function VariantGroup({ handlerRemoveVariations, data }: Props) {
  return (
    <div className='p-4 bg-[#f6f6f6] rounded-md'>
      <div className='pb-4 flex flex-row justify-between items-start border-b-[1px] border-gray-300'>
        <div className='w-80'>
          <div className='w-full px-3 border bg-[#fff] h-8 rounded-md flex items-center hover:border-[#999999]'>
            <div className=' rounded-sm p-1 flex items-center flex-row justify-between w-full'>
              <input
                type='text'
                maxLength={14}
                className='text-sm text-[#333333] w-full border-none outline-none pr-3'
                placeholder='Input'
              />
              <div className='text-sm text-[#999999]'>0/14</div>
            </div>
          </div>
          {/* validation */}
        </div>
        <button type='button' onClick={() => handlerRemoveVariations(data.id)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-4 text-[#999999] hover:text-[#333333]'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
          </svg>
        </button>
      </div>
      <div className='mt-4 grid grid-cols-2 gap-3'>
        {data.variants?.map((variant) => <InputValueOfVariation key={variant.id} />)}
      </div>
    </div>
  )
}
