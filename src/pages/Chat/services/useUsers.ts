import { useQuery, UseQueryResult } from '@tanstack/react-query'
import chatApi from 'src/apis/chat.api'
import { User } from 'src/types/user.type'

export function useUsers() {
  const {
    isLoading,
    data: users,
    error
  }: UseQueryResult<User[], Error> = useQuery({
    queryKey: ['users'],
    queryFn: () => chatApi.getUsers(),
    retry: false
  })

  return {
    isLoading,
    users,
    error
  }
}
