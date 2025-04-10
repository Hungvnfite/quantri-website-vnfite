import { put, call, takeLatest } from 'redux-saga/effects';
import {
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
  getFeatureSuccess,
  getFeatureFail,
  createFeatureRequest,
  createFeatureSuccess,
  createFeatureFail,
  deleteFeatureRequest,
  deleteFeatureFail,
  deleteFeatureSuccess,
  getInterestRateRequest,
  getInterestRateSuccess,
  getInterestRateFail,
  conditionUpdateRequest,
  conditionUpdateFail,
  conditionUpdateSuccess,
  getBenefitRequest,
  getBenefitSuccess,
  getBenefitFail,
  createBenefitRequest,
  createBenefitSuccess,
  createBenefitFail,
  deleteBenefitRequest,
  deleteBenefitSuccess,
  deleteBenefitFail,
  getFormReveiceInterestFail,
  getFormReveiceInterestRequest,
  getFormReveiceInterestSuccess,
  createFormReveiceInterestRequest,
  createFormReveiceInterestFail,
  createFormReveiceInterestSuccess,
  getInvestmentMethodFail,
  getInvestmentMethodRequest,
  getInvestmentMethodSuccess,
  createInvestmentMethodRequest,
  createInvestmentMethodFail,
  createInvestmentMethodSuccess,
  deleteInvestmentMethodRequest,
  deleteInvestmentMethodSuccess,
  deleteInvestmentMethodFail,
  getAccountInvestmentHoldingsFail,
  getAccountInvestmentHoldingsRequest,
  getAccountInvestmentHoldingsSuccess,
  getInvestmentLVHoldingsFail,
  getInvestmentLVHoldingsRequest,
  getInvestmentLVHoldingsSuccess,
  getInvestmentHVHoldingsFail,
  getInvestmentHVHoldingsRequest,
  getInvestmentHVHoldingsSuccess,
  getInvestmentLVHoldingsDHRequest,
  getInvestmentLVHoldingsDHSuccess,
  getInvestmentLVHoldingsDHFail,
  getTransactionManagementSuccess,
  getTransactionManagementFail,
  getTransactionManagementRequest,
  getInvestmentLVHoldingsTHRequest,
  getInvestmentLVHoldingsTHFail,
  getInvestmentLVHoldingsTHSuccess,
  getInvestmentHVHoldingsTHFail,
  getInvestmentHVHoldingsTHRequest,
  getInvestmentHVHoldingsTHSuccess,
  getVnfiteCodeSuccess,
  getVnfiteCodeFail,
  getVnfiteCodeRequest,
  getInterestRatePeriodRequest,
  getInterestRatePeriodFail,
  getInterestRatePeriodSuccess,
  getFormOfInterestAndMaturityMethodRequest,
  getFormOfInterestAndMaturityMethodFail,
  getFormOfInterestAndMaturityMethodSuccess,
  investmentLVRequest,
  addInvestmentHoldingsRequest,
  addInvestmentHoldingsSuccess,
  addInvestmentHoldingsFail,
  deleteInvestmentHoldingsRequest,
  deleteInvestmentHoldingsSuccess,
  deleteInvestmentHoldingsFail
} from '../slices/holdingTrading.js';
import {
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
  deleteInvestmentHoldingsApi
} from '../../api/holdingTrading';
import dispatchToast from '~/handlers/toast';
import swal from 'sweetalert';
function* requestHoldingTradingSaga(action) {
  try {
    const dataHoldingTrading = yield call(getInvestmentProductApi, action.payload);
    yield put(
      investmentProductSuccess({
        holdingTrading: dataHoldingTrading
      })
    );
  } catch (error) {
    yield put(investmentProductFail(error?.message || 'Get all investmentProduct failed!'));
  }
}
function* requestConditionSaga(action) {
  try {
    const dataGetCondition = yield call(getConditionApi, action.payload);

    yield put(
      getConditionSuccess({
        dataGetCondition: dataGetCondition.data.extensions
      })
    );
  } catch (error) {
    yield put(getConditionFail(error?.message || 'Get all investmentProduct failed!'));
  }
}
function* requestConditionUpdateSaga(action) {
  try {
    const dataGetConditionUpdate = yield call(getConditionUpdateApi, action.payload);

    yield put(
      conditionUpdateSuccess({
        dataGetConditionUpdate: dataGetConditionUpdate.data.extensions
      })
    );
  } catch (error) {
    yield put(conditionUpdateFail(error?.message || 'Update failed!'));
  }
}
function* createConditionSaga(action) {
  try {
    const dataCreateCondition = yield call(createConditionApi, action.payload);

    yield put(
      createConditionSuccess({
        dataCreateCondition: dataCreateCondition
      })
    );
  } catch (error) {
    yield put(createConditionFail(error?.message || 'Create condition failed !'));
  }
}
function* deleteConditonSaga(action) {
  try {
    const dataDeleteCondition = yield call(deleteConditionApi, action.payload);
    yield put(
      deleteConditionSuccess({
        dataDeleteCondition: dataDeleteCondition
      })
    );
  } catch (error) {
    yield put(deleteConditionFail(error?.message || 'Delete condition failed !'));
  }
}
function* conditionContentSaga(action) {
  try {
    const dataConditionContent = yield call(conditionContentApi, action.payload);
    yield put(
      conditionContentSuccess({
        dataConditionContent: dataConditionContent
      })
    );
  } catch (error) {
    yield put(conditionContentFail(error?.message || 'Delete condition failed !'));
  }
}
function* requestFeatureSaga(action) {
  try {
    const dataGetFeature = yield call(getFeatureApi, action.payload);

    yield put(
      getFeatureSuccess({
        dataGetFeature: dataGetFeature.data.extensions
      })
    );
  } catch (error) {
    yield put(getFeatureFail(error?.message || 'Get all investmentProduct failed!'));
  }
}
function* createFeatureSaga(action) {
  try {
    const dataCreateFeature = yield call(createFeatureApi, action.payload);
    yield put(
      createFeatureSuccess({
        dataCreateFeature: dataCreateFeature
      })
    );
  } catch (error) {
    yield put(createFeatureFail(error?.message || 'Create feature failed !'));
  }
}
function* deleteFeatureSaga(action) {
  try {
    const dataDeleteFeature = yield call(deleteFeatureApi, action.payload);
    yield put(
      deleteFeatureSuccess({
        dataDeleteFeature: dataDeleteFeature
      })
    );
  } catch (error) {
    yield put(deleteFeatureFail(error?.message || 'Delete Feature failed !'));
  }
}
function* requestInterestRateSaga(action) {
  try {
    const dataGetInterestRate = yield call(getInterestRateApi, action.payload);
    yield put(
      getInterestRateSuccess({
        dataGetInterestRate: dataGetInterestRate.data.interestRate
      })
    );
  } catch (error) {
    yield put(getInterestRateFail(error?.message || 'Get all InterestRate failed!'));
  }
}
function* requestBenefitSaga(action) {
  try {
    const dataGetBenefit = yield call(getBenefitApi, action.payload);
    yield put(
      getBenefitSuccess({
        dataGetBenefit: dataGetBenefit.data.extensions
      })
    );
  } catch (error) {
    yield put(getBenefitFail(error?.message || 'Get all investmentProduct failed!'));
  }
}
function* createBenefitSaga(action) {
  try {
    const dataCreateBenefit = yield call(createBenefitApi, action.payload);
    yield put(
      createBenefitSuccess({
        dataCreateBenefit: dataCreateBenefit
      })
    );
  } catch (error) {
    yield put(createBenefitFail(error?.message || 'Create feature failed !'));
  }
}
function* deleteBenefitSaga(action) {
  try {
    const dataDeleteBenefit = yield call(deleteBenefitApi, action.payload);
    yield put(
      deleteBenefitSuccess({
        dataDeleteBenefit: dataDeleteBenefit
      })
    );
  } catch (error) {
    yield put(deleteBenefitFail(error?.message || 'Delete Feature failed !'));
  }
}
function* requestFormReveiceInterestSaga(action) {
  try {
    const dataGetFormReveiceInterest = yield call(getFormReveiceInterestApi, action.payload);
    yield put(
      getFormReveiceInterestSuccess({
        dataGetFormReveiceInterest: dataGetFormReveiceInterest.data.extensions
      })
    );
  } catch (error) {
    yield put(getFormReveiceInterestFail(error?.message || 'Get all investmentProduct failed!'));
  }
}
function* createFormReveiceInterestSaga(action) {
  try {
    const dataCreateFormReveiceInterest = yield call(createFormReveiceInterestApi, action.payload);
    yield put(
      createFormReveiceInterestSuccess({
        dataCreateFormReveiceInterest: dataCreateFormReveiceInterest.data
      })
    );
  } catch (error) {
    yield put(createFormReveiceInterestFail(error?.message || 'Create form reveice interest failed !'));
  }
}
function* requestInvestmentMethodSaga(action) {
  try {
    const dataGetInvestmentMethod = yield call(getInvestmentMethodApi, action.payload);

    yield put(
      getInvestmentMethodSuccess({
        dataGetInvestmentMethod: dataGetInvestmentMethod.data.extensions
      })
    );
  } catch (error) {
    yield put(getInvestmentMethodFail(error?.message || 'Get all investmentProduct failed!'));
  }
}
function* createInvestmentMethodSaga(action) {
  try {
    const dataCreateInvestmentMethod = yield call(createInvestmentMethodApi, action.payload);
    yield put(
      createInvestmentMethodSuccess({
        dataCreateInvestmentMethod: dataCreateInvestmentMethod.data
      })
    );
  } catch (error) {
    yield put(createInvestmentMethodFail(error?.message || 'Create  investment method failed !'));
  }
}
function* deleteInvestmentMethodSaga(action) {
  try {
    const dataDeleteInvestmentMethod = yield call(deleteInvestmentMethodApi, action.payload);
    yield put(
      deleteInvestmentMethodSuccess({
        dataDeleteInvestmentMethod: dataDeleteInvestmentMethod
      })
    );
  } catch (error) {
    yield put(deleteInvestmentMethodFail(error?.message || 'Delete condition failed !'));
  }
}
function* requestAccountInvestmentHoldingsSaga(action) {
  try {
    const dataGetAccountInvestmentHoldings = yield call(getAccountInvestmentHoldingsApi, action.payload);
    yield put(
      getAccountInvestmentHoldingsSuccess({
        dataGetAccountInvestmentHoldings: dataGetAccountInvestmentHoldings.data.investmentAccountDtos
      })
    );
  } catch (error) {
    yield put(getAccountInvestmentHoldingsFail(error?.message || 'Get all investmentProduct failed!'));
  }
}
function* requestInvestmentLVHoldingsSaga(action) {
  try {
    const dataGetInvestmentLVHoldings = yield call(getInvestmentLVHoldingsApi, action.payload);
    yield put(
      getInvestmentLVHoldingsSuccess({
        dataGetInvestmentLVHoldings: dataGetInvestmentLVHoldings.data?.customersAreInvestingDtos ?? [],
        totalRecords: dataGetInvestmentLVHoldings?.data?.totalRecords
      })
    );
  } catch (error) {
    yield put(getInvestmentLVHoldingsFail(error?.message || 'Get all investmentProduct failed!'));
  }
}
function* requestInvestmentHVHoldingsSaga(action) {
  try {
    const dataGetInvestmentHVHoldings = yield call(getInvestmentHVHoldingsApi, action.payload);

    yield put(
      getInvestmentHVHoldingsSuccess({
        dataGetInvestmentHVHoldings: dataGetInvestmentHVHoldings.data.customersAreInvestingDtos
      })
    );
  } catch (error) {
    yield put(getInvestmentHVHoldingsFail(error?.message || 'Get all HV failed!'));
  }
}
function* requestInvestmentLVHoldingsDHSaga(action) {
  try {
    const dataGetInvestmentLVHoldingsDH = yield call(getInvestmentLVHoldingsDHApi, action.payload);
    if (dataGetInvestmentLVHoldingsDH.result.isOK) {
      yield put(
        getInvestmentLVHoldingsDHSuccess({
          dataGetInvestmentLVHoldingsDH: dataGetInvestmentLVHoldingsDH.data.customersAreInvestingDtos,
          totalRecords: dataGetInvestmentLVHoldingsDH.data.totalRecords
        })
      );
    } else {
      // dispatchToast('warning', 'Lấy danh sách tất toán thất bại');
      getInvestmentLVHoldingsDHSuccess({
        dataGetInvestmentLVHoldingsDH: [],
        totalRecords: 0
      });
    }
  } catch (error) {
    dispatchToast('warning', 'Lấy danh sách tất toán thất bại');
    yield put(getInvestmentLVHoldingsDHFail(error?.message || 'Lấy danh sách tất toán thất bại'));
  }
}
function* requestTransactionManagementSaga(action) {
  try {
    const dataGetTransactionManagement = yield call(getTransactionManagementApi, action.payload);
    if (dataGetInvestmentLVHoldingsTH?.result.isOK) {
      yield put(
        getTransactionManagementSuccess({
          dataGetTransactionManagemet: dataGetTransactionManagement.data || []
        })
      );
    } else {
      yield put(
        getTransactionManagementSuccess({
          dataGetTransactionManagemet: dataGetTransactionManagement.data || []
        })
      );
    }
  } catch (error) {
    yield put(getTransactionManagementFail(error?.message || 'Get TransactionManagement failed!'));
  }
}
function* requestInvestmentLVHoldingsTHSaga(action) {
  try {
    const dataGetInvestmentLVHoldingsTH = yield call(getInvestmentLVHoldingsTHApi, action.payload);
    yield put(
      getInvestmentLVHoldingsTHSuccess({
        dataGetInvestmentLVHoldingsTH: dataGetInvestmentLVHoldingsTH.data.customersPayOffEarlyDtos
      })
    );
  } catch (error) {
    yield put(getInvestmentLVHoldingsTHFail(error?.message || 'Get all investmentProduct failed!'));
  }
}
function* requestInvestmentHVHoldingsTHSaga(action) {
  try {
    const dataGetInvestmentHVHoldingsTH = yield call(getInvestmentHVHoldingsTHApi, action.payload);
    yield put(
      getInvestmentHVHoldingsTHSuccess({
        dataGetInvestmentHVHoldingsTH: dataGetInvestmentHVHoldingsTH.data.customersAreInvestingDtos
      })
    );
  } catch (error) {
    yield put(getInvestmentHVHoldingsTHFail(error?.message || 'Get đầu tư trước hạn failed!'));
  }
}

function* requestGetVnfiteCodeSaga(action) {
  try {
    const dataGetVnfiteCode = yield call(getVnfiteCodeApi, action.payload);
    if (dataGetVnfiteCode?.result.isOK) {
      yield put(
        getVnfiteCodeSuccess({
          dataGetVnfiteCode: dataGetVnfiteCode.data
        })
      );
    } else {
      yield put(getVnfiteCodeFail('Không thấy thông tin nhà đầu tư!'));
    }
  } catch (error) {
    yield put(getVnfiteCodeFail('Không thấy thông tin nhà đầu tư!'));
  }
}
// function* requestGetVnfiteCodeSaga(action) {
//   try {
//     const dataGetVnfiteCode = yield call(getVnfiteCodeApi, action.payload);
//     if (dataGetVnfiteCode?.result.isOK) {
//       const dataGetVnfiteCode = yield call(getVnfiteCodeApi, action.payload.userProductId)

//       yield put(
//         getVnfiteCodeSuccess({
//           dataGetVnfiteCode: dataGetVnfiteCode.data
//         })
//       );
//     } else {
//       yield put(getVnfiteCodeFail('Không thấy thông tin nhà đầu tư!'));
//     }
//   } catch (error) {
//     yield put(getVnfiteCodeFail('Không thấy thông tin nhà đầu tư!'));
//   }
// }

function* requestGetInterestRatePeriodSaga(action) {
  try {
    const dataGetInterestRatePeriod = yield call(getInterestRatePeriodApi, action.payload);
    yield put(
      getInterestRatePeriodSuccess({
        dataGetInterestRatePeriod: dataGetInterestRatePeriod.data.interestRate
      })
    );
  } catch (error) {
    yield put(getInterestRatePeriodFail(error?.message || 'Vndite Code failed!'));
  }
}

function* requestGetFormOfInterestAndMaturityMethodSaga(action) {
  try {
    const dataGetFormOfInterestAndMaturityMethod = yield call(getFormOfInterestAndMaturityMethodApi, action.payload);

    yield put(
      getFormOfInterestAndMaturityMethodSuccess({
        dataGetFormOfInterestAndMaturityMethod: dataGetFormOfInterestAndMaturityMethod.data
      })
    );
  } catch (error) {
    yield put(getFormOfInterestAndMaturityMethodFail(error?.message || 'Vndite Code failed!'));
  }
}

function* requestInvestmentLVSaga(action) {
  try {
    const dataInvestmentLV = yield call(investmentLVApi, action.payload);
    if (dataInvestmentLV.result.isOK) {
      // dispatchToast('success', 'Tạo khoản đầu tư thành công');
      swal('Thành công!', 'Bạn đã tạo khoản đầu tư thành công!', 'success').then(() => {
        window.location.reload();
        // window.location = '/dau-tu-loc-vang';
      });
    } else {
      dispatchToast('error', dataInvestmentLV?.result?.responseMessage || 'Tạo khoản đầu tư thất bại');
    }
  } catch (error) {
    dispatchToast('error', 'Tạo khoản đầu tư thất bại');
  }
}

function* requestAddInvestmentHoldingsSaga(action) {
  try {
    const dataAddInvestmentHoldings = yield call(addInvestmentHoldingsApi, action.payload);
    yield put(
      addInvestmentHoldingsSuccess({
        dataAddInvestmentHoldings: dataAddInvestmentHoldings
      })
    );
  } catch (error) {
    yield put(addInvestmentHoldingsFail(error?.message || 'Vndite Code failed!'));
  }
}
function* requestDeleteInvestmentHoldingsSaga(action) {
  try {
    const data = yield call(deleteInvestmentHoldingsApi, action.payload);

    yield put(
      deleteInvestmentHoldingsSuccess({
        data: data
      })
    );
  } catch (error) {
    yield put(deleteInvestmentHoldingsFail(error?.message || 'delte investment holdings failed!'));
  }
}
export default function* watchHoldingTrading() {
  yield takeLatest([investmentProductRequest.type], requestHoldingTradingSaga);
  yield takeLatest([getConditionRequest.type], requestConditionSaga);
  yield takeLatest([createConditionRequest.type], createConditionSaga);
  yield takeLatest([deleteConditionRequest.type], deleteConditonSaga);
  yield takeLatest([conditionContentRequest.type], conditionContentSaga);
  yield takeLatest([conditionUpdateRequest.type], requestConditionUpdateSaga);
  yield takeLatest([getFeatureRequest.type], requestFeatureSaga);
  yield takeLatest([createFeatureRequest.type], createFeatureSaga);
  yield takeLatest([deleteFeatureRequest.type], deleteFeatureSaga);
  yield takeLatest([getInterestRateRequest.type], requestInterestRateSaga);
  yield takeLatest([getBenefitRequest.type], requestBenefitSaga);
  yield takeLatest([createBenefitRequest.type], createBenefitSaga);
  yield takeLatest([deleteBenefitRequest.type], deleteBenefitSaga);
  yield takeLatest([getFormReveiceInterestRequest.type], requestFormReveiceInterestSaga);
  yield takeLatest([createFormReveiceInterestRequest.type], createFormReveiceInterestSaga);
  yield takeLatest([getInvestmentMethodRequest.type], requestInvestmentMethodSaga);
  yield takeLatest([createInvestmentMethodRequest.type], createInvestmentMethodSaga);
  yield takeLatest([deleteInvestmentMethodRequest.type], deleteInvestmentMethodSaga);
  yield takeLatest([getAccountInvestmentHoldingsRequest.type], requestAccountInvestmentHoldingsSaga);
  yield takeLatest([getInvestmentLVHoldingsRequest.type], requestInvestmentLVHoldingsSaga);
  yield takeLatest([getInvestmentHVHoldingsRequest.type], requestInvestmentHVHoldingsSaga);
  yield takeLatest([getInvestmentLVHoldingsDHRequest.type], requestInvestmentLVHoldingsDHSaga);
  yield takeLatest([getTransactionManagementRequest.type], requestTransactionManagementSaga);
  yield takeLatest([getInvestmentLVHoldingsTHRequest.type], requestInvestmentLVHoldingsTHSaga);
  yield takeLatest([getInvestmentHVHoldingsTHRequest.type], requestInvestmentHVHoldingsTHSaga);
  yield takeLatest([getVnfiteCodeRequest.type], requestGetVnfiteCodeSaga);
  yield takeLatest([getInterestRatePeriodRequest.type], requestGetInterestRatePeriodSaga);
  yield takeLatest([getFormOfInterestAndMaturityMethodRequest.type], requestGetFormOfInterestAndMaturityMethodSaga);
  yield takeLatest([investmentLVRequest.type], requestInvestmentLVSaga);
  yield takeLatest([addInvestmentHoldingsRequest.type], requestAddInvestmentHoldingsSaga);
  yield takeLatest([deleteInvestmentHoldingsRequest.type], requestDeleteInvestmentHoldingsSaga);
}
