import { createSlice } from '@reduxjs/toolkit';


import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { ReviewType } from '../../../entities/review';
import { fetchReviews } from './api-actions/fetch-reviews';

type InitialState = {
  reviewsLoadingStatus: FetchStatus;
  reviews: ReviewType[];
}

const initialState: InitialState = {
  reviewsLoadingStatus: FetchStatus.Idle,
  reviews: [],
};

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviewsLoadingStatus = FetchStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.reviewsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.reviewsLoadingStatus = FetchStatus.Failed;
      });
  }
});
