import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';
import swal from 'sweetalert';

const initialState = {
  loading: true,
  users: [],
  pagination: {
    currentPage: null,
    totalPages: null
  },
  detail: null,
  provinces: [],
  districts: [],
  wards: [],
  dataCreaterUser: null,
  dataResetPassword: '',
  dataDetailUser: [],
  totalRecords: 0
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAllUserRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getAllUserSuccess: (state, action) => {
      const { results, totalRecords } = action.payload;
      state.users = results;
      state.totalRecords = totalRecords;
    },
    getAllUserFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteUserRequest: () => {
      // request user
    },

    deleteFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    addUserRequest: () => {
      // request add user
    },
    addUserSuccess: () => {
      dispatchToast('success', 'Added User!');
    },
    addUserFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getUserRequest: () => {
      // request update user
    },
    getUserSuccess: (state, action) => {
      state.detail = action.payload;
    },
    getUserFail: (_, action) => {
      state.detail = initialState.detail;
      dispatchToast('error', action.payload);
    },
    updateUserRequest: () => {
      // request update user
    },
    updateUserSuccess: () => {
      dispatchToast('success', 'Updated User!');
    },
    updateUserFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    updatePasswordRequest: () => {
      // request update user
    },
    updatePasswordSuccess: () => {
      dispatchToast('success', 'Updated password!');
    },
    updatePasswordFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    reGetAllUserRequest: () => {
      // request all user
    },
    // gọi request địa chỉ tỉnh
    getAllProvincesRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    // goị địa chỉ tỉnh thành công
    getAllProvinceSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        provinces: action.payload.provinces
      };
    },
    getAllProvinceFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    // gọi địa chỉ quận, huyện
    getAllDistrictRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getAllDistrictSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        districts: action.payload.districts
      };
    },
    getAllDistrictFail: (_, action) => {
      dispatchToast('err', action.payload);
    },
    // Call api xã phường
    getAllWardRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getAllWardSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        wards: action.payload.wards
      };
    },
    getAllWardFail: (_, action) => {
      dispatchToast('err', action.payload);
    },
    addCreaterUserResquest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    addCreaterUserSuccess: (state, action) => {
      if (action.payload.dataCreater.result.isOK === true) {
        swal('Thành công!', `Mật khẩu khách hàng:${action.payload.dataCreater.data}`, 'success').then(() => {
          window.location.reload();
        });
      } else {
        swal(action.payload.dataCreater.result.responseMessage);
      }
    },
    addCreaterUserFail: (_, action) => {
      dispatchToast('err', action.payload);
    },
    resetPasswordRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    resetPasswordSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataResetPassword: action.payload
      };
    },
    resetPasswordFail: (_, action) => {
      dispatchToast('err', action.payload);
    },

    detailUserSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataDetailUser: action.payload.data.CMSDetailInfo
      };
    },

    deleteUserSuccess: (state, action) => {
      if (action.payload.result.isOK) {
        swal('Thành công!', 'Bạn đã xóa thành công!', 'success').then(() => {
          window.location.reload();
        });
      }
    }
  }
});

export const {
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
  reGetAllUserRequest,
  getAllProvincesRequest,
  getAllProvinceSuccess,
  getAllProvinceFail,
  getAllDistrictRequest,
  getAllDistrictSuccess,
  getAllDistrictFail,
  getAllWardRequest,
  getAllWardSuccess,
  getAllWardFail,
  addCreaterUserResquest,
  addCreaterUserSuccess,
  addCreaterUserFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  detailUserSuccess
} = users.actions;

export default users.reducer;
