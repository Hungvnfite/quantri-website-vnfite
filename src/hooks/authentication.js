import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  loginRequest,
  logoutSuccess,
  changeRememberMe,
  initApp,
  getAccessTokenRequest,
  changePassword
} from '~/store/slices/authentication';

const useAuthenticationStore = () => {
  const dispatch = useDispatch();

  const authenticationState = useSelector((state) => state.authentication);
  const roleState = useSelector((state) => state.authentication.roleForModule || 'VIEWER');

  // const moduleRoles = useSelector((state) => state.authentication?.loginInfo.roles || []);

  const moduleRoles = [];

  // const moduleRoleState = useSelector((state) => state.authentication?.moduleRole || []);

  const dispatchInitApp = useCallback(
    (payload) => {
      dispatch(initApp(payload));
    },
    [dispatch]
  );

  const dispatchLogin = useCallback(
    (payload) => {
      dispatch(loginRequest(payload));
      return true;
    },
    [dispatch]
  );
  const dispatchGetAccessToken = useCallback(
    (payload) => {
      dispatch(getAccessTokenRequest(payload));
      return true;
    },
    [dispatch]
  );
  const dispatchLogout = useCallback(() => {
    dispatch(logoutSuccess());

    return true;
  }, [dispatch]);

  const dispatchChangeRememberMe = useCallback(
    (payload) => {
      dispatch(changeRememberMe(payload));
    },
    [dispatch]
  );

  const dispatchChangePassword = useCallback(
    (payload) => {
      dispatch(changePassword(payload));
    },
    [dispatch]
  );

  const allowToMake = ['ADMIN', 'SUPER_ADMIN', 'MAKER'].includes(roleState);

  const allowToCheck = ['ADMIN', 'SUPER_ADMIN', 'CHECKER'].includes(roleState);

  const allowToCreate = ['ADMIN', 'SUPER_ADMIN'].includes(roleState);

  const allowToAuth = ['SUPER_ADMIN'].includes(roleState);

  return {
    dispatchInitApp,
    dispatchLogin,
    dispatchLogout,
    dispatchChangeRememberMe,
    dispatchGetAccessToken,
    authenticationState,
    roleState,
    dispatchChangePassword,
    allowToCheck,
    allowToMake,
    allowToCreate,
    allowToAuth,
    moduleRoles
  };
};

export { useAuthenticationStore };
