import axiosClient from './axiosClient';

const requestUpdateTimeSheetApi = (params) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return axiosClient.post(`/timesheet`, params);
};

const requestGetTimeSheetByUser = (params) => {
  const id = params ? `?user=${params}` : '';
  return axiosClient.get(`/timesheet${id}`);
};
export { requestUpdateTimeSheetApi, requestGetTimeSheetByUser };
