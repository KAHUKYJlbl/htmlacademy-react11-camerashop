import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { Camera, RatedCamera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { CurrentSort } from '../lib/types/current-sort';

export const getCatalog = (state: State): RatedCamera[] => state[NameSpace.Catalog].ratedCatalog;

export const getCatalogIDs = createSelector(
  (state: State): Camera[] => state[NameSpace.Catalog].catalog,
  (catalog) => catalog.map((camera) => camera.id)
);

export const getSortedCatalog = createSelector(
  [
    getCatalog,
    (state: State, sort: CurrentSort) => sort
  ],
  (catalog, sort) => [...catalog].sort((a, b) => {
    if (sort.type === 'price') {
      return sort.order === 'up'
        ? a.price - b.price
        : b.price - a.price;
    } else if (sort.type === 'popular') {
      return sort.order === 'up'
        ? a.rating - b.rating
        : b.rating - a.rating;
    } else {
      return a.id - b.id;
    }
  })
);

export const getCatalogLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Catalog].catalogLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
