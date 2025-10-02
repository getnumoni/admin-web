//lib/api.ts

import axios from "axios";
import { clearAuthCookies, getAuthCookies, setAuthCookies } from "./cookies-utils";



// Create a function to get the API instance

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});



//api interceptor
api.interceptors.request.use((config) => {
  //get token from persistent storage
  const token = getAuthCookies().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


//response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 or 403 and we haven't already tried to refresh
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = getAuthCookies();

        if (refreshToken && typeof refreshToken === 'string') {
          // console.log("🔄 Attempting token refresh due to", error.response?.status, "error");

          // Call refresh token API
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`,
            { refreshToken }
          );

          // console.log("✅ Refresh token response", response.data);

          const { token: accessToken, refreshToken: newRefreshToken } = response.data;

          // console.log("🔑 New access token received");

          // Get current user data from cookies
          const { userType, userId } = getAuthCookies();

          // Update cookies with new tokens only
          if (accessToken && newRefreshToken && userType && userId &&
            typeof userType === 'string' && typeof userId === 'string') {
            setAuthCookies(userType, userId, accessToken, newRefreshToken);
            console.log("💾 Tokens updated in cookies");
          }

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Preserve the original Content-Type if it was set
          if (originalRequest.headers['Content-Type']) {
            console.log("📝 Preserving Content-Type:", originalRequest.headers['Content-Type']);
          }

          // console.log("🔄 Retrying original request with new token");

          // Retry the original request
          return api(originalRequest);
        } else {
          console.log("❌ No refresh token available");
        }
      } catch (refreshError) {
        // Refresh failed, clear cookies and redirect to login
        console.error('❌ Token refresh failed:', refreshError);
        clearAuthCookies();
        if (typeof window !== "undefined") {
          window.location.href = "/auth/sign-in";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;