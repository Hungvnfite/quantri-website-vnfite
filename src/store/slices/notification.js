import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';
import swal from 'sweetalert';

const initialState = {
  loading: true,
  dataGetListNotification: [],
  dataAddNotification: [],
  dataPushNotification: []
};

export const Notification = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    getListNotificationRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getListNotificationSuccess: (state, action) => {
      return {
        dataGetListNotification: action.payload.dataGetListNotification
      };
    },
    getListNotificationFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    addNotificationRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    addNotificationSuccess: (state, action) => {
      if (action.payload.dataAddNotification.result.isOK === true) {
        swal('Thành công!', 'Bạn đã thêm thành công!', 'success').then(() => {
          window.location.reload();
        });
      } else {
        swal(action.payload.dataAddNotification.result.responseMessage);
      }
    },
    addNotificationFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    pushNotificationRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    pushNotificationSuccess: (state, action) => {
      if (action.payload.dataPushNotification.result.isOK === true) {
        swal('Thành công!', 'Bạn đã bắn thông báo thành công!', 'success').then(() => {
          window.location.reload();
        });
      } else {
        swal(action.payload.dataPushNotification.result.responseMessage);
      }
    },
    pushNotificationFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteNotificationSuccess: (state, action) => {
      if (action.payload.result.isOK) {
        swal('Thành công!', 'Bạn đã xóa thành công!', 'success').then(() => {
          window.location.reload();
        });
      }
    }
  }
});

export const {
  getListNotificationRequest,
  getListNotificationSuccess,
  getListNotificationFail,
  addNotificationFail,
  addNotificationSuccess,
  addNotificationRequest,
  pushNotificationRequest,
  pushNotificationSuccess,
  pushNotificationFail,
  deleteNotificationSuccess
} = Notification.actions;

export default Notification.reducer;
