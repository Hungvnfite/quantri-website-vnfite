import axiosClient from './axiosClient';

const getInvestingListApi = (params) => {
  return axiosClient.get(
    `/investment-loan/list-investment?phone=${params.phoneNumber}&name=${params.nameInvester}&investmentForm=${params.investmentForm}&page=${params.pageNumber}`
  );
};

const getDetailInvestApi = (params) => {
  return axiosClient.get(`investment-loan/detail-investment/${params.id}?investmentForm=${params.investmentForm}`);
};

const getTransferListApi = (params) => {
  return axiosClient.get(
    `/investment-loan/transfer/list-transfer-by-type?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}&type=${params.type}`
  );
};

export { getInvestingListApi, getDetailInvestApi, getTransferListApi };
