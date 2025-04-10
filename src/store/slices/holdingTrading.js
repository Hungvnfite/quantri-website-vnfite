import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';
import swal from 'sweetalert';
const initialState = {
  loading: true,
  holdingTrading: [],
  dataCondition: [],
  dataDeleteCondition: [],
  dataConditionContent: [],
  dataFeature: [],
  dataCreateFeature: [],
  dataDeleteFeature: [],
  dataInterestRate: [],
  dataBenefit: [],
  dataFormReveiceInterest: [],
  dataInvestmentMethod: [],
  dataInvestmentAccountHoldings: [],
  dataInvestmentLVHoldings: [],
  dataInvestmentHVHoldings: [],
  dataInvestmentHVHoldingsDH: [],
  dataTransactionManagement: [],
  dataInvestmentLVHoldingsTH: [],
  dataInvestmentHVHoldingsTH: [],
  dataGetVnfiteSuccess: [],
  dataGetInterestRatePeriod: [],
  dataGetFormOfInterestAndMaturityMethod: [],
  dataInvestmentLV: [],
  dataAddInvestmentHoldings: [],
  dataGetListDragonSuccess: [],
  dataAddInterestRateInvestSuccess: [],
  dataReleaseOrUnReleaseProductSuccess: [],
  dataInterestRateInvestSuccess: [],
  getListUserAreInvestSuccess: [],
  totalRecords: 0,
  dataGetVnfiteCode: null
};

export const HoldingTrading = createSlice({
  name: 'holdingTrading',
  initialState,
  reducers: {
    investmentProductRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    investmentProductSuccess: (state, action) => {
      if (action.payload.holdingTrading.result.isOK == true) {
        return {
          ...state,
          loading: false,
          holdingTrading: action.payload.holdingTrading.data.products
        };
      }
    },
    investmentProductFail: (_, action) => {
      dispatchToast('error', action.payload);
      return {
        loading: false
      };
    },
    getConditionRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getConditionSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataCondition: action.payload.dataGetCondition
      };
    },
    getConditionFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    createConditionRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    createConditionSuccess: (state, action) => {
      if (action.payload.dataCreateCondition.result.isOK) {
        swal('Thành công!', 'Bạn đã thêm thành công!', 'success').then(() => {
          window.location = '/quan-ly-bai-viet-dau-tu-holdings';
        });
      } else {
        swal(action.payload.dataCreateCondition.result.responseMessage);
      }
      state.dataCondition = action.payload.dataCreateCondion;
    },
    createConditionFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteConditionRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    deleteConditionSuccess: (state, action) => {
      if (action.payload.dataDeleteCondition.result.isOK) {
        swal('Thành công!', 'Bạn đã xóa thành công!', 'success').then(() => {
          window.location.reload();
        });
      }
    },
    deleteConditionFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    conditionContentRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    conditionContentSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataCondition: action.payload.dataConditionContent.data
      };
    },
    conditionContentFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    conditionUpdateRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    conditionUpdateSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataCondition: action.payload.dataConditionContent.data
      };
    },
    conditionUpdateFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    //
    getFeatureRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getFeatureSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataFeature: action.payload.dataGetFeature
      };
    },
    getFeatureFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    createFeatureRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    createFeatureSuccess: (state, action) => {
      if (action.payload.dataCreateFeature.result.isOK) {
        swal('Thành công!', 'Bạn đã thêm thành công!', 'success').then(() => {
          window.location = '/quan-ly-bai-viet-dau-tu-holdings';
          // window.location.reload();
        });
      } else {
        swal(action.payload.dataCreateFeature.result.responseMessage);
      }
    },
    createFeatureFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteFeatureRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    deleteFeatureSuccess: (state, action) => {
      if (action.payload.dataDeleteFeature.result.isOK) {
        swal('Thành công!', 'Bạn đã xóa thành công!', 'success').then(() => {
          window.location.reload();
        });
      }
    },
    deleteFeatureFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    getInterestRateRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getInterestRateSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataInterestRate: action.payload.dataGetInterestRate
      };
    },
    getInterestRateFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    //
    getBenefitRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getBenefitSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataBenefit: action.payload.dataGetBenefit
      };
    },
    getBenefitFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    //
    createBenefitRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    createBenefitSuccess: (state, action) => {
      if (action.payload.dataCreateBenefit.result.isOK) {
        swal('Thành công!', 'Bạn đã thêm thành công!', 'success').then(() => {
          window.location = '/quan-ly-bai-viet-dau-tu-holdings';
        });
      } else {
        swal(action.payload.dataCreateBenefit.result.responseMessage);
      }
    },
    createBenefitFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteBenefitRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    deleteBenefitSuccess: (state, action) => {
      if (action.payload.dataDeleteBenefit.result.isOK) {
        swal('Thành công!', 'Bạn đã xóa thành công!', 'success').then(() => {
          window.location.reload();
        });
      }
    },
    deleteBenefitFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    //
    getFormReveiceInterestRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getFormReveiceInterestSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataFormReveiceInterest: action.payload.dataGetFormReveiceInterest
      };
    },
    getFormReveiceInterestFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    //
    createFormReveiceInterestRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    createFormReveiceInterestSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataFormReveiceInterest: action.payload.dataCreateFormReveiceInterest
      };
    },
    createFormReveiceInterestFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    //
    getInvestmentMethodRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getInvestmentMethodSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataInvestmentMethod: action.payload.dataGetInvestmentMethod
      };
    },
    getInvestmentMethodFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    //
    getAccountInvestmentHoldingsRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getAccountInvestmentHoldingsSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataInvestmentAccountHoldings: action.payload.dataGetAccountInvestmentHoldings
      };
    },
    getAccountInvestmentHoldingsFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    //
    createInvestmentMethodRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    createInvestmentMethodSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataInvestmentMethod: action.payload.dataInvestmentMethod
      };
    },
    createInvestmentMethodFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteInvestmentMethodRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    deleteInvestmentMethodSuccess: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    deleteInvestmentMethodFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    //
    getInvestmentLVHoldingsRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getInvestmentLVHoldingsSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataInvestmentLVHoldings: action.payload.dataGetInvestmentLVHoldings,
        totalRecords: action.payload.totalRecords
      };
    },
    getInvestmentLVHoldingsFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    //
    getInvestmentHVHoldingsRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getInvestmentHVHoldingsSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataInvestmentHVHoldings: action.payload.dataGetInvestmentHVHoldings
      };
    },
    getInvestmentHVHoldingsFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    //
    getInvestmentLVHoldingsDHRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getInvestmentLVHoldingsDHSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        customersDueForPaymentDtos: action.payload.dataGetInvestmentLVHoldingsDH,
        totalRecords: action.payload.totalRecords
      };
    },
    getInvestmentLVHoldingsDHFail: (state) => {
      // dispatchToast('error', action.payload);
      return {
        ...state,
        loading: false,
        customersDueForPaymentDtos: []
      };
    },
    //
    getTransactionManagementRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getTransactionManagementSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        dataTransactionManagement: action.payload.dataGetTransactionManagemet
      };
    },
    getTransactionManagementFail: (state) => {
      // dispatchToast('error', action.payload);
      return {
        ...state,
        loading: false
      };
    },
    //
    getInvestmentLVHoldingsTHRequest: (state) => {
      return {
        ...state,
        loading: false
      };
    },
    getInvestmentLVHoldingsTHSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataInvestmentLVHoldingsTH: action.payload.dataGetInvestmentLVHoldingsTH
      };
    },
    getInvestmentLVHoldingsTHFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    //
    getInvestmentHVHoldingsTHRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getInvestmentHVHoldingsTHSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataInvestmentHVHoldingsTH: action.payload.dataGetInvestmentHVHoldingsTH
      };
    },
    getInvestmentHVHoldingsTHFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    //
    getVnfiteCodeRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getVnfiteCodeSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataGetVnfiteCode: action.payload.dataGetVnfiteCode
      };
    },
    getVnfiteCodeFail: (state, action) => {
      dispatchToast('error', action.payload);
      return {
        ...state,
        dataGetVnfiteCode: null
      };
    },

    getInterestRatePeriodRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getInterestRatePeriodSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataGetInterestRatePeriod: action.payload.dataGetInterestRatePeriod
      };
    },
    getInterestRatePeriodFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    getFormOfInterestAndMaturityMethodRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    getFormOfInterestAndMaturityMethodSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataGetFormOfInterestAndMaturityMethod: action.payload.dataGetFormOfInterestAndMaturityMethod
      };
    },
    getFormOfInterestAndMaturityMethodFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    investmentLVRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    investmentLVSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataInvestmentLV: action.payload
      };
    },
    investmentLVFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    addInvestmentHoldingsRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    addInvestmentHoldingsSuccess: (state, action) => {
      if (action.payload.dataAddInvestmentHoldings.result.isOK) {
        swal('Thành công!', 'Bạn đã thêm thành công!', 'success').then(() => {
          // window.location.reload();
          window.location = 'quan-ly-bai-viet-dau-tu-holdings';
        });
      } else {
        // swal(action.payload.dataAddInvestmentHoldings.result.responseMessage);
        // window.location = 'quan-ly-bai-viet-dau-tu-holdings'
        dispatchToast('error', 'Tạo sản phẩm đầu tư thất bại');
      }
      return {
        ...state,
        loading: true,
        dataAddInvestmentHoldings: action.payload
      };
    },
    addInvestmentHoldingsFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    deleteInvestmentHoldingsRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    deleteInvestmentHoldingsSuccess: (state, action) => {
      if (action.payload.data.result.isOK) {
        swal('Thành công!', 'Bạn đã xóa thành công!', 'success').then(() => {
          window.location.reload();
        });
      }
    },
    deleteInvestmentHoldingsFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    getListGoldenDragonSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataGetListDragonSuccess: action.payload.data.customersAreInvestingDtos
      };
    },
    addInterestRateInvestSuccess: (state, action) => {
      if (action.payload.result.isOK) {
        swal('Thành công!', 'Bạn đã thêm thành công!', 'success').then(() => {
          window.location = '/quan-ly-bai-viet-dau-tu-holdings';
        });
      } else {
        swal(action.payload.result.responseMessage);
      }
    },
    releaseOrUnReleaseProductSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataReleaseOrUnReleaseProductSuccess: action.payload.data
      };
    },

    deleteInterestRateInvestSuccess: (state, action) => {
      if (action.payload.result.isOK) {
        swal('Thành công!', 'Bạn đã xóa thành công!', 'success').then(() => {
          window.location.reload();
        });
      }
    },
    getListUserAreInvestSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        dataGetListUserAreInvestSuccess: action.payload.data.customersAreInvestingDtos
      };
    },

    addInvestmentHoldingsProductSuccess: (state, action) => {
      if (action.payload.result.isOK) {
        swal('Thành công!', 'Bạn đã đầu tư thành công!', 'success').then(() => {
          window.location.reload();
        });
      }
    }
  }
});

export const {
  investmentProductRequest,
  investmentProductSuccess,
  investmentProductFail,
  getConditionRequest,
  getConditionSuccess,
  getConditionFail,
  createConditionRequest,
  createConditionSuccess,
  createConditionFail,
  deleteConditionRequest,
  deleteConditionSuccess,
  deleteConditionFail,
  conditionContentRequest,
  conditionContentSuccess,
  conditionContentFail,
  getFeatureRequest,
  getFeatureFail,
  getFeatureSuccess,
  createFeatureRequest,
  createFeatureSuccess,
  createFeatureFail,
  deleteFeatureRequest,
  deleteFeatureSuccess,
  deleteFeatureFail,
  getInterestRateRequest,
  getInterestRateSuccess,
  getInterestRateFail,
  conditionUpdateRequest,
  conditionUpdateSuccess,
  conditionUpdateFail,
  getBenefitRequest,
  getBenefitSuccess,
  getBenefitFail,
  createBenefitRequest,
  createBenefitSuccess,
  createBenefitFail,
  deleteBenefitRequest,
  deleteBenefitSuccess,
  deleteBenefitFail,
  getFormReveiceInterestRequest,
  getFormReveiceInterestSuccess,
  getFormReveiceInterestFail,
  createFormReveiceInterestRequest,
  createFormReveiceInterestSuccess,
  createFormReveiceInterestFail,
  getInvestmentMethodRequest,
  getInvestmentMethodSuccess,
  getInvestmentMethodFail,
  createInvestmentMethodRequest,
  createInvestmentMethodSuccess,
  createInvestmentMethodFail,
  deleteInvestmentMethodFail,
  deleteInvestmentMethodRequest,
  deleteInvestmentMethodSuccess,
  getAccountInvestmentHoldingsRequest,
  getAccountInvestmentHoldingsSuccess,
  getAccountInvestmentHoldingsFail,
  getInvestmentLVHoldingsRequest,
  getInvestmentLVHoldingsSuccess,
  getInvestmentLVHoldingsFail,
  getInvestmentHVHoldingsFail,
  getInvestmentHVHoldingsRequest,
  getInvestmentHVHoldingsSuccess,
  getInvestmentLVHoldingsDHRequest,
  getInvestmentLVHoldingsDHFail,
  getInvestmentLVHoldingsDHSuccess,
  getTransactionManagementRequest,
  getTransactionManagementSuccess,
  getTransactionManagementFail,
  getInvestmentLVHoldingsTHRequest,
  getInvestmentLVHoldingsTHFail,
  getInvestmentLVHoldingsTHSuccess,
  getInvestmentHVHoldingsTHRequest,
  getInvestmentHVHoldingsTHFail,
  getInvestmentHVHoldingsTHSuccess,
  getVnfiteCodeRequest,
  getVnfiteCodeSuccess,
  getVnfiteCodeFail,
  getInterestRatePeriodRequest,
  getInterestRatePeriodSuccess,
  getInterestRatePeriodFail,
  getFormOfInterestAndMaturityMethodRequest,
  getFormOfInterestAndMaturityMethodSuccess,
  getFormOfInterestAndMaturityMethodFail,
  investmentLVRequest,
  investmentLVSuccess,
  investmentLVFail,
  addInvestmentHoldingsRequest,
  addInvestmentHoldingsSuccess,
  addInvestmentHoldingsFail,
  deleteInvestmentHoldingsRequest,
  deleteInvestmentHoldingsSuccess,
  deleteInvestmentHoldingsFail,

  getListGoldenDragonSuccess,
  addInterestRateInvestSuccess,
  releaseOrUnReleaseProductSuccess,
  deleteInterestRateInvestSuccess,
  getListUserAreInvestSuccess,
  addInvestmentHoldingsProductSuccess
} = HoldingTrading.actions;

export default HoldingTrading.reducer;
