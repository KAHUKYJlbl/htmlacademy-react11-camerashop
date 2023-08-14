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
    cartItemAdd: (state, action: PayloadAction<RatedCamera>) => {
      state.cartList = [{camera: action.payload, quantity: 1}, ...state.cartList];
    },
    cartItemRemove: (state, action: PayloadAction<RatedCamera>) => {
      state.cartList = state.cartList.filter((item) => item.camera.id !== action.payload.id);
    },
  },
});

export const { cartItemAdd, cartItemRemove } = cartSlice.actions;
