import axiosClient from './axiosClient';
import axiosClient1 from './axiosClient1';
const getInvestmentProductApi = (params) => {
  return axiosClient.get('/investment-holding/product', params);
};
const getConditionApi = (params) => {
  const investmentProductsId = params;
  return axiosClient.get('/investment-holding/extension', {
    params: investmentProductsId
  });
};
const createConditionApi = (params) => {
  return axiosClient.post(`/investment-holding/extension/create`, params);
};
const deleteConditionApi = (params) => {
  const id = params.params;
  return axiosClient.delete(`/investment-holding/extension/delete/${id}`);
};
const conditionContentApi = (params) => {
  const id = params.params;
  return axiosClient.get(`/investment-holding/extension/${id}`);
};
const getConditionUpdateApi = (params) => {
  const id = params.params;
  return axiosClient.post(`/investment-holding/extension/update/${id}`);
};
const getFeatureApi = (params) => {
  const investmentProductsId = params;
  return axiosClient.get(`/investment-holding/extension`, {
    params: investmentProductsId
  });
};
const createFeatureApi = (params) => {
  return axiosClient.post(`/investment-holding/extension/create`, params);
};
const deleteFeatureApi = (params) => {
  const id = params.params;
  return axiosClient.delete(`/investment-holding/extension/delete/${id}`);
};
const getInterestRateApi = (params) => {
  const investmentProductsId = params.params;
  return axiosClient.get(`/investment-holding/interestRate?investmentHoldingProductId=${investmentProductsId}`);
};
const getBenefitApi = (params) => {
  const investmentProductsId = params;
  return axiosClient.get(`/investment-holding/extension`, {
    params: investmentProductsId
  });
};
const createBenefitApi = (params) => {
  return axiosClient.post(`/investment-holding/extension/create`, params);
};
const deleteBenefitApi = (params) => {
  const id = params.params;
  return axiosClient.delete(`/investment-holding/extension/delete/${id}`);
};
const getFormReveiceInterestApi = (params) => {
  const investmentProductsId = params;
  return axiosClient.get(`/investment-holding/extension`, {
    params: investmentProductsId
  });
};

const createFormReveiceInterestApi = (params) => {
  return axiosClient.post(`/investment-holding/extension/create`, params);
};

const getInvestmentMethodApi = (params) => {
  const investmentProductsId = params;
  return axiosClient.get(`/investment-holding/extension`, {
    params: investmentProductsId
  });
};
const createInvestmentMethodApi = (params) => {
  return axiosClient.post(`/investment-holding/extension/create`, params);
};
const deleteInvestmentMethodApi = (params) => {
  const id = params.params;
  return axiosClient.delete(`/investment-holding/extension/delete/${id}`);
};
const getAccountInvestmentHoldingsApi = (params) => {
  const investmentAccount = params;
  return axiosClient.get(`/investment-holding/investmentAccount`, {
    params: investmentAccount
  });
};
const getInvestmentLVHoldingsApi = (params) => {
  const investmentAccount = params;
  return axiosClient.get(`/investment-holding/customersAreInvesting`, {
    params: investmentAccount
  });
};
const getInvestmentHVHoldingsApi = (params) => {
  const investmentAccount = params;
  return axiosClient.get(`/investment-holding/customersAreInvesting`, {
    params: investmentAccount
  });
};
const getInvestmentLVHoldingsDHApi = (params) => {
  const QueryString = `/investment-holding/customersDueForPayment?investmentHoldingProductId=${
    params.investmentHoldingProductId
  }&pageSize=${params.pageSize}&pageNumber=${params.pageNumber}&status=${params.status}${
    params.startDate ? `&startDate=${params.startDate}&endDate=${params.endDate}` : ''
  }`;
  return axiosClient.get(QueryString);
};

const getTransactionManagementApi = (params) => {
  const transactionManagement = params;
  return axiosClient.get(`transaction-management`, {
    params: transactionManagement,
    timeout: 50000
  });
};

const getInvestmentLVHoldingsTHApi = (params) => {
  const investmentAccount = params;
  return axiosClient.get(`/investment-holding/customersPayOffEarly`, {
    params: investmentAccount
  });
};
const getInvestmentHVHoldingsTHApi = (params) => {
  const investmentAccount = params;
  return axiosClient.get(`/investment-holding/customersPayOffEarly`, {
    params: investmentAccount
  });
};

const getVnfiteCodeApi = (params) => {
  // const vnfiteCode = params
  return axiosClient.get(`/investment-holding/getInfoByVnfCode?vnfCode=${params}`);
};

const getInterestRatePeriodApi = (params) => {
  return axiosClient.get(`/investment-holding/interestRate?investmentHoldingProductId=${params}`);
};

const getFormOfInterestAndMaturityMethodApi = (params) => {
  return axiosClient.get(`/investment-holding/getFormOfInterestAndMaturityMethodByProductId?productId=${params}`);
};
const investmentLVApi = (payload) => {
  return axiosClient.post(`/investment-holding/userInvestmentInfo/${payload.id}`, payload.params);
};

const addInvestmentHoldingsApi = (params) => {
  return axiosClient1.post(`/investment-holding/product/create`, params);
};

const deleteInvestmentHoldingsApi = (params) => {
  const id = params.params;
  return axiosClient.delete(`/investment-holding/product/delete/${id}`);
};

const getGoldFortuneListApi = (params) => {
  const investmentAccount = params;
  return axiosClient.get(`/investment-holding/customersAreInvesting`, {
    params: investmentAccount
  });
};
const addInterestRateInvestApi = (params) => {
  // const dataInterestRateInvestment = params;
  return axiosClient.post(`/investment-holding/interestRate/create`, params);
};

const releaseOrUnReleaseProductApi = (params) => {
  const releaseOrUnReleaseProductId = params.params;
  return axiosClient.put(`/investment-holding/product/releaseOrUnReleaseProduct/${releaseOrUnReleaseProductId}`);
};

const deleteInterestRateInvestApi = (params) => {
  const deleteInterestRateInvestId = params.params;
  return axiosClient.delete(`/investment-holding/interestRate/delete/${deleteInterestRateInvestId}`);
};

const getAllFormInterestApi = (id) => {
  if (id) {
    return axiosClient.get(`/investment-holding/getAllFormOfInterest/${id}`);
  }
  return axiosClient.get(`/investment-holding/getAllFormOfInterest`);
};

const getAllMaturityMethodApi = (id) => {
  if (id) {
    return axiosClient.get(`/investment-holding/getAllMaturityMethod/${id}`);
  }
  return axiosClient.get(`/investment-holding/getAllMaturityMethod`);
};

const addFormOfInterestForProductApi = (data) => {
  return axiosClient.post('/investment-holding/addFormOfInterestForProduct', data);
};

const addMaturityForProductApi = (data) => {
  return axiosClient.post('/investment-holding/addMaturityMethodForProduct', data);
};

const updateFormOfInterestForProductApi = (id) => {
  const idProduct = localStorage.getItem('ID');
  return axiosClient.delete(`/investment-holding/deleteFormOfInterestForProduct/${id}?productId=${idProduct}`);
};

const updateMaturityForProductApi = (id) => {
  const idProduct = localStorage.getItem('ID');
  return axiosClient.delete(`/investment-holding/deleteMaturityMethodForProduct/${id}?productId=${idProduct}`);
};

const getListUserAreInvestApi = (params) => {
  const investmentAccount = params;
  return axiosClient.get(`api/v2/cms/investment-holding/customersAreInvesting`, {
    params: investmentAccount
  });
};

const addInvestmentHoldingsProductApi = (params) => {
  const paramsData = params.data;
  const investmentHoldingsId = params.id;
  return axiosClient.post(`api/v2/cms/investment-holding/userInvestmentInfo/${investmentHoldingsId}`, paramsData);
};
const getDetailProductApi = (id) => {
  return axiosClient.get(`investment-holding/product/${id}`);
};

const updateInvestmentProductApi = (params) => {
  return axiosClient.put(`investment-holding/product/update/${params.id}`, params.body, {
    headers: {
      'Content-type': 'multipart/form-data',
      transactionId: new Date().getTime().toString()
    }
  });
};

const getAllInvestPaymentsApi = () => {
  return axiosClient.get('invest-payment/get-all');
};
export {
  getAllInvestPaymentsApi,
  getInvestmentProductApi,
  getConditionApi,
  createConditionApi,
  deleteConditionApi,
  conditionContentApi,
  getFeatureApi,
  createFeatureApi,
  deleteFeatureApi,
  getInterestRateApi,
  getConditionUpdateApi,
  getBenefitApi,
  createBenefitApi,
  deleteBenefitApi,
  getFormReveiceInterestApi,
  createFormReveiceInterestApi,
  getInvestmentMethodApi,
  createInvestmentMethodApi,
  deleteInvestmentMethodApi,
  getAccountInvestmentHoldingsApi,
  getInvestmentLVHoldingsApi,
  getInvestmentHVHoldingsApi,
  getInvestmentLVHoldingsDHApi,
  getTransactionManagementApi,
  getInvestmentLVHoldingsTHApi,
  getInvestmentHVHoldingsTHApi,
  getVnfiteCodeApi,
  getInterestRatePeriodApi,
  getFormOfInterestAndMaturityMethodApi,
  investmentLVApi,
  addInvestmentHoldingsApi,
  deleteInvestmentHoldingsApi,
  getGoldFortuneListApi,
  addInterestRateInvestApi,
  releaseOrUnReleaseProductApi,
  deleteInterestRateInvestApi,
  getAllFormInterestApi,
  getAllMaturityMethodApi,
  addFormOfInterestForProductApi,
  addMaturityForProductApi,
  updateFormOfInterestForProductApi,
  updateMaturityForProductApi,
  getListUserAreInvestApi,
  addInvestmentHoldingsProductApi,
  getDetailProductApi,
  updateInvestmentProductApi
};
