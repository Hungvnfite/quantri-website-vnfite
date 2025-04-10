import axiosClient from '../axiosClient';

const getConsultationListApi = (params) => {
  return axiosClient.get(`/consultation?pageNumber=${params.pageNumber}&pageSize=10`);
};

const updateConsultationApi = (params) => {
  return axiosClient.put('/consultation', params);
};
export { getConsultationListApi, updateConsultationApi };
