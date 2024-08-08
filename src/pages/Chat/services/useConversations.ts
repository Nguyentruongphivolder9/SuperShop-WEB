import { useQuery, UseQueryResult } from '@tanstack/react-query'
import chatApi from 'src/apis/chat.api'
import { FullConversationType } from 'src/types/chat.type'

export function useConversations() {
  const {
    isLoading,
    data: conversations,
    error
  }: UseQueryResult<FullConversationType[], Error> = useQuery({
    queryKey: ['conversations'],
    queryFn: () => chatApi.getConversations()
  })

  return {
    isLoading,
    conversations,
    error
  }
}
