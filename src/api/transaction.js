import axiosClient from './axiosClient';
const transactionRechargeApproveRequestApi = (params) => {
  return axiosClient.post('transaction-management/approve', params);
};

const transactionWithdrawApproveRequestApi = (params) => {
  return axiosClient.post('transaction-management/approve', params);
};

const rejectRechargeApproveApi = (params) => {
  return axiosClient.post('transaction-management/reject', params);
};

const viewImageDetailApi = (params) => {
  return axiosClient.get(`/transaction-management/view-image-detail/${params.id}`);
};

const getTotalTransactionApi = (params) => {
  return axiosClient.get(
    `transaction-management/get-total-amount?type=${params?.type}&fromDate=${params?.fromDate || ''}&toDate=${params?.toDate || ''}`
  );
};

export {
  transactionRechargeApproveRequestApi,
  transactionWithdrawApproveRequestApi,
  rejectRechargeApproveApi,
  viewImageDetailApi,
  getTotalTransactionApi
};
