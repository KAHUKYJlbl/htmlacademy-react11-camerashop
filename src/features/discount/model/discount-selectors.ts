import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';

export const getDiscount = (state: State): number => state[NameSpace.Discount].discount;

export const getDiscountStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Discount].discountStatus,
  (status) => ({
    isIdle: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isAccepted: status === FetchStatus.Success,
    isDenied: status === FetchStatus.Failed,
  })
);

export const getCheckDiscountLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Discount].checkDiscountLoadingStatus,
  (status) => ({
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
