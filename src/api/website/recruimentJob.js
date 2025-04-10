import axiosClient from '../axiosClient';

const getRecruitmentJobListApi = async (params) => {
  const response = await axiosClient.get(
    `/hiring/?pageSize=${params.pageSize || 10}&pageNumber=${params.pageNumber || 0}&industryType=${params.industryType || ''}&name=${
      params.name || ''
    }&locationId=${params.locationId || ''}`
  );
  return response;
};

const createRecruitmentJobApi = async (payload) => {
  console.log(payload);
  const response = await axiosClient.post('/hire-job', payload);
  return response;
};

const getDetailRecruitmentJobApi = async (id) => {
  const response = await axiosClient.get(`/hiring/${id}`);
  return response;
};

const updateDetailRecruitmentJobApi = async (payload) => {
  const response = await axiosClient.put(`/update/hire-job`, payload);
  return response;
};

const updateHiringJobStatusApi = async (payload) => {
  const response = await axiosClient.put(`/update/status`, payload);
  return response;
};

const updateAppliedJobStatusApi = async (payload) => {
  const response = await axiosClient.put(`/apply/update/cv-status`, payload);
  return response;
};

const getAllCVsApi = async (params) => {
  const response = await axiosClient.get(
    `/apply/${params.hiringJobId}?pageSize=${params.pageSize || 10}&pageNumber=${params.pageNumber || 0}`
  );
  return response;
};

const getDetailCVApi = async (id) => {
  const response = await axiosClient.get(`/apply/${id}`);
  return response;
};

export {
  getRecruitmentJobListApi,
  createRecruitmentJobApi,
  getDetailRecruitmentJobApi,
  updateDetailRecruitmentJobApi,
  getAllCVsApi,
  getDetailCVApi,
  updateHiringJobStatusApi,
  updateAppliedJobStatusApi
};
