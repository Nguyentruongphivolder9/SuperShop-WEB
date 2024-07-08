import { AuthResponse, WaitingForEmailResponse } from 'src/types/auth.type'
import http from 'src/utils/http'
import { FormDataRegister } from 'src/components/RegisterForms/Registers'
export const URL_LOGIN = 'auth/login'
export const URl_REGISTER = 'auth/register'
export const URL_LOGOUT = 'account/logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const URL_EMAIL_VERIFICATION = 'auth/send-email'
export const URL_WAITING_FOR_EMAIL_RESPONSE = "auth/waiting-for-email-response"
type LogoutRequest =  {
  email:string;
}
const authApi = {
  
  waitingForEmailResponse(body: {email:string}){
    return http.post<WaitingForEmailResponse>(`${URL_WAITING_FOR_EMAIL_RESPONSE}`, body)
  },
  verifyEmail(body: {email:string}) {
    return http.post<AuthResponse>(`${URL_EMAIL_VERIFICATION}`, body)
  },
  registerAccount(body: Omit<FormDataRegister, 'confirm_password'>) {
    return http.post<AuthResponse>(`${URl_REGISTER}`, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(`${URL_LOGIN}`, body)
  },
  logout: (body: LogoutRequest) => {
    return http.post<AuthResponse>(`${URL_LOGOUT}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
  }
  
}

export default authApi
