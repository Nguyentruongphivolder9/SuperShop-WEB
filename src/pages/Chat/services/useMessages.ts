import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import chatApi from 'src/apis/chat.api'
import { FullMessageType, Message } from 'src/types/chat.type'

type Params = {
  conversationId: string
}

export function useMessages() {
  const { conversationId } = useParams<Params>()

  const {
    isLoading,
    data: messages,
    error
  }: UseQueryResult<FullMessageType[], Error> = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => chatApi.getMessages(conversationId ?? ''),
    retry: false
  })

  return {
    isLoading,
    messages,
    error
  }
}
