import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import useConversation from './useConversation'

const useRoutes = () => {
  const location = useLocation()
  const { conversationId } = useConversation()

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: location.pathname === '/conversations' || !!conversationId
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: location.pathname === '/users'
      },
      {
        label: 'Logout',
        href: '#',
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle
      }
    ],
    [location.pathname, conversationId]
  )

  return routes
}

export default useRoutes
