import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'
import config from 'src/constants/config'

export const URL_LOGIN = 'auth/login'
export const URl_REGISTER = 'auth/register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const URL_EMAILVERIFICATION = 'auth/emailVerification'

const authApi = {
  verifyEmail(body: {email:string}) {
    return http.post<AuthResponse>(`${config.baseURL}/${URL_EMAILVERIFICATION}`, body)
  },
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(`${config.baseURL}/${URl_REGISTER}`, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(`${config.baseURL}/${URL_LOGIN}`, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  }
}

export default authApi
