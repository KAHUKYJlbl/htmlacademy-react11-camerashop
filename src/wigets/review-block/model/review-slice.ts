import { createSlice } from '@reduxjs/toolkit';


import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { Review } from '../../../entities/review';
import { fetchReviews } from './api-actions/fetch-reviews';
import { postReview } from '../../../features/post-review';

type InitialState = {
  reviewsLoadingStatus: FetchStatus;
  reviews: Review[];
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
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviewsLoadingStatus = FetchStatus.Success;
        state.reviews = [...state.reviews, action.payload];
      })
      .addCase(postReview.pending, (state) => {
        state.reviewsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(postReview.rejected, (state) => {
        state.reviewsLoadingStatus = FetchStatus.Failed;
      });
  }
});
