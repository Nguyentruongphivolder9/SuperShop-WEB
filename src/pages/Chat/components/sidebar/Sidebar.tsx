import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

async function Sidebar({ children }: { children: React.ReactNode }) {
  const { profile } = useContext(AppContext)

  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={profile!} />
      <MobileFooter />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  )
}

export default Sidebar
