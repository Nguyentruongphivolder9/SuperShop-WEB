import { User } from 'src/types/user.type'

export const localStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (acccess_token: string) => localStorage.setItem('acccess_token', acccess_token)
export const setRefreshTokenToLS = (refresh_token: string) => localStorage.setItem('refresh_token', refresh_token)

export const getAccessTokenFromLS = () => localStorage.getItem('acccess_token') || ''
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''
export const clearLS = () => {
  localStorage.removeItem('acccess_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')

  const clearLSEvent = new Event('clearLS')
  localStorageEventTarget.dispatchEvent(clearLSEvent)
}
export const getProfileFromLs = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
