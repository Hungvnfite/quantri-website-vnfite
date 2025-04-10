import axiosClient from './axiosClient';

const getLoanListApi = (payload) => {
  return axiosClient.get(
    `/user-loan/get-all?approval=${payload.approval}&status=${payload.status}&statusDetail=${payload.statusDetail}&pageNumber=${
      payload.pageNumber
    }&loanCode=${payload.loanCode || ''}&fullName=${payload.fullName || ''}&typeLoanPackage=${payload.typeLoanPackage || '0'}`
  );
};

const getQualifiedLoanListApi = (payload) => {
  return axiosClient.get(
    `/user-loan/get-qualified-loan?pageNumber=${payload.pageNumber}&loanCode=${payload.loanCode || ''}&fullName=${
      payload.fullName || ''
    }&type=${payload.type || '1'}&typeLoanPackage=${payload.typeLoanPackage || '0'}`
  );
};

const getDetailLoanApi = (id) => {
  return axiosClient.get(`/user-loan/detail-loan/${id}`);
};
// day khoan vay len san hay k confirm : 1 => duyet confirm  | 2 => tu choi
const approvalLoanApi = (payload) => {
  return axiosClient.put(
    `/user-loan/confirm-loan/${payload.id}?confirm=${payload.confirm}&interestRate=${payload.interestRate || ''}&reason=${
      payload.reasonRejected || ''
    }&desiredMoney=${payload.desiredMoney || ''}&evaluate=${payload.evaluate || null}&creditScore=${payload.creditScore || ''}`
  );
};
// giai ngan khoan vay hay khong
const disbursementApi = (payload) => {
  return axiosClient.post(`/user-loan/confirm/${payload.id}?confirm=${payload.type}`);
};
const getRankApi = () => {
  return axiosClient.get('/rank');
};

const getRankByNameApi = (id) => {
  return axiosClient.get(`/rank-loan-package/get-by-rank/${id}`);
};

const getTermListApi = (payload) => {
  return axiosClient.get(`/term/get-by-loan-package/${payload.id}?isDelete=N`);
};

const deleteTermApi = (id) => {
  return axiosClient.delete(`/term/delete/${id}`);
};
const createTermApi = (payload) => {
  return axiosClient.post('/term/save', payload);
};
const editTermApi = (payload, id) => {
  return axiosClient.put(`/term/update/${id}`, payload);
};

const addLoanPackageApi = (payload) => {
  const formData = new FormData();

  // Append each payload property to the formData
  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });

  return axiosClient.post('/loan-package/save', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      transactionId: new Date().getTime().toString()
    }
  });
};

const getAllLoanPackageApi = (payload) => {
  return axiosClient.get(`/loan-package?type=${payload.type}`);
};
const getLoanPackageApi = (payload) => {
  const formData = new FormData();

  // Append each payload property to the formData
  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });

  return axiosClient.get(`/loan-package/detail/${payload.id}`);
};
const updateLoanPackageApi = (payload) => {
  return axiosClient.put(`/loan-package/update/${payload.id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      transactionId: new Date().getTime().toString()
    }
  });
};

const updateLoanReleaseApi = (payload) => {
  return axiosClient.put(`/loan-package/release/${payload.id}`);
};
const updateRankApi = (payload) => {
  return axiosClient.put(`/rank/update/${payload.id}`, payload);
};

const addRankApi = (payload) => {
  return axiosClient.post('/rank/save', payload);
};

const getRankListLoanPackageApi = (id) => {
  return axiosClient.get(`/rank-loan-package/${id}`);
};

const postaddRankLoanPackageApi = (payload) => {
  return axiosClient.post('/rank-loan-package/save', payload);
};

const getRankListSelectNotInApi = (id) => {
  return axiosClient.get(`/rank/select-not-in/${id}`);
};

const deleteRankLoanPackageApi = (id) => {
  return axiosClient.delete(`/rank-loan-package/delete/${id}`);
};

const updateRankLoanPackageApi = (payload, id) => {
  return axiosClient.put(`/rank-loan-package/update/${id}`, payload);
};

const getRankByPackageApi = (id) => {
  return axiosClient.get(`/rank-loan-package/${id}`);
};

const getAllPaymentPeriodApi = (id) => {
  return axiosClient.get(`/payment-period/get-by-loan/${id}`);
};

const pushLoanToFloorApi = (payload) => {
  return axiosClient.put(`user-loan/push-loan-to-floor/${payload.id}?confirm=${payload.confirm}`);
};

const createUserLoanApi = (payload) => {
  return axiosClient.post(`/user-loan/create-new-user-loan`, payload);
};

const getAllUserLoanListApi = (payload) => {
  return axiosClient.get(
    `/user-loan/get-all-loan?pageSize=12&pageNumber=${payload.pageNumber}&loanCode=${payload.loanCode || ''}&fromDate=${
      payload.fromDate ?? ''
    }&toDate=${payload.toDate ?? ''}`
  );
};

export {
  updateLoanReleaseApi,
  getAllLoanPackageApi,
  getLoanListApi,
  getDetailLoanApi,
  approvalLoanApi,
  disbursementApi,
  getRankApi,
  getRankByNameApi,
  addLoanPackageApi,
  updateLoanPackageApi,
  getLoanPackageApi,
  getTermListApi,
  deleteTermApi,
  createTermApi,
  editTermApi,
  updateRankApi,
  addRankApi,
  getRankListLoanPackageApi,
  postaddRankLoanPackageApi,
  getRankListSelectNotInApi,
  deleteRankLoanPackageApi,
  updateRankLoanPackageApi,
  getRankByPackageApi,
  getQualifiedLoanListApi,
  getAllPaymentPeriodApi,
  pushLoanToFloorApi,
  createUserLoanApi,
  getAllUserLoanListApi
};
