import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'src/components/Pagination'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'
import CreateCategory from './CreateCategory'
import { AppContext } from 'src/contexts/app.context'
import { CategoryResponse } from 'src/types/category.type'
import path from 'src/constants/path'

interface CategoryModelTable {
  id: string
  categoryNameLevel1: string
  categoryNameLevel2?: string
  categoryNameLevel3?: string
  categoryNameLevel4?: string
  categoryNameLevel5?: string
}

export default function CategoriesManagement() {
  const { categories } = useContext(AppContext)
  const queryConfig = useQueryConfig()
  const [isDisplayCateList, setIsDisplayCateList] = useState(false)
  const [categoryData, setCategoryData] = useState<CategoryModelTable[]>([])

  useEffect(() => {
    setCategoryData([])
    let categoryNameLevel1: string
    let categoryNameLevel2: string
    let categoryNameLevel3: string
    let categoryNameLevel4: string
    let categoryNameLevel5: string
    const categoryList: CategoryModelTable[] = []
    const managerCategory = (categoriesChild: CategoryResponse[], level: number) => {
      if (categoriesChild) {
        categoriesChild.forEach((category) => {
          switch (level) {
            case 2:
              categoryNameLevel2 = category.name
              categoryNameLevel3 = ''
              categoryNameLevel4 = ''
              categoryNameLevel5 = ''
              break
            case 3:
              categoryNameLevel3 = category.name
              categoryNameLevel4 = ''
              categoryNameLevel5 = ''
              break
            case 4:
              categoryNameLevel4 = category.name
              categoryNameLevel5 = ''
              break
            case 5:
              categoryNameLevel5 = category.name
              break

            default:
              break
          }

          if (category.isChild) {
            if (category.categoriesChild) {
              managerCategory(category.categoriesChild, ++level)
            }
          } else {
            const newCategoryModelTable: CategoryModelTable = {
              id: category.id,
              categoryNameLevel1: categoryNameLevel1,
              categoryNameLevel2: categoryNameLevel2,
              categoryNameLevel3: categoryNameLevel3,
              categoryNameLevel4: categoryNameLevel4,
              categoryNameLevel5: categoryNameLevel5
            }

            categoryList.push(newCategoryModelTable)
            // setCategoryData((prev) => [...prev, newCategoryModelTable])
          }
        })
      }
    }

    if (categories) {
      categories.forEach((category) => {
        if (category.isChild) {
          categoryNameLevel1 = category.name
          if (category.categoriesChild) {
            managerCategory(category.categoriesChild, 2)
          }
        } else {
          const newCategoryModelTable: CategoryModelTable = {
            id: category.id,
            categoryNameLevel1: category.name,
            categoryNameLevel2: '',
            categoryNameLevel3: '',
            categoryNameLevel4: '',
            categoryNameLevel5: ''
          }

          categoryList.push(newCategoryModelTable)
          // setCategoryData((prev) => [...prev, newCategoryModelTable])
        }
      })

      setCategoryData(categoryList)
    }
  }, [categories])

  const handlerShowCategoryList = () => {
    if (isDisplayCateList) {
      document.body.style.overflow = 'auto'
      setIsDisplayCateList(false)
    } else {
      document.body.style.overflow = 'hidden'
      setIsDisplayCateList(true)
    }
  }

  return (
    <div>
      {isDisplayCateList && <CreateCategory handlerShowCategoryList={handlerShowCategoryList} />}
      <div className='flex flex-col'>
        <form action='' method='get'>
          <div className='flex items-center gap-2 h-8'>
            <div className='bg-white h-full rounded-sm p-1 flex items-center flex-row justify-between flex-1 shadow'>
              <div className='text-sm text-[#999999]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </div>
              <input
                type='text'
                maxLength={120}
                className='text-sm text-[#333333] w-full border-none outline-none pl-3'
                placeholder='Category Name'
              />
            </div>
            <div className='relative text-sm text-[#333333] uppercase h-full rounded-sm border border-gray-200 border-r-0 border-r-transparent hover:border-gray-300 transition-colors'>
              <select defaultValue='fixed' className='h-full w-[140px] text-sm rounded border-none focus:outline-none'>
                <option value='fixed'>Fix Amount</option>
                <option value='percentage'>By Percentage</option>
              </select>
            </div>
            <button className='h-full flex items-center px-3 bg-blue text-white rounded-sm'>Search</button>
          </div>
        </form>
        <div className='mt-4 bg-gray-50 shadow rounded-sm py-4'>
          <div className='flex items-center justify-between px-6 mb-4'>
            <div className='text-xl text-[#333333]'>List Of Categories</div>
            <button onClick={handlerShowCategoryList} type='button' className='py-2 px-4 bg-blue text-white rounded-md'>
              Create New Category
            </button>
          </div>
          <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase'>
                <tr className='flex'>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Categories 1
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Categories 2
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Categories 3
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Categories 4
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Categories 5
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Category Code
                  </th>
                  <th scope='col' className='flex-1 px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryData &&
                  categoryData
                    .slice(
                      Number.parseInt(queryConfig.page!) * Number.parseInt(queryConfig.limit!) -
                        Number.parseInt(queryConfig.limit!),
                      Number.parseInt(queryConfig.page!) * Number.parseInt(queryConfig.limit!)
                    )
                    .map((item, index) => (
                      <tr key={index} className='flex odd:bg-white even:bg-gray-50 border-b'>
                        <td className='flex-1 px-6 py-4 items-center flex'>
                          <p className={'line-clamp-2'}>{item.categoryNameLevel1 || '--'}</p>
                        </td>
                        <td className='flex-1 px-6 py-4 items-center flex'>
                          <p className={'line-clamp-2'}>{item.categoryNameLevel2 || '--'}</p>
                        </td>
                        <td className='flex-1 px-6 py-4 items-center flex'>
                          <p className={'line-clamp-2'}>{item.categoryNameLevel3 || '--'}</p>
                        </td>
                        <td className='flex-1 px-6 py-4 items-center flex'>
                          <p className={'line-clamp-2'}>{item.categoryNameLevel4 || '--'}</p>
                        </td>
                        <td className='flex-1 px-6 py-4 items-center flex'>
                          <p className={'line-clamp-2'}>{item.categoryNameLevel5 || '--'}</p>
                        </td>
                        <td className='flex-1 px-6 py-4 items-center flex'>
                          <p className='line-clamp-2'>{item.id}</p>
                        </td>
                        <td className='flex-1 px-6 py-4 items-center flex'>
                          <Link to='#' className='font-medium text-blue-600 hover:underline'>
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
            <Pagination
              queryConfig={queryConfig}
              pageSize={Math.ceil(categoryData.length / Number.parseInt(queryConfig.limit!))}
              path={path.adminCategories}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
