import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';

export const getPostReviewShown = (state: State): boolean => state[NameSpace.PostReview].isPostReviewShown;

export const getSuccessReviewShown = (state: State): boolean => state[NameSpace.PostReview].isSuccessReviewShown;

export const getCurrentCameraId = (state: State): string | null => state[NameSpace.PostReview].currentCameraId;

export const getPostReviewLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.PostReview].postReviewLoadingStatus,
  (status) => ({
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
