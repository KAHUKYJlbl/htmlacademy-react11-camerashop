import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { CartCamera, RatedCamera } from '../../../entities/camera';
import { postOrder } from '../../../features/post-order';

type InitialState = {
  cartList: CartCamera[];
}

const initialState: InitialState = {
  cartList: [],
};

export const cartSlice = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    cartItemAdd: (state, action: PayloadAction<RatedCamera>) => {
      if (!state.cartList.some((item) => item.camera.id === action.payload.id)) {
        state.cartList = [...state.cartList, {camera: action.payload, quantity: 1}];
      }
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
        state.cartList = [];
      });
  }
});

export const { cartItemAdd, cartItemRemove, cartItemSetQuantity } = cartSlice.actions;
