import axios from "axios";
import { BackendUrl } from "./useEnv";

export const apiClient = axios.create({
  baseURL: BackendUrl,
  timeout: 10000,
});

const isTokenExpired = (
  token: string | null = localStorage.getItem("token") || null
) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // console.log("Decoded token payload: ", payload);
    // console.log("Expiration check: ", payload.exp < Date.now() / 1000);
    // console.log("time", payload.exp - Date.now() / 1000);
    const data = {
      permission: payload.role,
      isExp: payload.exp < Date.now() / 1000,
    };
    return data;
    // return payload.exp < Date.now() / 1000;
  } catch  {
    // console.error("Error decoding token or invalid token format", error);
    return true;
  }
};

apiClient.interceptors.request.use(
  (config) => {
    const token: string | null = localStorage.getItem("token");
    // console.log("Token from localStorage: ", token);
    const isExp: any = isTokenExpired(token);
      //  if token exists and is not expired
    if (token && !isExp.isExp) {
      // console.log("Token is valid, adding to headers...");
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // console.log("Token is expired or not found, redirecting to login...");
      localStorage.removeItem("token");
      window.location.replace("/login");
    }
    return config;
  },
  (error) => {
    console.log("Axios Error Res", error.response);
    return Promise.reject(error);
  }
);
