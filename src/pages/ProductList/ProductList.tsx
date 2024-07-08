import { keepPreviousData, useQuery } from '@tanstack/react-query'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import Product from '../../components/Product'

const productsData = [
  {
    _id: '1555',
    images: [
      '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2',
      '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2'
    ],
    price: 300000,
    rating: 5,
    price_before_discount: 200000,
    quantity: 500,
    sold: 4,
    view: 4,
    name: 'Bộ 2 Lăn Ngăn Mùi NIVEA Sáng Mịn | Mờ Thâm | Se Khít Lỗ Chân Lông (50 ml) - 81644',
    description: 'string',
    category: {
      _id: '1',
      name: 'quan ao'
    },
    image: '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2',
    createdAt: 'string',
    updatedAt: 'string'
  },
  {
    _id: '444',
    images: [
      '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2',
      '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2'
    ],
    price: 300000,
    rating: 5,
    price_before_discount: 200000,
    quantity: 500,
    sold: 4,
    view: 4,
    name: 'Bộ 2 Lăn Ngăn Mùi NIVEA Sáng Mịn | Mờ Thâm | Se Khít Lỗ Chân Lông (50 ml) - 81644',
    description: 'string',
    category: {
      _id: '1',
      name: 'quan ao'
    },
    image: '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2',
    createdAt: 'string',
    updatedAt: 'string'
  },
  {
    _id: '5666',
    images: [
      '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2',
      '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2'
    ],
    price: 300000,
    rating: 5,
    price_before_discount: 200000,
    quantity: 500,
    sold: 4,
    view: 4,
    name: 'Bộ 2 Lăn Ngăn Mùi NIVEA Sáng Mịn | Mờ Thâm | Se Khít Lỗ Chân Lông (50 ml) - 81644',
    description: 'string',
    category: {
      _id: '1',
      name: 'quan ao'
    },
    image: '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2',
    createdAt: 'string',
    updatedAt: 'string'
  },
  {
    _id: '666',
    images: [
      '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2',
      '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2'
    ],
    price: 300000,
    rating: 5,
    price_before_discount: 200000,
    quantity: 500,
    sold: 4,
    view: 4,
    name: 'Bộ 2 Lăn Ngăn Mùi NIVEA Sáng Mịn | Mờ Thâm | Se Khít Lỗ Chân Lông (50 ml) - 81644',
    description: 'string',
    category: {
      _id: '1',
      name: 'quan ao'
    },
    image: '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2',
    createdAt: 'string',
    updatedAt: 'string'
  },
  {
    _id: '7778',
    images: [
      '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2',
      '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2'
    ],
    price: 300000,
    rating: 5,
    price_before_discount: 200000,
    quantity: 500,
    sold: 4,
    view: 4,
    name: 'Bộ 2 Lăn Ngăn Mùi NIVEA Sáng Mịn | Mờ Thâm | Se Khít Lỗ Chân Lông (50 ml) - 81644',
    description: 'string',
    category: {
      _id: '1',
      name: 'quan ao'
    },
    image: '	https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvwrp3hwetitf2',
    createdAt: 'string',
    updatedAt: 'string'
  }
]

const categoriesData = [
  {
    _id: '1',
    name: 'mi giả'
  },
  {
    _id: '2',
    name: 'râu giả'
  },
  {
    _id: '3',
    name: 'răng giả'
  },
  {
    _id: '4',
    name: 'róc giả'
  },
  {
    _id: '5',
    name: 'tay giả'
  },
  {
    _id: '6',
    name: 'chân giả'
  },
  {
    _id: '7',
    name: 'mông giả'
  }
]

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig = useQueryConfig()

  // const { data: productsData } = useQuery({
  //   queryKey: ['products', queryParams],
  //   queryFn: () => {
  //     return productApi.getProducts(queryConfig as ProductListConfig)
  //   },
  //   staleTime: 3 * 60 * 1000,
  //   placeholderData: keepPreviousData
  // })
  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => {
  //     return categoryApi.getCategories()
  //   }
  // })

  return (
    <div className='bg-[#f6f6f6] py-6'>
      <div className='container'>
        {/* {productsData && ( */}
        <div className='grid grid-cols-11 gap-6'>
          <div className='col-span-2'>
            {/* <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} /> */}
            <AsideFilter queryConfig={queryConfig} categories={categoriesData} />
          </div>
          <div className='col-span-9'>
            {/* <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} /> */}
            <SortProductList queryConfig={queryConfig} pageSize={5} />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 '>
              {/* {productsData.data.data.products.map((product, index) => ( */}
              {productsData.map((product, index) => (
                <div key={index} className='col-span-1'>
                  {/* <Product product={product} /> */}
                </div>
              ))}
            </div>
            <Pagination
              queryConfig={queryConfig}
              // pageSize={productsData.data.data.pagination.page_size}
              pageSize={20}
            />
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  )
}
