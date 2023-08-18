import { Review } from '../../../entities/review';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { postReview } from './api-actions/post-review';
import {
  hidePostReview,
  hideSuccessReview,
  postReviewSlice,
  showPostReview,
  showSuccessReview
} from './post-review-slice';

const review: Review = {
  userName: 'string',
  advantage: 'string',
  disadvantage: 'string',
  review: 'string',
  cameraId: 0,
  rating: 0,
  id: 'string',
  createAt: 'string',
};

describe('Reducer: postReviewSlice', () => {
  it('without additional parameters should return initial state', () => {
    const state = {
      isPostReviewShown: false,
      currentCameraId: null,
      isSuccessReviewShown: false,
      postReviewLoadingStatus: FetchStatus.Idle
    };
    expect(postReviewSlice.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isPostReviewShown: false,
        currentCameraId: null,
        isSuccessReviewShown: false,
        postReviewLoadingStatus: FetchStatus.Idle
      });
  });

  it('should change state isPostReviewShown to true and currentCameraId to new cameraId', () => {
    const state = {
      isPostReviewShown: false,
      currentCameraId: null,
      isSuccessReviewShown: false,
      postReviewLoadingStatus: FetchStatus.Idle
    };
    expect(postReviewSlice.reducer(state, showPostReview('')))
      .toEqual({
        isPostReviewShown: true,
        currentCameraId: '',
        isSuccessReviewShown: false,
        postReviewLoadingStatus: FetchStatus.Idle
      });
  });

  it('should change state isAddBasketShown to false and currentCamera to new null', () => {
    const state = {
      isPostReviewShown: true,
      currentCameraId: '',
      isSuccessReviewShown: false,
      postReviewLoadingStatus: FetchStatus.Idle
    };
    expect(postReviewSlice.reducer(state, hidePostReview()))
      .toEqual({
        isPostReviewShown: false,
        currentCameraId: null,
        isSuccessReviewShown: false,
        postReviewLoadingStatus: FetchStatus.Idle
      });
  });

  it('should change state isSuccessReviewShown to true', () => {
    const state = {
      isPostReviewShown: false,
      currentCameraId: null,
      isSuccessReviewShown: false,
      postReviewLoadingStatus: FetchStatus.Idle
    };
    expect(postReviewSlice.reducer(state, showSuccessReview()))
      .toEqual({
        isPostReviewShown: false,
        currentCameraId: null,
        isSuccessReviewShown: true,
        postReviewLoadingStatus: FetchStatus.Idle
      });
  });

  it('should change state isSuccessReviewShown to false', () => {
    const state = {
      isPostReviewShown: false,
      currentCameraId: null,
      isSuccessReviewShown: true,
      postReviewLoadingStatus: FetchStatus.Idle
    };
    expect(postReviewSlice.reducer(state, hideSuccessReview()))
      .toEqual({
        isPostReviewShown: false,
        currentCameraId: null,
        isSuccessReviewShown: false,
        postReviewLoadingStatus: FetchStatus.Idle
      });
  });

  it('should set FetchStatus.Success to postReviewLoadingStatus', () => {
    const state = {
      isPostReviewShown: false,
      currentCameraId: null,
      isSuccessReviewShown: true,
      postReviewLoadingStatus: FetchStatus.Idle
    };
    expect(postReviewSlice.reducer(state, {type: postReview.fulfilled.type, payload: review}))
      .toEqual({
        isPostReviewShown: false,
        currentCameraId: null,
        isSuccessReviewShown: true,
        postReviewLoadingStatus: FetchStatus.Success
      });
  });

  it('should set FetchStatus.Pending to postReviewLoadingStatus while review is posting', () => {
    const state = {
      isPostReviewShown: false,
      currentCameraId: null,
      isSuccessReviewShown: true,
      postReviewLoadingStatus: FetchStatus.Success
    };
    expect(postReviewSlice.reducer(state, {type: postReview.pending.type}))
      .toEqual({
        isPostReviewShown: false,
        currentCameraId: null,
        isSuccessReviewShown: true,
        postReviewLoadingStatus: FetchStatus.Pending
      });
  });

  it('should set FetchStatus.Failed to postReviewLoadingStatus if server is unavailable', () => {
    const state = {
      isPostReviewShown: false,
      currentCameraId: null,
      isSuccessReviewShown: true,
      postReviewLoadingStatus: FetchStatus.Pending
    };
    expect(postReviewSlice.reducer(state, {type: postReview.rejected.type}))
      .toEqual({
        isPostReviewShown: false,
        currentCameraId: null,
        isSuccessReviewShown: true,
        postReviewLoadingStatus: FetchStatus.Failed
      });
  });
});
