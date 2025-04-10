import axios from 'axios';
import WebUtils from '../utils';
const axiosClientToken = axios.create({
  // ip test
  baseURL: WebUtils.envMode.baseURL,
  //ip live
  // baseURL: 'https://service-vnfite.com.vn/tikluy/cms',
  // baseURL: "https://service-vnfite.com.vn/tikluy/cms",

  headers: {
    Authorization: 'Basic VkYtTlNLM1NERjoydHpNR3N0NjdzWmZYcW14NjhUeG5RVXp5cmlCdGk=',
    transactionId: new Date().getTime().toString()
  }
});
// axiosClientToken.interceptors.request.use((config) => {
//   // const token = store.getState()?.authentication?.accessToken?.token;
//   const token = store.getState()?.authentication?.accessToken;

// //   if (token) {
// //     config.headers['Authorization'] = `Bearer ${token}`;
// //   }
// //   return config;
// });

axiosClientToken.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error?.response?.data;
  }
);

export default axiosClientToken;
