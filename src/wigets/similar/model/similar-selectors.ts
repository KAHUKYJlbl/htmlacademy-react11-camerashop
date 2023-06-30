import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { Camera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';

export const getSimilar = (state: State): Camera[] => state[NameSpace.Similar].similar;

export const getSimilarLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Similar].similarLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
