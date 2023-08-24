import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';

export const getOrderSuccessShown = (state: State): boolean => state[NameSpace.PostOrder].isOrderSuccessShown;

export const getOrderPostingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.PostOrder].orderPostingStatus,
  (status) => ({
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
