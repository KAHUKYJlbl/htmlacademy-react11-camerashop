import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { RatedCamera } from '../../../entities/camera';

type InitialState = {
  isAddCartShown: boolean;
  isSuccessCartShown: boolean;
  currentCamera: RatedCamera | null;
}

const initialState: InitialState = {
  isAddCartShown: false,
  isSuccessCartShown: false,
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
    showSuccessCart: (state) => {
      state.isSuccessCartShown = true;
    },
    hideSuccessCart: (state) => {
      state.isSuccessCartShown = false;
    },
  },
});

export const { showAddCart, hideAddCart, showSuccessCart, hideSuccessCart } = addCartSlice.actions;
