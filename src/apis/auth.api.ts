import { AuthResponse, TypingEmailResponse, WaitingForEmailResponse } from 'src/types/auth.type'
import http from 'src/utils/http'
import { FormDataRegister, FormWaitingForEmailVerify } from 'src/components/RegisterForms/Registers'
import { toast } from 'react-toastify'

export const URL_LOGIN = 'auth/login'
export const URl_REGISTER = 'auth/register'
export const URL_LOGOUT = 'account/account-logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const URL_EMAIL_VERIFICATION = 'auth/send-email'
export const URL_WAITING_FOR_EMAIL_RESPONSE = 'auth/waiting-for-email-response'
type LogoutRequest = {
  email: string
export const URL_WAITING_FOR_EMAIL_RESPONSE = 'auth/waiting-for-email-response'

export type FinalRegisterForm = {
  email?: string | undefined
  password: string
  user_name: string
  full_name: string
  phone: string
  gender: string
  address?: string | undefined
  birth_day: string
}
type LogoutRequest = {
  email: string
}

const authApi = {
  waitingForEmailResponse(body: { email: string }) {
  waitingForEmailResponse(body: FormWaitingForEmailVerify) {
    return http.post<WaitingForEmailResponse>(`${URL_WAITING_FOR_EMAIL_RESPONSE}`, body)
  },
  verifyEmail(body: { email: string }) {
    return http.post<AuthResponse>(`${URL_EMAIL_VERIFICATION}`, body)
  verifyEmail(body: { email: string }) {
    return http.post<TypingEmailResponse>(`${URL_EMAIL_VERIFICATION}`, body)
  },
  registerAccount(body: FinalRegisterForm) {
    return http.post<AuthResponse>(`${URl_REGISTER}`, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(`${URL_LOGIN}`, body)
  },
  logout(body: LogoutRequest) {
    const token = localStorage.getItem('accessToken')
    console.log(token)
    if (token === null) {
      toast.error('Thất bại trong việc đăng suất, thử lại trong giây lát')
      return Promise.reject(new Error('No access token found'))
    }
    return http.post<AuthResponse>(`${URL_LOGOUT}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        Authorization: `Bearer ${token}`
      }
    })
    })
  }
}

export default authApi
