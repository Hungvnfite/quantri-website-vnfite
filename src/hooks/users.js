import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllUserRequest,
  deleteUserRequest,
  addUserRequest,
  getUserRequest,
  updateUserRequest,
  updatePasswordRequest,
  deleteUserSuccess
} from '~/store/slices/users';
import { getAllProvincesRequest, getAllDistrictRequest, getAllWardRequest, detailUserSuccess } from '../store/slices/users';
import {
  detailUserAPi,
  deleteUserApi,
  dashBoardApi,
  resetPasswordApi,
  searchUserPhoneApi,
  getAllUsersApi,
  getHistoryCustomerApi,
  addCreaterUserApi,
  addAccountCMSApi,
  getListAccountCMSApi,
  postResetPasswordAccountCMSApi,
  getListRoleApi,
  postEditRoleApi,
  deleteAccountCMSApi,
  searchUserApi,
  updateRoleApi,
  getDetailRoleByIdApi
} from '../api/users.js';
import dispatchToast from '~/handlers/toast';

const useUsersStore = () => {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);

  const dispatchDeleteUser = useCallback(
    (payload) => {
      dispatch(deleteUserRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchAddUser = useCallback(
    (payload) => {
      dispatch(addUserRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetUserById = useCallback(
    (payload) => {
      dispatch(getUserRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdateUser = useCallback(
    (payload) => {
      dispatch(updateUserRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdatePassword = useCallback(
    (payload) => {
      dispatch(updatePasswordRequest(payload));

      return true;
    },
    [dispatch]
  );
  const dispatchProvinces = useCallback(
    (payload) => {
      dispatch(getAllProvincesRequest(payload));
      return true;
    },
    [dispatch]
  );
  const dispatchDistricts = useCallback(
    (payload) => {
      dispatch(getAllDistrictRequest(payload));
      return true;
    },
    [dispatch]
  );
  const dispatchWard = useCallback(
    (payload) => {
      dispatch(getAllWardRequest(payload));
      return true;
    },
    [dispatch]
  );
  const dispatchCreateUser = useCallback(
    async (payload) => {
      // tạo và gọi bên slicer
      const response = await addCreaterUserApi(payload);
      if (response?.result.isOK) {
        dispatchToast('success', 'Tạo tài khoản thành công');
        // dispatch(addCreaterUserResquest(payload));
      } else {
        dispatchToast('error', response?.result?.responseMessage || 'Tạo tài khoản thất bại');
      }
    },
    [dispatch]
  );

  const detailUser = useCallback(async (payload) => {
    try {
      const res = await detailUserAPi(payload);
      if (res.result.isOK === true) {
        dispatch(detailUserSuccess(res));
      }
    } catch (e) {
      console.log('catch', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteUser = useCallback(async (payload) => {
    try {
      const res = await deleteUserApi(payload);
      if (res.result.isOK === true) {
        dispatch(deleteUserSuccess(res));
      }
    } catch (e) {
      console.log('catch', e);
    }
  }, []);

  const getInfoDashBoard = useCallback(async (payload) => {
    try {
      return await dashBoardApi(payload);
    } catch (error) {
      console.log('error', error);
    }
  }, []);
  // const dispatchResetPassword = useCallback(
  //   (payload) => {
  //     dispatch(resetPasswordRequest(payload));
  //     return true;
  //   },
  //   [dispatch]
  // );
  const resetPassword = useCallback(async (payload) => {
    try {
      return await resetPasswordApi(payload);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const searchListUserPhone = useCallback(async (payload) => {
    try {
      return await searchUserPhoneApi(payload);
    } catch (err) {
      console.log(err);
    }
  });
  const dispatchGetAllUsers = useCallback(
    (payload) => {
      dispatch(getAllUserRequest(payload));
      return true;
    },
    [dispatch]
  );
  const getAllUser = useCallback(async (payload) => {
    try {
      return await getAllUsersApi(payload.params);
    } catch (err) {
      console.log(err);
    }
  });
  const getHistoryCustomer = useCallback(async (payload) => {
    try {
      return await getHistoryCustomerApi(payload);
    } catch (err) {
      console.log(err);
    }
  });

  const addAccountCMS = async (payload) => {
    try {
      return await addAccountCMSApi(payload);
    } catch (err) {
      console.log('err', err);
    }
  };
  const getAccountCMS = async (params) => {
    try {
      return await getListAccountCMSApi(params);
    } catch (error) {
      console.log('error', error);
    }
  };
  const resetPasswordAccountCMS = async (id) => {
    try {
      return await postResetPasswordAccountCMSApi(id);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getListRole = async () => {
    try {
      return await getListRoleApi();
    } catch (error) {
      console.log('error', error);
    }
  };

  const editRole = async (payload) => {
    try {
      return await postEditRoleApi(payload);
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteAccountCMS = async (id) => {
    try {
      return await deleteAccountCMSApi(id);
    } catch (error) {
      console.log('error', error);
    }
  };

  const updateRole = async (payload) => {
    try {
      return await updateRoleApi(payload);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getDetailRoleById = async (id) => {
    try {
      return await getDetailRoleByIdApi(id);
    } catch (error) {
      console.log('error', error);
    }
  };

  const searchListUser = useCallback(async (payload) => {
    try {
      return await searchUserApi(payload);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return {
    dispatchGetAllUsers,
    dispatchDeleteUser,
    dispatchAddUser,
    dispatchGetUserById,
    dispatchUpdateUser,
    dispatchUpdatePassword,
    dispatchProvinces,
    dispatchDistricts,
    dispatchWard,
    dispatchCreateUser,
    // dispatchResetPassword,
    detailUser,
    deleteUser,
    usersState,
    getInfoDashBoard,
    resetPassword,
    searchListUserPhone,
    getAllUser,
    getHistoryCustomer,
    addAccountCMS,
    getAccountCMS,
    resetPasswordAccountCMS,
    getListRole,
    editRole,
    deleteAccountCMS,
    searchListUser,
    updateRole,
    getDetailRoleById
  };
};

export { useUsersStore };
