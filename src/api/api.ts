import Axios from "axios";
// import config from "../config/config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const axiosInstance = Axios.create({
  // timeout: 3 * 60 * 1000,
  // baseURL: config.API_DOMAIN,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
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
