import { put, call, takeLatest } from 'redux-saga/effects';
import { getListNotificationApi, addNotificationApi, pushNotificationApi } from '../../api/notification';
import {
  getListNotificationSuccess,
  getListNotificationRequest,
  getListNotificationFail,
  addNotificationRequest,
  addNotificationSuccess,
  addNotificationFail,
  pushNotificationRequest,
  pushNotificationSuccess,
  pushNotificationFail
} from '../slices/notification';

function* requestGetListNotificationSaga(action) {
  try {
    const dataGetListNotification = yield call(getListNotificationApi, action.payload);

    yield put(
      getListNotificationSuccess({
        dataGetListNotification: dataGetListNotification.data.notifications
      })
    );
  } catch (error) {
    yield put(getListNotificationFail(error?.message || ' Notification failed!'));
  }
}

function* requestAddNotificationSaga(action) {
  try {
    const dataAddNotification = yield call(addNotificationApi, action.payload);

    yield put(
      addNotificationSuccess({
        dataAddNotification: dataAddNotification
      })
    );
  } catch (error) {
    yield put(addNotificationFail(error?.message || ' add Notification failed!'));
  }
}

function* requestPushNotificationSaga(action) {
  try {
    const dataPushNotification = yield call(pushNotificationApi, action.payload);

    if (dataPushNotification.result.isOK === true) {
      yield put(
        pushNotificationSuccess({
          dataPushNotification: dataPushNotification
        })
      );
    }
  } catch (error) {
    yield put(pushNotificationFail(error?.message || ' push Notification failed!'));
  }
}
export default function* watchNotification() {
  yield takeLatest([getListNotificationRequest.type], requestGetListNotificationSaga);
  yield takeLatest([addNotificationRequest.type], requestAddNotificationSaga);
  yield takeLatest([pushNotificationRequest.type], requestPushNotificationSaga);
}
