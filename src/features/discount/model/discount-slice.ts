import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';

import { checkDiscount } from './api-actions/check-discount';

type InitialState = {
  discount: number;
  discountStatus: FetchStatus;
  checkDiscountLoadingStatus: FetchStatus;
}

const initialState: InitialState = {
  discount: 0,
  discountStatus: FetchStatus.Idle,
  checkDiscountLoadingStatus: FetchStatus.Idle,
};

export const discountSlice = createSlice({
  name: NameSpace.Discount,
  initialState,
  reducers: {
    setDiscountStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.discountStatus = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkDiscount.fulfilled, (state, action) => {
        if (action.payload === '0') {
          state.discountStatus = FetchStatus.Failed;
        } else {
          state.discountStatus = FetchStatus.Success;
          state.discount = +action.payload / 100;
        }

        state.checkDiscountLoadingStatus = FetchStatus.Success;
      })
      .addCase(checkDiscount.pending, (state) => {
        state.checkDiscountLoadingStatus = FetchStatus.Pending;
        state.discountStatus = FetchStatus.Pending;
      })
      .addCase(checkDiscount.rejected, (state) => {
        state.checkDiscountLoadingStatus = FetchStatus.Failed;
      });
  }
});

export const { setDiscountStatus } = discountSlice.actions;
