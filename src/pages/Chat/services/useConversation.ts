import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import chatApi from 'src/apis/chat.api'
import { Conversation } from 'src/types/chat.type'
import { User } from 'src/types/user.type'

type Params = {
  conversationId: string
}

interface ConversationResponse {
  conversation: Conversation & {
    users: User[]
  }
}

export function useConversation() {
  const { conversationId } = useParams<Params>()

  const {
    isLoading,
    data: conversation,
    error
  }: UseQueryResult<ConversationResponse, Error> = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => chatApi.getConversationById(conversationId ?? ''),
    retry: false
  })

  return {
    isLoading,
    conversation,
    error
  }
}
