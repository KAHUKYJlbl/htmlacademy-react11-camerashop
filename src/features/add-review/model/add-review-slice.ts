import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';

type InitialState = {
  isAddReviewShown: boolean;
}

const initialState: InitialState = {
  isAddReviewShown: false,
};

export const addReviewSlice = createSlice({
  name: NameSpace.AddReview,
  initialState,
  reducers: {
    showAddReview: (state) => {
      state.isAddReviewShown = !state.isAddReviewShown;
    },
    hideAddReview: (state) => {
      state.isAddReviewShown = !state.isAddReviewShown;
    },
  },
});

export const { showAddReview, hideAddReview } = addReviewSlice.actions;
