import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { CartCamera, RatedCamera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { postOrder } from './api-actions/post-order';

type InitialState = {
  cartUploadingStatus: FetchStatus;
  cartList: CartCamera[];
}

const initialState: InitialState = {
  cartUploadingStatus: FetchStatus.Idle,
  cartList: [],
};

export const cartSlice = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    cartItemAdd: (state, action: PayloadAction<RatedCamera>) => {
      state.cartList = [{camera: action.payload, quantity: 1}, ...state.cartList];
    },
    cartItemRemove: (state, action: PayloadAction<RatedCamera>) => {
      state.cartList = state.cartList.filter((item) => item.camera.id !== action.payload.id);
    },
    cartItemSetQuantity: (state, action: PayloadAction<CartCamera>) => {
      state.cartList = [
        ...state.cartList.filter((item) => item.camera.id !== action.payload.camera.id),
        {camera: action.payload.camera, quantity: action.payload.quantity}
      ];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postOrder.fulfilled, (state) => {
        state.cartUploadingStatus = FetchStatus.Success;
        state.cartList = [];
      })
      .addCase(postOrder.pending, (state) => {
        state.cartUploadingStatus = FetchStatus.Pending;
      })
      .addCase(postOrder.rejected, (state) => {
        state.cartUploadingStatus = FetchStatus.Failed;
      });
  }
});

export const { cartItemAdd, cartItemRemove, cartItemSetQuantity } = cartSlice.actions;
