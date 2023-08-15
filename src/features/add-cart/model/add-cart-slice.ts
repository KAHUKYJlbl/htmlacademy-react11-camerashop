import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { RatedCamera } from '../../../entities/camera';

type InitialState = {
  isAddCartShown: boolean;
  isSuccessCartShown: boolean;
  isRemoveCartShown: boolean;
  currentCamera: RatedCamera | null;
}

const initialState: InitialState = {
  isAddCartShown: false,
  isSuccessCartShown: false,
  isRemoveCartShown: false,
  currentCamera: null
};

export const addCartSlice = createSlice({
  name: NameSpace.AddCart,
  initialState,
  reducers: {
    showAddCart: (state, action: PayloadAction<RatedCamera>) => {
      state.isAddCartShown = true;
      state.currentCamera = action.payload;
    },
    hideAddCart: (state) => {
      state.isAddCartShown = false;
      state.currentCamera = null;
    },
    showRemoveCart: (state, action: PayloadAction<RatedCamera>) => {
      state.isRemoveCartShown = true;
      state.currentCamera = action.payload;
    },
    hideRemoveCart: (state) => {
      state.isRemoveCartShown = false;
      state.currentCamera = null;
    },
    showSuccessCart: (state) => {
      state.isSuccessCartShown = true;
    },
    hideSuccessCart: (state) => {
      state.isSuccessCartShown = false;
    },
  },
});

export const { showAddCart, hideAddCart, showSuccessCart, hideSuccessCart, showRemoveCart, hideRemoveCart } = addCartSlice.actions;
