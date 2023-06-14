import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { Camera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';

export const getCatalog = (state: State): Camera[] => state[NameSpace.Catalog].catalog;

export const getCatalogLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Catalog].catalogLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
