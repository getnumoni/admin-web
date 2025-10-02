import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BankToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  expirationTime?: number;
}

interface BankStore {
  token: BankToken | null;
  isTokenValid: boolean;

  // Actions
  setToken: (token: BankToken) => void;
  clearToken: () => void;
  getToken: () => BankToken | null;
  isTokenExpired: () => boolean;
}

const COOKIE_NAME = 'bank-access-token';

export const useBankStore = create<BankStore>()(
  persist(
    (set, get) => ({
      token: null,
      isTokenValid: false,

      setToken: (token: BankToken) => {
        // Calculate expiration time (current time + expiresIn seconds)
        const expirationTime = Date.now() + (token.expiresIn * 1000);

        // Store token with expiration time
        const tokenWithExpiration = {
          ...token,
          expirationTime
        };

        // Save to cookie
        setCookie(COOKIE_NAME, JSON.stringify(tokenWithExpiration), {
          maxAge: token.expiresIn, // expiresIn is in seconds
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        set({
          token: tokenWithExpiration,
          isTokenValid: true
        });
      },

      clearToken: () => {
        deleteCookie(COOKIE_NAME);
        set({
          token: null,
          isTokenValid: false
        });
      },

      getToken: () => {
        const state = get();
        if (state.token && !state.isTokenExpired()) {
          return state.token;
        }
        return null;
      },

      isTokenExpired: () => {
        const state = get();
        if (!state.token || !state.token.expirationTime) {
          return true;
        }
        return Date.now() >= state.token.expirationTime;
      }
    }),
    {
      name: 'bank-store',
      // Only persist the token, not the computed values
      partialize: (state) => ({ token: state.token }),
      // Initialize from cookie on store creation
      onRehydrateStorage: () => (state) => {
        if (typeof window !== 'undefined') {
          const cookieToken = getCookie(COOKIE_NAME);
          if (cookieToken) {
            try {
              const parsedToken = JSON.parse(cookieToken as string);
              if (parsedToken && !state?.isTokenExpired()) {
                state?.setToken(parsedToken);
              } else {
                state?.clearToken();
              }
            } catch (error) {
              console.error('Error parsing bank token from cookie:', error);
              state?.clearToken();
            }
          }
        }
      }
    }
  )
);
