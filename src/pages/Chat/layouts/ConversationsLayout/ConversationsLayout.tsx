import { FullConversationType } from 'src/types/chat.type'
import ConversationList from '../../chats/components/ConversationList'
import LoadingModal from '../../components/LoadingModal'
import Sidebar from '../../components/sidebar/Sidebar'
import { useConversations } from '../../services/useConversations'
import { useUsers } from '../../services/useUsers'

export default function ConversationsLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, conversations } = useConversations()

  const { isLoading: isLoadingUsers, users } = useUsers()

  if (isLoading || isLoadingUsers) {
    return <LoadingModal />
  }

  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList users={users ?? []} initialItems={conversations ?? []} />
        {children}
      </div>
    </Sidebar>
  )
}
