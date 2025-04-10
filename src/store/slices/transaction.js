import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import dispatchToast from '~/handlers/toast';

const initialState = {
  dataTransactionRecharge: [],
  loading: false
};

export const transaction = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    // withdrawLoading:(state)=>{
    //   return{
    //     ...state,
    //     loading:actions.payload
    //   }
    // },
    transactionRechargeApproveRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    transactionRechargeApproveSuccess: (state, action) => {
      if (action.payload.result.isOK) {
        swal('Thành công!', 'Bạn đã duyệt thành công!', 'success').then(() => {
          window.location.reload();
        });
      } else {
        swal(action.payload.result.responseCode).then(() => {
          window.location.reload();
        });
      }
    },
    transactionRechargeApproveFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    transactionWithdrawApproveRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    transactionWithdrawApproveSuccess: (state, action) => {
      if (action.payload.result.isOK) {
        swal('Thành công!', 'Bạn đã duyệt thành công!', 'success').then(() => {
          window.location.reload();
        });
      } else {
        swal(action.payload.result.responseMessage).then(() => {
          window.location.reload();
        });
      }
    },
    transactionWithdrawApproveFail: (_, action) => {
      dispatchToast('error', action.payload);
    },

    rejectRechargeApproveSuccess: (state, action) => {
      'từ chôis nạp tiền ', action.payload;
      if (action.payload.result.isOK) {
        swal('Thành công!', 'Bạn đã từ chối !', 'success').then(() => {
          window.location.reload();
        });
      } else {
        swal(action.payload.result.responseCode);
      }
    }
  }
});

export const {
  transactionRechargeApproveRequest,
  transactionRechargeApproveSuccess,
  transactionRechargeApproveFail,
  transactionWithdrawApproveRequest,
  transactionWithdrawApproveSuccess,
  transactionWithdrawApproveFail,
  rejectRechargeApproveSuccess
  // withdrawLoading
} = transaction.actions;

export default transaction.reducer;
