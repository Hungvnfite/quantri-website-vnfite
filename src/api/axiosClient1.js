import axios from 'axios';
import queryString from 'query-string';
import { store } from '~/store';
import WebUtils from '../utils';
const axiosClient1 = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  // baseURL: "http://42.113.122.118:3031",

  // ip local
  // baseURL: "http://192.168.1.15:1993",

  // ip test
  baseURL: WebUtils.envMode.baseURL,
  // ip live
  // baseURL: "https://service-vnfite.com.vn/tikluy/cms",
  //
  headers: { 'content-type': 'multipart/form-data', transactionId: new Date().getTime().toString() },
  paramsSerializer: (params) => queryString.stringify(params)
});
axiosClient1.interceptors.request.use((config) => {
  // const token = store.getState()?.authentication?.accessToken?.token;+
  const sessionId = store.getState().authentication.sessionId;


  if (sessionId) {
    config.headers['Authorization'] = `Bearer ${sessionId}`;
  }
  return config;
});

axiosClient1.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error?.response?.data;
  }
);

export default axiosClient1;
