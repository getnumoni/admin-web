import { useBankStore } from "@/stores/bank-store";
import axios from "axios";

const bankApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BANK_URL,
});

//bank api interceptor
bankApi.interceptors.request.use((config) => {
  // Get token from store
  const token = useBankStore.getState().getToken();
  if (token && token.accessToken) {
    config.headers.Authorization = `${token.tokenType} ${token.accessToken}`;
  }
  return config;
});


//bank api response interceptor
bankApi.interceptors.response.use((response) => {
  return response;
});


export default bankApi;