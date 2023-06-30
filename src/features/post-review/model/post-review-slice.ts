import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { postReview } from './api-actions/post-review';
import { FetchStatus } from '../../../shared/types/fetch-status';

type InitialState = {
  isPostReviewShown: boolean;
  isSuccessReviewShown: boolean;
  currentCameraId: string | null;
  postReviewLoadingStatus: FetchStatus;
}

const initialState: InitialState = {
  isPostReviewShown: false,
  isSuccessReviewShown: false,
  currentCameraId: null,
  postReviewLoadingStatus: FetchStatus.Idle,
};

export const postReviewSlice = createSlice({
  name: NameSpace.PostReview,
  initialState,
  reducers: {
    showPostReview: (state, action: PayloadAction<string>) => {
      state.isPostReviewShown = !state.isPostReviewShown;
      state.currentCameraId = action.payload;
    },
    hidePostReview: (state) => {
      state.isPostReviewShown = !state.isPostReviewShown;
      state.currentCameraId = null;
    },
    showSuccessReview: (state) => {
      state.isSuccessReviewShown = !state.isSuccessReviewShown;
    },
    hideSuccessReview: (state) => {
      state.isSuccessReviewShown = !state.isSuccessReviewShown;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postReview.fulfilled, (state, action) => {
        state.postReviewLoadingStatus = FetchStatus.Success;
      })
      .addCase(postReview.pending, (state) => {
        state.postReviewLoadingStatus = FetchStatus.Pending;
      })
      .addCase(postReview.rejected, (state) => {
        state.postReviewLoadingStatus = FetchStatus.Failed;
      });
  }
});

export const { showPostReview, hidePostReview, showSuccessReview, hideSuccessReview } = postReviewSlice.actions;
