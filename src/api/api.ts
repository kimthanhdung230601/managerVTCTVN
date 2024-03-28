import Axios from "axios";
import configs from "../config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const axiosInstance = Axios.create({
  // timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
});

export const logout = () => {
  const allCookies = Cookies.get();
  Object.keys(allCookies).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
  localStorage.clear();
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    // config.headers.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTkiLCJwZXJtaXNzaW9uIjoiMCIsImlkX2NsdWIiOiI4IiwicGVuZGluZyI6IjAiLCJtYW5hZ2UiOiJHaVx1MDBlMW8gRFx1MWVlNWMiLCJleHAiOjE3MTE5NzIwNjN9.H2Ooe25lkOeVIuMhPBM-BwgckVFKR2yquUxAcF2T2BQ'
    if (token) {
       config.headers.Authorization = `${token}`;
    }
    config.headers.url = window.location.href;
    return config;
  },
  (error) => {
    const navigate = useNavigate();
    // navigate("/logout");
  }
);
export const sendGet = (url: string, params?: any) =>
  axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any) =>
  axiosInstance
    .post(url, params, { params: queryParams })
    .then((res) => res.data);
export const sendPut = (url: string, params?: any) =>
  axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: any) =>
  axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: any) =>
  axiosInstance.delete(url, { params }).then((res) => res.data);
