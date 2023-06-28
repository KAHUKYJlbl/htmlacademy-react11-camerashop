import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { Review } from '../../../entities/review';

export const getReviews = (state: State): Review[] => state[NameSpace.Review].reviews;

export const getReviewsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Review].reviewsLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
