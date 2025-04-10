import axiosClient from './axiosClient';

const getListNotificationApi = (params) => {
  return axiosClient.get('/notification', params);
};
const addNotificationApi = (params) => {
  return axiosClient.post('/notification/create', params);
};

const pushNotificationApi = (params) => {
  return axiosClient.post('/notification/push-notification', params);
};
const deleteNotificationApi = (params) => {
  const id = params.params;
  return axiosClient.delete(`/notification/delete/${id}`);
};

const getAllNotificationScheduleApi = () => {
  return axiosClient.get('/notification/AllSchedule/0');
};

const postDailyNotidicationApi = (params) => {
  return axiosClient.post(`/notification/schedule/daily?time=${params.time}&notifyId=${params.id}`);
};

const getAllDailyNotificationApi = () => {
  return axiosClient.get('/notification/allSchedule/0');
};

const deleteDailyNotificationApi = (params) => {
  return axiosClient.post(`/notification/cancel-daily?notifyId=${params.id}&time=${params.time}`);
};

const deleteAllNotificationApi = () => {
  return axiosClient.post('/notification/cancel-all-daily');
};
export {
  getListNotificationApi,
  addNotificationApi,
  pushNotificationApi,
  deleteNotificationApi,
  getAllNotificationScheduleApi,
  postDailyNotidicationApi,
  getAllDailyNotificationApi,
  deleteDailyNotificationApi,
  deleteAllNotificationApi
};
