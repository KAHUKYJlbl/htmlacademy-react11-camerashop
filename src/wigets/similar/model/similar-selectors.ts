import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { Camera, RatedCamera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';

export const getSimilar = (state: State): RatedCamera[] => state[NameSpace.Similar].ratedSimilar;

export const getSimilarIDs = createSelector(
  (state: State): Camera[] => state[NameSpace.Similar].similar,
  (catalog) => catalog.map((camera) => camera.id)
);

export const getSimilarLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Similar].similarLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
