import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { RatedCamera } from '../../../entities/camera';

type InitialState = {
  isAddCartShown: boolean;
  currentCamera: RatedCamera | null;
}

const initialState: InitialState = {
  isAddCartShown: false,
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
  },
});

export const { showAddCart, hideAddCart } = addCartSlice.actions;
