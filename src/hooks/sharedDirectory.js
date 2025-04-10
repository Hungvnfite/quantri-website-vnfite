// import { useSelector } from 'react-redux';
import dispatchToast from '~/handlers/toast';
import {
  postCreateLoanPurposeApi,
  getLoanPurposeListApi,
  deleteLoanPurposeApi,
  postCreateJobApi,
  getJobListApi,
  deleteJobApi,
  postCreateRelationshipApi,
  getRelationshipListApi,
  deleteRelationshipApi,
  addSystemParamApi,
  updateSystemParamApi,
  getAllSystemParamApi
} from '../api/sharedDirectory';

const useNewsStore = () => {
  // const newsState = useSelector((state) => state.news);

  const getLoanPurposeList = async () => {
    try {
      const response = await getLoanPurposeListApi();
      if (response.result.isOK) {
        return response.data;
      } else {
        dispatchToast('error', 'Lấy danh sách mục đích vay thất bại');
      }
    } catch (e) {
      console.log('error', e);
      dispatchToast('error', 'Lỗi hệ thống');
    }
  };

  const createLoanPurpose = async (formData) => {
    try {
      const response = await postCreateLoanPurposeApi(formData);
      if (response.result.isOK) {
        dispatchToast('success', 'Tạo mục đích vay thành công');
        return true;
      } else {
        const errorMessage = response.result.responseMessage || 'Tạo mục đích vay thất bại';
        dispatchToast('error', errorMessage);
        return false;
      }
    } catch (e) {
      console.log('Error creating loan purpose:', e);
      dispatchToast('error', 'Lỗi hệ thống');
      return false;
    }
  };

  const deleteLoanPurpose = async (id) => {
    try {
      const response = await deleteLoanPurposeApi(id);

      if (response.result.isOK) {
        dispatchToast('success', 'Xóa mục đích vay thành công');
      } else {
        dispatchToast('error', 'Xóa mục đích vay thất bại');
      }
    } catch (e) {
      console.log('error', e);
      dispatchToast('error', 'Lỗi hệ thống');
    }
  };

  const getRealationshipList = async () => {
    try {
      const response = await getRelationshipListApi();

      if (response.result.isOK) {
        return response.data;
      } else {
        dispatchToast('error', 'Lấy danh sách mối quan hệ thất bại');
      }
    } catch (e) {
      console.log('error', e);
      dispatchToast('error', 'Lỗi hệ thống');
    }
  };

  const createRelationship = async (formData) => {
    try {
      const response = await postCreateRelationshipApi(formData);

      if (response.result.isOK) {
        dispatchToast('success', 'Tạo mối quan hệ thành công');
        return true;
      } else {
        const errorMessage = response.result.responseMessage || 'Tạo mối quan hệ thất bại';
        dispatchToast('error', errorMessage);
        return false;
      }
    } catch (e) {
      dispatchToast('error', 'Lỗi hệ thống');
      return false;
    }
  };

  const deleteRelationship = async (id) => {
    try {
      const response = await deleteRelationshipApi(id);
      if (response.result.isOK) {
        dispatchToast('success', 'Xóa mối quan hệ thành công');
      } else {
        dispatchToast('error', 'Xóa mối quan hệ thất bại');
      }
    } catch (e) {
      console.log('error', e);
      dispatchToast('error', 'Lỗi hệ thống');
    }
  };

  const getJobList = async () => {
    try {
      const response = await getJobListApi();
      if (response.result.isOK) {
        return response.data;
      } else {
        dispatchToast('error', 'Lấy danh sách nghề nghiệp thất bại');
      }
    } catch (e) {
      console.log('error', e);
      dispatchToast('error', 'Lỗi hệ thống');
    }
  };

  const createJob = async (formData) => {
    try {
      const response = await postCreateJobApi(formData);
      if (response.result.isOK) {
        dispatchToast('success', 'Tạo nghề nghiệp thành công');
        return true;
      } else {
        const errorMessage = response.result.responseMessage || 'Tạo nghề nghiệp thất bại';
        dispatchToast('error', errorMessage);
        return false;
      }
    } catch (e) {
      dispatchToast('error', 'Lỗi hệ thống');
      return false;
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await deleteJobApi(id);
      if (response.result.isOK) {
        dispatchToast('success', 'Xóa nghề nghiệp thành công');
      } else {
        dispatchToast('error', 'Xóa nghề nghiệp thất bại');
      }
    } catch (e) {
      console.log('error', e);
      dispatchToast('error', 'Lỗi hệ thống');
    }
  };

  const addSystemParam = async (formData) => {
    try {
      const response = await addSystemParamApi(formData);
      if (response.result.isOK) {
        dispatchToast('success', 'Thêm thông số hệ thống thành công');
        return true;
      } else {
        const errorMessage = response.result.responseMessage || 'Thêm thông số hệ thống thất bại';
        dispatchToast('error', errorMessage);
        return false;
      }
    } catch (e) {
      console.log('Error creating loan purpose:', e);
      dispatchToast('error', 'Lỗi hệ thống');
      return false;
    }
  };

  const updateSystemParam = async (formData) => {
    try {
      const response = await updateSystemParamApi(formData);
      if (response.result.isOK) {
        dispatchToast('success', 'Cập nhật thông số hệ thống thành công');
        return true;
      } else {
        const errorMessage = response.result.responseMessage || 'Cập nhật thông số hệ thống thất bại';
        dispatchToast('error', errorMessage);
        return false;
      }
    } catch (e) {
      console.log('Error creating loan purpose:', e);
      dispatchToast('error', 'Lỗi hệ thống');
      return false;
    }
  };

  const getAllSystemParam = async () => {
    try {
      const response = await getAllSystemParamApi();
      if (response.result.isOK) {
        return response.data;
      } else {
        dispatchToast('error', 'Lấy danh sách thông số hệ thống thất bại');
      }
    } catch (e) {
      console.log('error', e);
      dispatchToast('error', 'Lỗi hệ thống');
    }
  };
  return {
    getLoanPurposeList,
    createLoanPurpose,
    deleteLoanPurpose,
    getRealationshipList,
    createRelationship,
    deleteRelationship,
    getJobList,
    createJob,
    deleteJob,
    addSystemParam,
    updateSystemParam,
    getAllSystemParam
  };
};

export default useNewsStore;
