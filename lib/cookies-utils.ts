import { deleteCookie, getCookie, setCookie } from 'cookies-next'

// Cookie names
export const COOKIE_NAMES = {
  USER_TYPE: 'user-type',
  USER_ID: 'user-id',
  ACCESS_TOKEN: 'access-token',
  REFRESH_TOKEN: 'refresh-token',
  AUTH_STORAGE: 'auth-user-storage'
} as const

// Set auth cookies
export const setAuthCookies = (userType: string, userId: string, accessToken: string, refreshToken: string) => {
  setCookie(COOKIE_NAMES.USER_TYPE, userType, {
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
    // secure: true,
    // sameSite: 'strict'
  })

  setCookie(COOKIE_NAMES.USER_ID, userId, {
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
    // secure: true,
    // sameSite: 'strict'
  })

  setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
    // secure: true,
    // sameSite: 'strict'
  })

  setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
    maxAge: 60 * 60 * 24 * 7, // 7 days for refresh token
    path: '/',
    // secure: true,
    // sameSite: 'strict'
  })
}

// Get auth cookies
export const getAuthCookies = () => {
  return {
    userType: getCookie(COOKIE_NAMES.USER_TYPE),
    userId: getCookie(COOKIE_NAMES.USER_ID),
    accessToken: getCookie(COOKIE_NAMES.ACCESS_TOKEN),
    refreshToken: getCookie(COOKIE_NAMES.REFRESH_TOKEN)
  }
}

// Clear auth cookies
export const clearAuthCookies = () => {
  deleteCookie(COOKIE_NAMES.USER_TYPE)
  deleteCookie(COOKIE_NAMES.USER_ID)
  deleteCookie(COOKIE_NAMES.ACCESS_TOKEN)
  deleteCookie(COOKIE_NAMES.REFRESH_TOKEN)
}

// Check if user is authenticated via cookies
export const isAuthenticatedViaCookies = () => {
  const { userType, userId, accessToken } = getAuthCookies()
  return !!(userType && userId && accessToken)
}
