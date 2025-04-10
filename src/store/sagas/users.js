import { put, call, takeLatest } from 'redux-saga/effects';
import {
  getAllUsersApi,
  requestDeleteUserApi,
  requestAddUserApi,
  requestGetUserApi,
  requestUpdateUserApi,
  requestUpdatePasswordApi
} from '~/api/users';

import {
  getAllUserRequest,
  getAllUserSuccess,
  getAllUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteFail,
  addUserRequest,
  addUserSuccess,
  addUserFail,
  getUserRequest,
  getUserSuccess,
  getUserFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  reGetAllUserRequest
} from '~/store/slices/rootAction';
import {
  getAllDistrictFail,
  getAllDistrictRequest,
  getAllDistrictSuccess,
  getAllProvinceFail,
  getAllProvinceSuccess,
  getAllProvincesRequest,
  getAllWardRequest,
  getAllWardFail,
  getAllWardSuccess,
  addCreaterUserResquest,
  addCreaterUserSuccess,
  addCreaterUserFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail
} from '../slices/users';
import { getDistrictApi, getProvinceApi, getWardApi, addCreaterUserApi, resetPasswordApi } from '../../api/users';

function* requestAllUsersSaga(action) {
  try {
    const data = yield call(getAllUsersApi, action.payload);
    yield put(
      getAllUserSuccess({
        results: data?.data.customerInfo,
        totalRecords: data?.data?.totalRecords
      })
    );
  } catch (error) {
    yield put(getAllUserFail(error?.message || 'Get all users failed!'));
  }
}

function* requestDeleteUserSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    yield call(requestDeleteUserApi, action.payload);
    yield put(deleteUserSuccess(action.payload));
    yield put(reGetAllUserRequest({ params }));
  } catch (error) {
    yield put(deleteFail(error?.message || 'Delete user failed!'));
  }
}

function* requestAddUserSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    const data = yield call(requestAddUserApi, action.payload);
    yield put(addUserSuccess(data));
    yield put(reGetAllUserRequest({ params }));
  } catch (error) {
    yield put(addUserFail(error?.message || 'Add user failed!'));
  }
}

function* requestGetUserSaga(action) {
  try {
    const data = yield call(requestGetUserApi, action.payload);
    yield put(
      getUserSuccess({
        name: data.name,
        email: data.email,
        role: data.role,
        orgIds: data.org_ids,
        username: data.username,
        password: data.password
      })
    );
  } catch (error) {
    yield put(getUserFail(error?.message || 'Get user info failed!'));
  }
}

function* requestUpdateUserSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    const data = yield call(requestUpdateUserApi, action.payload);
    yield put(updateUserSuccess(data));
    yield put(reGetAllUserRequest({ params }));
  } catch (error) {
    yield put(updateUserFail(error?.message || 'Update user info failed!'));
  }
}

function* requestUpdatePasswordSaga(action) {
  try {
    const data = yield call(requestUpdatePasswordApi, action.payload);
    yield put(updatePasswordSuccess(data));
  } catch (error) {
    yield put(updatePasswordFail(error?.message || 'Update password info failed!'));
  }
}
function* requestAllProvinceSaga(action) {
  try {
    const dataProvinces = yield call(getProvinceApi, action.payload);

    if (dataProvinces) {
      yield put(
        getAllProvinceSuccess({
          provinces: dataProvinces
        })
      );
    }
  } catch (err) {
    yield put(getAllProvinceFail(err?.message || 'Province faile!'));
  }
}

function* requestDistrictSaga(action) {
  try {
    const dataDistricts = yield call(getDistrictApi, action.payload);

    if (dataDistricts) {
      yield put(
        getAllDistrictSuccess({
          districts: dataDistricts
        })
      );
    }
  } catch (err) {
    yield put(getAllDistrictFail(err?.message || 'District fail!'));
  }
}

function* requestWardSaga(action) {
  try {
    const dataWards = yield call(getWardApi, action.payload);
    if (dataWards) {
      yield put(
        getAllWardSuccess({
          wards: dataWards
        })
      );
    }
  } catch (err) {
    yield put(getAllWardFail(err?.message || 'ward fail!'));
  }
}
function* requestCreaterUserSaga(action) {
  try {
    const dataCreaterUser = yield call(addCreaterUserApi, action.payload);
    //  if(dataCreaterUser.result.isOK==true){
    yield put(
      addCreaterUserSuccess({
        dataCreater: dataCreaterUser
      })
    );
    //  }
  } catch (err) {
    yield put(addCreaterUserFail(err?.message || 'creater user fail!'));
  }
}
function* resetPasswordSaga(action) {
  try {
    const dataResetPassword = yield call(resetPasswordApi, action.payload);
    yield put(
      resetPasswordSuccess({
        dataResetPassword: dataResetPassword
      })
    );
  } catch (err) {
    yield put(resetPasswordFail(err?.message || 'reset pasword Fail'));
  }
}
export default function* watchUsers() {
  yield takeLatest(getAllUserRequest.type, requestAllUsersSaga);
  yield takeLatest(deleteUserRequest.type, requestDeleteUserSaga);
  yield takeLatest(addUserRequest.type, requestAddUserSaga);
  yield takeLatest(getUserRequest.type, requestGetUserSaga);
  yield takeLatest(updateUserRequest.type, requestUpdateUserSaga);
  yield takeLatest(updatePasswordRequest.type, requestUpdatePasswordSaga);
  yield takeLatest([reGetAllUserRequest.type], requestAllUsersSaga);
  yield takeLatest([getAllProvincesRequest.type], requestAllProvinceSaga);
  yield takeLatest([getAllDistrictRequest.type], requestDistrictSaga);
  yield takeLatest([getAllWardRequest.type], requestWardSaga);
  yield takeLatest([addCreaterUserResquest.type], requestCreaterUserSaga);
  yield takeLatest([resetPasswordRequest.type], resetPasswordSaga);
}
