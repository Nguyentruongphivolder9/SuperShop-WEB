import HeaderShop from 'src/pages/Shop/components/HeaderShop'
import NavShop from 'src/pages/Shop/components/NavShop'

interface Props {
  children?: React.ReactNode
}

export default function ShopLayout({ children }: Props) {
  return (
    <div>
      <HeaderShop />
      <NavShop />
      <div className='relative pr-4 pb-4 pt-20 pl-[246px] w-full h-full bg-[#f6f6f6]'>{children}</div>
    </div>
  )
}
