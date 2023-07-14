import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { Camera, RatedCamera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';

export const getCatalog = (state: State): RatedCamera[] => state[NameSpace.Catalog].ratedCatalog;

export const getCatalogIDs = createSelector(
  (state: State): Camera[] => state[NameSpace.Catalog].catalog,
  (catalog) => catalog.map((camera) => camera.id)
);

export const getCatalogLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Catalog].catalogLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
