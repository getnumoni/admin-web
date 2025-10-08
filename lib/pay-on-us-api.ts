import { usePayOnUsStore } from "@/stores/pay-on-us-store";
import axios from "axios";

const payOnUsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAY_ON_US_URL,
});

//pay-on-us api interceptor
payOnUsApi.interceptors.request.use((config) => {
  // Get token from store
  const token = usePayOnUsStore.getState().getToken();
  // console.log("pay on us token", token);
  if (token && token.access_token) {
    config.headers.Authorization = `${token.token_type} ${token.access_token}`;
  }
  return config;
});


//bank api response interceptor
payOnUsApi.interceptors.response.use((response) => {
  return response;
});


export default payOnUsApi;