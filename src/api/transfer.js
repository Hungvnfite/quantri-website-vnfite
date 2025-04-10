import axiosClient from './axiosClient';

const postAddTransferFeeApi = async (params) => {
  return axiosClient.post('/add-transfer-fee', params);
};

const getTransferFeeListApi = async (payload) => {
  return axiosClient.get(`/get-list-transfer-fee?pageNumber=${payload.pageNumber}&pageSize=10`);
};

const deleterTransferFeeApi = async (id) => {
  return axiosClient.delete(`/delete-transfer-fee/${id}`);
};

const updateTransferFeeApi = async (params, id) => {
  return axiosClient.put(`/update-transfer-fee/${id}`, params);
};

export { postAddTransferFeeApi, getTransferFeeListApi, deleterTransferFeeApi, updateTransferFeeApi };
