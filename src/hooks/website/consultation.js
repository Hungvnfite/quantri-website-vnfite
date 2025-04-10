import { getConsultationListApi, updateConsultationApi } from '~/api/website/consultation';
import dispatchToast from '~/handlers/toast';

const useConsultationStore = () => {
  const getConsultationList = async (params) => {
    try {
      const response = await getConsultationListApi(params);
      if (response.result.isOK) {
        return response.data;
      } else {
        dispatchToast('error', response.result.responseMessage);
      }
    } catch (error) {
      dispatchToast('error', 'Lỗi hệ thống, vui lòng thử lại sau');
    }
  };

  const updateConsultation = async (payload) => {
    try {
      const response = await updateConsultationApi(payload);
      if (response.result.isOK) {
        dispatchToast('success', 'Cập nhật tư vấn thành công');
        return response;
      } else {
        dispatchToast('error', response.result.responseMessage);
      }
    } catch (error) {
      dispatchToast('error', 'Lỗi hệ thống, vui lòng thử lại sau');
    }
  };

  return {
    getConsultationList,
    updateConsultation
  };
};

export default useConsultationStore;
