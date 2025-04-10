import { all } from 'redux-saga/effects';
import watchAuthentication from './authentication';
import watchUsers from './users';
import watchNotification from './notification';
import watchHoldingTrading from './holdingTradings';
import watchTransactionRechargeApprove from './transaction';
export default function* rootSaga() {
  yield all([watchAuthentication(), watchUsers(), watchNotification(), watchHoldingTrading(), watchTransactionRechargeApprove()]);
}
