import { User } from './user.type'

export type AuthResponse = {
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

