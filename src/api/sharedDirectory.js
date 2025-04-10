import axiosClient from './axiosClient';
const postCreateLoanPurposeApi = (param) => {
  const paramString = `/loan-purpose/save`;
  return axiosClient.post(paramString, param);
};

const getLoanPurposeListApi = () => {
  const paramString = `/loan-purpose/get-all`;
  return axiosClient.get(paramString);
};

const deleteLoanPurposeApi = (param) => {
  const paramString = `/loan-purpose/delete/${param}`;
  return axiosClient.delete(paramString);
};

const postCreateJobApi = (param) => {
  const paramString = `/job/save`;
  return axiosClient.post(paramString, param);
};

const getJobListApi = () => {
  const paramString = `/job/get-all`;
  return axiosClient.get(paramString);
};

const deleteJobApi = (param) => {
  const paramString = `/job/delete/${param}`;
  return axiosClient.delete(paramString);
};

const postCreateRelationshipApi = (param) => {
  const paramString = `/relationship/save`;
  return axiosClient.post(paramString, param);
};

const getRelationshipListApi = () => {
  const paramString = `/relationship/get-all`;
  return axiosClient.get(paramString);
};

const deleteRelationshipApi = (param) => {
  const paramString = `/relationship/delete/${param}`;
  return axiosClient.delete(paramString);
};

const addSystemParamApi = (param) => {
  const paramString = `/system-param/save`;
  return axiosClient.post(paramString, param);
};

const updateSystemParamApi = (param) => {
  const paramString = `/system-param/update/${param.id}`;
  return axiosClient.put(paramString, param);
};

const getAllSystemParamApi = () => {
  const paramString = `/system-param/get-all?page=0`;
  return axiosClient.get(paramString);
};
export {
  postCreateLoanPurposeApi,
  getLoanPurposeListApi,
  deleteLoanPurposeApi,
  postCreateJobApi,
  getJobListApi,
  deleteJobApi,
  postCreateRelationshipApi,
  getRelationshipListApi,
  deleteRelationshipApi,
  addSystemParamApi,
  updateSystemParamApi,
  getAllSystemParamApi
};
