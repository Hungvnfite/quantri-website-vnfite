import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  totalRecords: 0,
  loading: false
};

export const agency = createSlice({
  name: 'agency',
  initialState,
  reducers: {
    agencyLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload
      };
    },
    getListAgencySuccess: (state, action) => {
      return {
        ...state,
        list: action.payload.list,
        totalRecords: action.payload.totalRecords || state.totalRecords,
        loading: false
      };
    }
  }
});

export const { getListAgencySuccess, agencyLoading } = agency.actions;

export default agency.reducer;
