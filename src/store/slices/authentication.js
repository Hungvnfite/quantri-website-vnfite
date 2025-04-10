import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  accessToken: {
    token: '',
    expires: ''
  },
  // refreshToken: {
  //   token: '',
  //   expires: ''
  // },
  loginInfo: null,
  // rememberMe: true,
  loading: false,
  sessionId: null,
  isLoginSuccess: false,
  roleForModule: 'VIEWER'
};

export const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    initApp: () => {
      //
    },
    changeRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    loginRequest: (state) => {
      // request login
      return {
        ...state,
        loading: true
      };
    },
    loginSuccess: (state, action) => {
      // phần này lấy dữ liệu để chuyển sang trạng thái đăng nhập với thông tin logininfor, từ điều  kiện check router với authen ở trong route
      dispatchToast('success', 'Chào mừng đến với hệ thống quản trị');
      return {
        ...state,
        sessionId: action.payload.token,
        loginInfo: action.payload.infor,
        userId: action.payload.sessionId
      };
    },
    loginFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getAccessTokenRequest: (state, action) => {
      // request login
      return {
        ...state,
        loading: true
      };
    },
    getAccessTokenSuccess: (state, action) => {
      // state.sessionId= action.payload
      state.accessToken = action.payload.data.accessToken;
    },
    getAccessTokenFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    logoutRequest: () => {
      // request logout
    },
    logoutSuccess: (state) => {
      // localStorage.clear();
      state.sessionId = null;
      state.refreshToken = initialState.refreshToken;
      state.loginInfo = initialState.loginInfo;
      state.userId = null;
    },
    logoutFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    refreshTokenSuccess: () => {
      // const { accessToken, refreshToken } = action.payload;
      // state.accessToken = accessToken;
      // state.refreshToken = refreshToken;
    },
    refreshTokenFail: () => {
      // state.accessToken = initialState.accessToken;
      // state.refreshToken = initialState.refreshToken;
      // state.loginInfo = initialState.loginInfo;
      // dispatchToast('error', action.payload);
    },
    changePassword: (state, action) => {},
    setRoleForModule: (state, action) => {
      state.roleForModule = action.payload.role;
    }
  }
});

export const {
  initApp,
  changeRememberMe,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  loginFail,
  logoutFail,
  refreshTokenSuccess,
  refreshTokenFail,
  getAccessTokenSuccess,
  getAccessTokenFail,
  getAccessTokenRequest,
  changePassword,
  setRoleForModule
} = authentication.actions;

export default authentication.reducer;
