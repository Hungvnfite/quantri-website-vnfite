import axiosClient from './axiosClient';
const postCreateNewsApi = (param) => {
  const paramString = `/create-news`;
  return axiosClient.post(paramString, param, {
    headers: {
      'Content-type': 'multipart/form-data',
      transactionId: 'transactionId'
    }
  });
};

const getNewsListApi = (param) => {
  const paramString = `/get-news?tpageSize=10&pageNumber=${param}`;
  return axiosClient.get(paramString);
};

const deleteNewsApi = (param) => {
  const paramString = `/delete-news?id=${param}`;
  return axiosClient.delete(paramString);
};

const postNewsImageApi = (param) => {
  const paramString = `/upload-img-news`;
  return axiosClient.post(paramString, param, {
    headers: {
      'Content-type': 'multipart/form-data',
      transactionId: 'transactionId'
    }
  });
};

const updateNewsApi = (param) => {
  const paramString = `/updateNews`;
  return axiosClient.put(paramString, param, {
    headers: {
      'Content-type': 'multipart/form-data',
      transactionId: 'transactionId'
    }
  });
};

export { postCreateNewsApi, getNewsListApi, deleteNewsApi, postNewsImageApi, updateNewsApi };
