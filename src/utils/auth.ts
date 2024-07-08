import { User } from 'src/types/user.type'

export const localStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (acccess_token: string) => localStorage.setItem('acccessToken', acccess_token)
export const setRefreshTokenToLS = (refresh_token: string) => localStorage.setItem('refreshToken', refresh_token)

export const getAccessTokenFromLS = () => localStorage.getItem('acccessToken') || ''
export const getRefreshTokenFromLS = () => localStorage.getItem('refreshToken') || ''
export const clearLS = () => {
  localStorage.removeItem('acccessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('profile')

  const clearLSEvent = new Event('clearLS')
  localStorageEventTarget.dispatchEvent(clearLSEvent)
}
export const getProfileFromLs = () => {
  const result = localStorage.getItem('profile')
  // console.log(JSON.parse(result ? result : '') as User)
  return result ? (JSON.parse(result) as User) : null
}
export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const parseJwt = (JwtToken: string) => {
  const base64Url = JwtToken.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload) as User
}
