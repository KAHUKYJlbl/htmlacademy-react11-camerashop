import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { CartCamera, RatedCamera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';

type InitialState = {
  cartUploadingStatus: FetchStatus;
  cartList: CartCamera[];
}

const initialState: InitialState = {
  cartUploadingStatus: FetchStatus.Idle,
  cartList: [],
};

export const cartSlice = createSlice({
  name: NameSpace.AddCart,
  initialState,
  reducers: {
    cartClear: (state) => {
      state.cartList = [];
    },
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
});

export const { cartClear, cartItemAdd, cartItemRemove, cartItemSetQuantity } = cartSlice.actions;
