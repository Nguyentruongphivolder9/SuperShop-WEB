type Role = 'USER' | 'ADMIN'
export interface User {
  _id: string
  avatarUrl: string
  email: string
  exp: number
  fullName: string
  gender: string
  isActive: string
  phoneNumber: string
  role: Role
  sub: string
  userName: string
}
