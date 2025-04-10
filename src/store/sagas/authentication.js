import { put, call, takeLatest } from 'redux-saga/effects';
import { loginRequestApi, getAccessTokenRequestApi, changePasswordApi } from '~/api/authentication';
import {
  initApp,
  loginRequest,
  loginSuccess,
  refreshTokenSuccess,
  getAccessTokenSuccess,
  getAccessTokenFail,
  getAccessTokenRequest,
  changePassword
} from '~/store/slices/rootAction';
import dispatchToast from '~/handlers/toast';

function* loginRequestSaga(action) {
  try {
    const data = yield call(loginRequestApi, action.payload);
    if (data?.result?.isOK) {
      yield put(
        loginSuccess({
          token: data.data.loginInfo.accessToken,
          infor: {
            roles: data.data.loginInfo.roles,
            username: action.payload.username,
            avatar: 'https://pbs.twimg.com/media/FHlfwdLUcAIK7-D?format=jpg&name=large'
          },
          sessionId: data.data.sessionId
        })
      );
    } else {
      dispatchToast('warning', data.result.responseMessage ?? 'Sai tài khoản hoặc mật khẩu');
    }
  } catch (error) {
    dispatchToast('warning', 'Lỗi hệ thống vui lòng thử lại sau');
  }
}
function* getAccessTokenRequestSaga(action) {
  try {
    const data = yield call(getAccessTokenRequestApi, action.payload);

    if (data) {
      yield put(getAccessTokenSuccess(data));
    }
  } catch (error) {
    yield put(getAccessTokenFail(error?.message || 'Token Failed!'));
  }
}

// Theo dõi hành động NAVIGATE_TO_KHACH_HANG và xử lý bằng saga handleNavigateToKhachHang

function* refreshTokenRequestSaga() {
  // try {
  //   let { accessToken, refreshToken } = action.payload;
  //   const refreshTokenExpirationTime = dayjs(refreshToken?.expires);
  //   const accessTokenExpirationTime = dayjs(accessToken?.expires);
  //   const currentTime = dayjs();
  //   // Trong trường hợp refresh token hết hạn. throws luôn ra error:
  //   if (refreshTokenExpirationTime.isBefore(currentTime)) {
  //     throw new Error('Refresh token expired');
  //   }
  //   if (accessTokenExpirationTime.isAfter(currentTime)) {
  //     const diffInMillis = accessTokenExpirationTime.diff(currentTime);
  //     yield delay(diffInMillis);
  //   }
  //   const data = yield call(refreshTokenRequestApi, {
  //     refreshToken: refreshToken.token
  //   });
  //   yield put(
  //     refreshTokenSuccess({
  //       accessToken: data.access,
  //       refreshToken: data.refresh
  //     })
  //   );
  // } catch (error) {
  //   yield put(refreshTokenFail(error?.message || 'Refresh Token Failed!'));
  // }
}

function* changePasswordRequestSaga(action) {
  try {
    const data = yield call(changePasswordApi, action.payload);
    if (data?.result?.isOK) {
      dispatchToast('success', 'Đổi mật khẩu thành công');
    } else {
      dispatchToast('warning', data.result.messageError ?? 'Đổi mật khẩu thất bại');
    }
  } catch (error) {
    dispatchToast('warning', 'Lỗi hệ thống vui lòng thử lại sau');
  }
}

export default function* watchAuthentication() {
  yield takeLatest(loginRequest.type, loginRequestSaga);
  yield takeLatest([initApp.type, loginSuccess.type, refreshTokenSuccess.type], refreshTokenRequestSaga);
  yield takeLatest(getAccessTokenRequest.type, getAccessTokenRequestSaga);
  yield takeLatest(changePassword.type, changePasswordRequestSaga);
}
