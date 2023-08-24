import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { postOrder } from './api-actions/post-order';

type InitialState = {
  orderPostingStatus: FetchStatus;
  isOrderSuccessShown: boolean;
}

const initialState: InitialState = {
  orderPostingStatus: FetchStatus.Idle,
  isOrderSuccessShown: false,
};

export const postOrderSlice = createSlice({
  name: NameSpace.PostOrder,
  initialState,
  reducers: {
    showOrderSuccess: (state) => {
      state.isOrderSuccessShown = true;
    },
    hideOrderSuccess: (state) => {
      state.isOrderSuccessShown = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postOrder.fulfilled, (state) => {
        state.orderPostingStatus = FetchStatus.Success;
      })
      .addCase(postOrder.pending, (state) => {
        state.orderPostingStatus = FetchStatus.Pending;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderPostingStatus = FetchStatus.Failed;
      });
  }
});

export const { showOrderSuccess, hideOrderSuccess } = postOrderSlice.actions;
