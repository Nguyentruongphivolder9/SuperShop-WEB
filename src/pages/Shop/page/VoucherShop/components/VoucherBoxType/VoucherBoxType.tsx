import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'

interface Props {
  title: string
  content: string
  icon: ReactNode
}

export default function VoucherBoxType({ title, content, icon }: Props) {
  return (
    <div className='border border-gray-200'>
      <Link to='' className='block'>
        <div className='p-4'>
          <div className='flex items-center text-gray-500'>
            {icon}
            <span className='text-base ml-2'>{title}</span>
          </div>
          <p className='text-sm text-gray-500'>{content}</p>
        </div>
        <div className='grid mx-4 my-4'>
          <Button className='flex items-center justify-self-end bg-blue text-white text-sm py-1 px-4 min-w-[76px] min-h-[32px] rounded-[4px]'>
            Create
          </Button>
        </div>
      </Link>
    </div>
  )
}
