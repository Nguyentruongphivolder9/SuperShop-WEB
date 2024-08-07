import { useMemo, useState } from 'react'

import Link from 'next/link'
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'

import ProfileDrawer from './ProfileDrawer'
import useOtherUser from 'src/pages/Chat/hooks/useOtherUser'
import { Conversation } from 'src/types/chat.type'
import { User } from 'src/types/user.type'
import useActiveList from 'src/pages/Chat/hooks/useActiveList'
import AvatarGroup from 'src/pages/Chat/components/AvatarGroup'
import Avatar from 'src/pages/Chat/components/Avatar'

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation)
  const [drawerOpen, setDrawerOpen] = useState(false)

  //Active Users
  const { members } = useActiveList()
  const isActive = members.indexOf(otherUser?.email ?? '') !== -1

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return isActive ? 'Active' : 'Offline'
  }, [conversation, isActive])

  return (
    <>
      <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div
        className='
        bg-white
          w-full
          flex
          border-b-[1px]
          sm:px-4
          py-3
          px-4
          lg:px-6
          justify-between
          items-center
          shadow-sm'
      >
        <div className='flex gap-3 items-center'>
          <Link
            className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
            href='/conversations'
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? <AvatarGroup users={conversation.users} /> : <Avatar user={otherUser} />}
          <div className='flex flex-col'>
            <div>{conversation.name || otherUser.fullName}</div>
            <div className='text-sm font-light text-neutral-500'>{statusText}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className='text-sky-500 cursor-pointer hover:text-sky-600 transition'
        />
      </div>
    </>
  )
}

export default Header
