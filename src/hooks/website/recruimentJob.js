import {
  getRecruitmentJobListApi,
  createRecruitmentJobApi,
  getDetailRecruitmentJobApi,
  updateDetailRecruitmentJobApi,
  getAllCVsApi,
  getDetailCVApi,
  updateHiringJobStatusApi,
  updateAppliedJobStatusApi
} from '../../api/website/recruimentJob';
import dispatchToast from '~/handlers/toast';

const useRecruitmentJobStore = () => {
  const getRecruitmentJobList = async (params) => {
    try {
      const response = await getRecruitmentJobListApi(params);
      if (response.result.isOK) {
        return response.data;
      } else {
        dispatchToast('error', response.result.responseMessage);
      }
    } catch (error) {
      dispatchToast('error', 'Lỗi hệ thống, vui lòng thử lại sau');
    }
  };

  const createRecruitmentJob = async (payload) => {
    try {
      const response = await createRecruitmentJobApi(payload);
      if (response.result.isOK) {
        dispatchToast('success', 'Tạo bài tuyển dụng thành công');
        return response;
      } else {
        dispatchToast('error', response.result.responseMessage);
      }
    } catch (error) {
      dispatchToast('error', 'Lỗi hệ thống, vui lòng thử lại sau');
    }
  };

  const getDetailRecruitmentJob = async (id) => {
    try {
      const response = await getDetailRecruitmentJobApi(id);
      if (response.result.isOK) {
        return response.data;
      } else {
        dispatchToast('error', response.result.responseMessage);
      }
    } catch (error) {
      dispatchToast('error', 'Lỗi hệ thống, vui lòng thử lại sau');
    }
  };

  const updateDetailRecruitmentJob = async (payload) => {
    try {
      const response = await updateDetailRecruitmentJobApi(payload);
      if (response.result.isOK) {
        dispatchToast('success', 'Cập nhật bài tuyển dụng thành công');
        return response;
      } else {
        dispatchToast('error', response.result.responseMessage);
      }
    } catch (error) {
      dispatchToast('error', 'Lỗi hệ thống, vui lòng thử lại sau');
    }
  };

  const getAllCVs = async (id) => {
    try {
      const response = await getAllCVsApi(id);
      if (response.result.isOK) {
        return response.data;
      } else {
        dispatchToast('error', response.result.responseMessage);
      }
    } catch (error) {
      dispatchToast('error', 'Lỗi hệ thống, vui lòng thử lại sau');
    }
  };
  const getDetailCV = async (id) => {
    try {
      const response = await getDetailCVApi(id);
      if (response.result.isOK) {
        return response.data;
      } else {
        dispatchToast('error', response.result.responseMessage);
      }
    } catch (error) {
      dispatchToast('error', 'Lỗi hệ thống, vui lòng thử lại sau');
    }
  };

  const updateHiringJobStatus = async (payload) => {
    try {
      const response = await updateHiringJobStatusApi(payload);
      if (response.result.isOK) {
        dispatchToast('success', 'Cập nhật trạng thái bài tuyển dụng thành công');
        return response;
      } else {
        dispatchToast('error', response.result.responseMessage);
      }
    } catch (error) {
      dispatchToast('error', 'Lỗi hệ thống, vui lòng thử lại sau');
    }
  };
  const updateAppliedJobStatus = async (payload) => {
    try {
      const response = await updateAppliedJobStatusApi(payload);
      if (response.result.isOK) {
        // dispatchToast('success', 'Cập nhật trạng thái ứng tuyển thành công');
        return response;
      } else {
        dispatchToast('error', response.result.responseMessage);
      }
    } catch (error) {
      dispatchToast('error', 'Lỗi hệ thống, vui lòng thử lại sau');
    }
  };
  return {
    getRecruitmentJobList,
    createRecruitmentJob,
    getDetailRecruitmentJob,
    updateDetailRecruitmentJob,
    getAllCVs,
    getDetailCV,
    updateHiringJobStatus,
    updateAppliedJobStatus
  };
};

export default useRecruitmentJobStore;
