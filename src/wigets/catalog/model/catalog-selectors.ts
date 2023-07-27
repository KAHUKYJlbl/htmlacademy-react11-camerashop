import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { Camera, RatedCamera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';

import { CurrentSort } from '../lib/types/current-sort';
import { CurrentFilter } from '../lib/types/current-filter';
import { CurrentPrice } from '../lib/types/current-price';

export const getCatalog = (state: State): RatedCamera[] => state[NameSpace.Catalog].ratedCatalog;

export const getCatalogIDs = createSelector(
  (state: State): Camera[] => state[NameSpace.Catalog].catalog,
  (catalog) => catalog.map((camera) => camera.id)
);

export const getSortedFilteredCatalog = createSelector(
  [
    getCatalog,
    (state: State, sort: CurrentSort) => sort,
    (state: State, sort: CurrentSort, filter: CurrentFilter) => filter,
  ],
  (catalog, sort, filter) => [...catalog]
    .sort((a, b) => {
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
    .filter((element) => (
      (!filter.category.length || filter.category.includes(element.category))
      && (!filter.level.length || filter.level.includes(element.level))
      && (!filter.type.length || filter.type.includes(element.type))
    ))
);

export const getSortedFilteredPricedCatalog = createSelector(
  [
    getCatalog,
    (state: State, sort: CurrentSort) => sort,
    (state: State, sort: CurrentSort, filter: CurrentFilter) => filter,
    (state: State, sort: CurrentSort, filter: CurrentFilter, price: CurrentPrice) => price
  ],
  (catalog, sort, filter, price) => [...catalog]
    .sort((a, b) => {
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
    .filter((element) => (
      (!filter.category.length || filter.category.includes(element.category))
      && (!filter.level.length || filter.level.includes(element.level))
      && (!filter.type.length || filter.type.includes(element.type))
      && (!price.min || element.price >= price.min)
      && (!price.max || element.price <= price.max)
    ))
);

export const getCatalogLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Catalog].catalogLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
