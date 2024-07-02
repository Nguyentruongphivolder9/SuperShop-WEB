import { Link } from 'react-router-dom'
import ProductRatingStar from 'src/components/ProductRatingStar'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumbertoSocialStyle, generateNameId } from 'src/utils/utils'

interface Props {
  product: ProductType
}

// export default function Product({ product }: Props) {
export default function Product() {
  return (
    <Link className='H-full w-full' to={`${path.home}${generateNameId({ name: 'product.name', id: 'product._id' })}`}>
      <div className='overflow-hidden w-full h-full border rounded-sm bg-white shadow transition-transform duration-100 ease-linear hover:translate-y-[-0.0625rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={
              'https://super-shop.s3.ap-south-1.amazonaws.com/products/ss-picture-43559549-8e4e-45b0-911e-06b25fc87669'
            }
            alt={'product.name'}
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-[2rem] text-sm'>
            Mũ bảo hiểm full face Royal M138B 1 kính - Tặng kèm túi bảo vệ mũ
          </div>
          <div className='mt-3 flex items-start justify-start'>
            <div className='ml-1 text-blue truncate text-orange'>
              <span className='text-xl'>₫</span>
              <span className='text-md'>{formatCurrency(2300000)}</span>
            </div>
          </div>
          <div className='flex items-center justify-start gap-2 px-1'>
            <div className='text-sm text-red-600'>-35%</div>
            <div className='text-start  truncate text-gray-500'>
              <span className='text-sm'>₫</span>
              <span className='text-xs line-through'>{formatCurrency(2500000)}</span>
            </div>
          </div>
          <div className='flex mt-1 items-center justify-between px-1'>
            {/* <ProductRating rating={product.rating} /> */}
            <ProductRatingStar rating={4} />
            <div className='text-xs'>
              {/* <span>{formatNumbertoSocialStyle(product.sold)}</span> */}
              <span>{formatNumbertoSocialStyle(234)}</span>
              <span className='ml-1'>sold</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
