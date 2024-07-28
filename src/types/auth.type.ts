import { User } from './user.type'

export type AuthResponse = {
  body: {
    accessToken: string
    refreshToken: string
    expireRefreshToken: number
    expires: number
    secretKey: string
    user: User
  }
  timeStamp: string
  message: string
  statusCode: number
  status: number
}
export type WaitingForEmailResponse = {
  timeStamp: string
  body: boolean
  message: string
  status: number
}
export type TypingEmailResponse = {
  timeStamp: string
  body: string
  message: string
  status: number
}
export type RefreshTokenResponse = {
  statusCode: number
  message: string
  data: {
    accessToken: string
    refreshToken: string
    expireRefreshToken: number
    expires: number
    user: User
  }
}
export type google_Success_Request_Url_Authorization = {
  body: {
    Url: string;
  };
  status: number;
  statusCode: string; 
  timeStamp: string;
}
