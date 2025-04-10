import axiosClient from './axiosClient';

const getAllHouseholdApi = (params) => {
  const phoneNumber = params?.phoneNumber ? `&phoneNumber=${params?.phoneNumber}` : '';
  return axiosClient.get(`/business-house-hold?pageNum=${params.pageNumber}&pageSize=10${phoneNumber}`);
};

export { getAllHouseholdApi };
