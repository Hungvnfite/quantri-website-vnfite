import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  getListNotificationRequest,
  addNotificationRequest,
  pushNotificationRequest,
  deleteNotificationSuccess
} from '~/store/slices/notification';
import {
  deleteNotificationApi,
  getAllNotificationScheduleApi,
  postDailyNotidicationApi,
  getAllDailyNotificationApi,
  deleteDailyNotificationApi,
  deleteAllNotificationApi
} from '../api/notification';
import dispatchToast from '~/handlers/toast';
const useNotificationStore = () => {
  const dispatch = useDispatch();

  const dispatchGetListNofitication = useCallback(
    (payload) => {
      dispatch(getListNotificationRequest(payload));
      return true;
    },
    [dispatch]
  );

  const dispatchAddNofitication = useCallback(
    (payload) => {
      dispatch(addNotificationRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchPushNofitication = useCallback(
    (payload) => {
      dispatch(pushNotificationRequest(payload));

      return true;
    },
    [dispatch]
  );
  const deleteNotification = useCallback(
    async (payload) => {
      try {
        const res = await deleteNotificationApi(payload);
        if (res.result.isOK === true) {
          dispatch(deleteNotificationSuccess(res));
        }
      } catch (e) {
        console.log('catch', e);
      }
    },
    [dispatch]
  );

  const getAllNotificationSchedule = async () => {
    try {
      return await getAllNotificationScheduleApi();
    } catch (error) {
      console.log(error);
      dispatchToast('error', 'Lấy danh sách thông báo thất bại');
    }
  };
  const postDailyNotidication = async (payload) => {
    try {
      return await postDailyNotidicationApi(payload);
    } catch (error) {
      // dispatchToast('error', 'Tạo thông báo hàng ngày thất bại');
      console.log('error notification');
    }
  };
  const getAllDailyNotification = async () => {
    try {
      return await getAllDailyNotificationApi();
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteDailyNotification = async (data) => {
    try {
      return await deleteDailyNotificationApi(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteAllNotification = async () => {
    try {
      return await deleteAllNotificationApi();
    } catch (error) {
      console.log('error', error);
    }
  };

  return {
    dispatchGetListNofitication,
    dispatchAddNofitication,
    dispatchPushNofitication,
    deleteNotification,
    getAllNotificationSchedule,
    postDailyNotidication,
    getAllDailyNotification,
    deleteDailyNotification,
    deleteAllNotification
  };
};

export { useNotificationStore };
