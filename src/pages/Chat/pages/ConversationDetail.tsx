import EmptyState from '../components/EmptyState'
import Header from '../chats/[conversationId]/components/Header'
import Body from '../chats/[conversationId]/components/Body'
import Form from '../chats/[conversationId]/components/Form'
import { useConversation } from '../services/useConversation'
import LoadingModal from '../components/LoadingModal'
import { useMessages } from '../services/useMessages'
import { Conversation } from 'src/types/chat.type'
import { User } from 'src/types/user.type'

const ConversationDetail = () => {
  const { conversation, isLoading } = useConversation()

  const { messages = [] } = useMessages()

  if (isLoading) {
    return <LoadingModal />
  }

  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation as unknown as Conversation & { users: User[] }} />
        <Body initialMessages={messages} />

        <Form />
      </div>
    </div>
  )
}

export default ConversationDetail
