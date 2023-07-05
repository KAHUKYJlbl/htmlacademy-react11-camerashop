import { Review } from '../../../entities/review';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { fetchReviews } from './api-actions/fetch-reviews';
import { reviewSlice } from './review-slice';

const reviews: Review[] = [{
  userName: 'string',
  advantage: 'string',
  disadvantage: 'string',
  review: 'string',
  cameraId: 0,
  rating: 0,
  id: 'string',
  createAt: 'string',
}];

describe('Reducer: reviewSlice', () => {
  it('without additional parameters should return initial state', () => {
    const state = {reviewsLoadingStatus: FetchStatus.Idle, reviews: []};
    expect(reviewSlice.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({reviewsLoadingStatus: FetchStatus.Idle, reviews: []});
  });

  it('should update reviews by load reviews and set FetchStatus.Success to reviewsLoadingStatus', () => {
    const state = {reviewsLoadingStatus: FetchStatus.Idle, reviews: []};
    expect(reviewSlice.reducer(state, {type: fetchReviews.fulfilled.type, payload: reviews}))
      .toEqual({reviewsLoadingStatus: FetchStatus.Success, reviews});
  });

  it('should set FetchStatus.Pending to reviewsLoadingStatus while reviews are loading', () => {
    const state = {reviewsLoadingStatus: FetchStatus.Success, reviews: []};
    expect(reviewSlice.reducer(state, {type: fetchReviews.pending.type}))
      .toEqual({reviewsLoadingStatus: FetchStatus.Pending, reviews: []});
  });

  it('should set FetchStatus.Failed to reviewsLoadingStatus if server is unavailable', () => {
    const state = {reviewsLoadingStatus: FetchStatus.Success, reviews: []};
    expect(reviewSlice.reducer(state, {type: fetchReviews.rejected.type}))
      .toEqual({reviewsLoadingStatus: FetchStatus.Failed, reviews: []});
  });
});
