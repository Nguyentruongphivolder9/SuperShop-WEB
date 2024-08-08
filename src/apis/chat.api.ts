import { ConversationResponse, MessageResponse } from 'src/types/chat.type'
import { User } from 'src/types/user.type'
import { Pagination, SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const chatApi = {
  getConversations() {
    return http.get<SuccessResponse<Pagination<ConversationResponse[]>>>('conversations')
  },
  getConversationById(id: string) {
    return http.get<SuccessResponse<ConversationResponse>>(`conversation/${id}`)
  },
  getMessages(conversationId: string) {
    return http.get<SuccessResponse<MessageResponse>>(`conversation/${conversationId}`)
  },
  getUsers() {
    return http.get<SuccessResponse<User[]>>(`account/get-all`)
  }
}

export default chatApi
