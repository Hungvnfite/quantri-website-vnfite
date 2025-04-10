import { useSelector } from 'react-redux';
import dispatchToast from '~/handlers/toast';
import { getNewsListApi, postCreateNewsApi, deleteNewsApi, postNewsImageApi, updateNewsApi } from '../api/news';

const useNewsStore = () => {
  const newsState = useSelector((state) => state.news);

  const getListNews = async (payload) => {
    try {
      const response = await getNewsListApi(payload);
      if (response.result.isOK) {
        return response.data;
      } else {
        dispatchToast('error', 'Lấy danh sách tin tức thất bại');
      }
    } catch (e) {
      console.log('error', e);
      dispatchToast('error', 'Lỗi hệ thống');
    }
  };

  const createNews = async (formData) => {
    try {
      const response = await postCreateNewsApi(formData);
      if (response.result.isOK) {
        dispatchToast('success', 'Tạo tin tức thành công');
        return true;
      } else {
        const errorMessage = response.result.responseMessage || 'Tạo tin tức thất bại';
        dispatchToast('error', errorMessage);
        return false;
      }
    } catch (e) {
      console.log('Error creating news:', e);
      dispatchToast('error', 'Lỗi hệ thống');
      return false;
    }
  };

  const deleteNews = async (id) => {
    try {
      const response = await deleteNewsApi(id);
      if (response.result.isOK) {
        dispatchToast('success', 'Xóa tin tức thành công');
      } else {
        dispatchToast('error', 'Xóa tin tức thất bại');
      }
    } catch (e) {
      console.log('error', e);
      dispatchToast('error', 'Lỗi hệ thống');
    }
  };

  const uploadNewsImage = async (formData) => {
    try {
      const response = await postNewsImageApi(formData);
      if (response.result.isOK) {
        // dispatchToast('success', 'Tải ảnh thành công');
        return response;
      } else {
        const errorMessage = response.result.responseMessage || 'Tải ảnh thất bại';
        dispatchToast('error', errorMessage);
        return response;
      }
    } catch (e) {
      console.log('Error creating news:', e);
      dispatchToast('error', 'Lỗi hệ thống tải ảnh');
      return false;
    }
  };

  const updateNews = async (formData) => {
    try {
      const response = await updateNewsApi(formData);
      if (response.result.isOK) {
        dispatchToast('success', 'Cập nhật tin tức thành công');
        return true;
      } else {
        const errorMessage = response.result.responseMessage || 'Cập nhật tin tức thất bại';
        dispatchToast('error', errorMessage);
        return false;
      }
    } catch (e) {
      console.log('Error creating news:', e);
      dispatchToast('error', 'Lỗi hệ thống');
      return false;
    }
  };

  return {
    newsState,
    getListNews,
    createNews,
    deleteNews,
    uploadNewsImage,
    updateNews
  };
};

export default useNewsStore;
