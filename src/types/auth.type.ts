import { User } from './user.type'

export type AuthResponse = {
  statusCode: number
  message: string
    body: {
      accessToken: string
      refreshToken: string
      expireRefreshToken: number
      expires: number
      user: User
    };
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
    };
}

