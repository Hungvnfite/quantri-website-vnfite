import axios from 'axios';
import queryString from 'query-string';
import { store } from '~/store';
import { logoutSuccess } from '../store/slices/authentication';
import dispatchToast from '../handlers/toast';
import WebUtils from '../utils';
const axiosClient = axios.create({
  //ip local
  // baseURL: "http://192.168.1.15:1993",

  // ip test
  baseURL: WebUtils.envMode.baseURL,
  // ip live
  // baseURL: 'https://service-vnfite.com.vn/tikluy/cms',
  headers: {
    'content-type': 'application/json',
    transactionId: new Date().getTime().toString()
  },
  paramsSerializer: (params) => queryString.stringify(params)
});
axiosClient.interceptors.request.use((config) => {
  const token = store.getState()?.authentication?.sessionId;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (['401', 'ERR_001_4001', 'ERR_001_4002'].includes(response.result?.responseMessage)) {
      dispatchToast('success', 'Hết phiên làm việc, vui lòng đăng nhập lại');
      store.dispatch(logoutSuccess());
      return;
    }
    return response.data;
  },
  (error) => {
    // console.log('ERR', error);

    if (['401', 'ERR_001_4001', 'ERR_001_4002'].includes(String(error?.status))) {
      dispatchToast('success', 'Hết phiên làm việc, vui lòng đăng nhập lại');
      store.dispatch(logoutSuccess());
    }
    throw error?.response?.data;
  }
);

export default axiosClient;
