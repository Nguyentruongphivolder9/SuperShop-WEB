import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = {
  statusCode: number;
  message: string;
  body: {
    accessToken: string;
    refreshToken: string;
    expireRefreshToken: number;
    expires: number;
    user: User;
  };
}

export type RefreshTokenResponse = SuccessResponse<{
  access_token: string
}>
