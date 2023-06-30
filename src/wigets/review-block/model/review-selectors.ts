import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { Review } from '../../../entities/review';

const getReviews = (state: State): Review[] => state[NameSpace.Review].reviews;

export const getSortedReviewsNewToOld = createSelector(
  getReviews,
  (reviews) => [...reviews].sort( (a, b) => Date.parse(b.createAt) - Date.parse(a.createAt) )
);

export const getReviewsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Review].reviewsLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
