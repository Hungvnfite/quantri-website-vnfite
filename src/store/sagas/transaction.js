import { put, call, takeLatest } from 'redux-saga/effects';
import { transactionRechargeApproveRequestApi, transactionWithdrawApproveRequestApi } from '~/api/transaction';
import {
  transactionRechargeApproveRequest,
  transactionRechargeApproveSuccess,
  transactionRechargeApproveFail,
  transactionWithdrawApproveSuccess,
  transactionWithdrawApproveFail,
  transactionWithdrawApproveRequest
} from '~/store/slices/rootAction';

function* transactionRechargeApproveRequestSaga(action) {
  try {
    const data = yield call(transactionRechargeApproveRequestApi, action.payload);
    if (data) {
      yield put(transactionRechargeApproveSuccess(data));
    }
  } catch (error) {
    yield put(transactionRechargeApproveFail(error?.message || 'duyệt nạp tiền thất bại'));
  }
}
function* transactionWithdrawApproveRequestSaga(action) {
  try {
    const data = yield call(transactionWithdrawApproveRequestApi, action.payload);
    if (data) {
      yield put(transactionWithdrawApproveSuccess(data));
    }
  } catch (error) {
    yield put(transactionWithdrawApproveFail(error?.message || 'duyệt rút tiền thất bại'));
  }
}

export default function* watchTransactionRechargeApprove() {
  yield takeLatest([transactionRechargeApproveRequest.type], transactionRechargeApproveRequestSaga);
  yield takeLatest([transactionWithdrawApproveRequest.type], transactionWithdrawApproveRequestSaga);
}
