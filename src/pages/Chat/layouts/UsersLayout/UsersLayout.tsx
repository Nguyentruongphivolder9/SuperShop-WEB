import LoadingModal from '../../components/LoadingModal'
import Sidebar from '../../components/sidebar/Sidebar'
import { useUsers } from '../../services/useUsers'
import UserList from '../../users/components/UserList'

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, users } = useUsers()

  if (isLoading) {
    return <LoadingModal />
  }

  return (
    <Sidebar>
      <div className='h-full'>
        {users && <UserList items={users} />}
        {children}
      </div>
    </Sidebar>
  )
}
