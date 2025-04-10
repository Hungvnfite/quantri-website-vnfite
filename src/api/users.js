import axiosClient from './axiosClient';
import axiosClient1 from './axiosClient1';
const getAllUsersApi = (params) => {
  return axiosClient.get(
    `/user?phone=${params.phone || ''}&fullName=${params.fullname || ''}&legalId=${params.legalId || ''}&bankAccountVnfite=${
      params.bankAccountVnfite || ''
    }&pageSize=${params.pageSize || 10}&pageNumber=${params.pageNumber || 0}&fromDate=${params.fromDate || ''}&toDate=${
      params.toDate || ''
    }&type=${params.type || 0}&isEKYC=${params.isEKYC || 0}`
  );
};

const requestDeleteUserApi = (params) => {
  const id = params?.id || '';
  return axiosClient.delete(`/users/${id}`);
};

const requestAddUserApi = (params) => {
  return axiosClient.post('/users', params);
};

const requestGetUserApi = (params) => {
  const id = params?.id || '';
  return axiosClient.get(`/users/${id}`);
};

const requestUpdateUserApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  delete params['id'];
  return axiosClient.put(`/users/${id}`, params);
};

const requestUpdatePasswordApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  delete params['id'];
  return axiosClient.put(`/users/change-password/${id}`, params);
};
const getProvinceApi = () => {
  return axiosClient.get('/list-province');
};
const getDistrictApi = (provinceId) => {
  return axiosClient.get(`/list-district?province_id=${provinceId}`);
};
const getWardApi = ({ provinceId, selectedDistrictId }) => {
  return axiosClient.get(`/list-ward?province_id=${provinceId}&district_id=${selectedDistrictId}`);
};
const addCreaterUserApi = (params) => {
  // ('/v2/user/create');
  return axiosClient1.post('/user/create', params);
};

const detailUserAPi = (params) => {
  const id = params.params;
  return axiosClient.get(`/user/detail-info/${id}`);
};
const deleteUserApi = (params) => {
  const id = params.params;
  return axiosClient.delete(`/user/delete/${id}`);
};

const dashBoardApi = (params) => {
  const type = params.params;
  return axiosClient.get(`/dashboard?type=${type}`);
};
const resetPasswordApi = (params) => {
  const id = params.params;
  return axiosClient.put(`/user/reset-password?id=${id}`);
};
const searchUserPhoneApi = (params) => {
  return axiosClient.get(`/user?phone=${params}`);
};
const getHistoryCustomerApi = (params) => {
  return axiosClient.get(`/user-loan-history/${params.id}?pageSize=10&pageNumber=${params.pageNumber ?? ''}&type=${params.type}`);
};
const addAccountCMSApi = (params) => {
  return axiosClient.post('/userCMS/create', params);
};
const getListAccountCMSApi = (params) => {
  return axiosClient.get(`/userCMS/getAll?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`);
};
const postResetPasswordAccountCMSApi = (params) => {
  return axiosClient.post(`/userCMS/reset-password/${params}`);
};
const postEditRoleApi = (params) => {
  return axiosClient.post(`/userCMS/change-author`, params);
};
const getListRoleApi = () => {
  return axiosClient.get('/userCMS/get-list-role');
};
const deleteAccountCMSApi = (params) => {
  return axiosClient.delete(`/userCMS/deleteUserCms/${params}`);
};
const updateRoleApi = (params) => {
  return axiosClient.put(`/userCMS/change-authority`, params);
};
const getDetailRoleByIdApi = (params) => {
  return axiosClient.get(`/userCMS/${params}`);
};

const searchUserApi = (params) => {
  return axiosClient.get(
    `/user/search?pageSize=2&pageNumber=${params.pageNumber || ''}&bankAccountVNFITE=${params.bankAccountVnfite || ''}&phone=${
      params.phone || ''
    }&fullname=${params.fullname || ''}&legalId=${params.legalId || ''}`
  );
};

export {
  getAllUsersApi,
  requestDeleteUserApi,
  requestAddUserApi,
  requestGetUserApi,
  requestUpdateUserApi,
  requestUpdatePasswordApi,
  getProvinceApi,
  getDistrictApi,
  getWardApi,
  addCreaterUserApi,
  resetPasswordApi,
  detailUserAPi,
  deleteUserApi,
  dashBoardApi,
  searchUserPhoneApi,
  getHistoryCustomerApi,
  addAccountCMSApi,
  getListAccountCMSApi,
  postResetPasswordAccountCMSApi,
  postEditRoleApi,
  getListRoleApi,
  deleteAccountCMSApi,
  searchUserApi,
  updateRoleApi,
  getDetailRoleByIdApi
};
