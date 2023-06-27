import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { ReviewType } from '../../../entities/review';

export const getReviews = (state: State): ReviewType[] => state[NameSpace.Review].reviews;

export const getREviewsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Review].reviewsLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
