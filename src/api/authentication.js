import axiosClient from './axiosClient';
import axiosClientToken from './axiosClientToken';
const loginRequestApi = (params) => {
  return axiosClient.post('/auth/cms', params);
};

const getAccessTokenRequestApi = () => {
  return axiosClientToken.get('auth/token');
};
const refreshTokenRequestApi = (params) => {
  return axiosClient.post('/auth/refresh-tokens', params);
};

const changePasswordApi = (params) => {
  return axiosClient.post(`/userCMS/change-password`, params);
};

export { loginRequestApi, refreshTokenRequestApi, getAccessTokenRequestApi, changePasswordApi };
