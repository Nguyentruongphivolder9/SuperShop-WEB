import { useContext, useMemo } from 'react'
// import { FullConversationType } from "../types";

import { AppContext } from 'src/contexts/app.context'
import { FullConversationType } from 'src/types/chat.type'
import { User } from 'src/types/user.type'

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[]
      }
) => {
  //const session = useSession()
  const { profile } = useContext(AppContext)

  const otherUser = useMemo(() => {
    const currentUserEmail = profile?.email

    const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail)

    return otherUser[0]
  }, [profile?.email, conversation.users])

  return otherUser
}

export default useOtherUser
