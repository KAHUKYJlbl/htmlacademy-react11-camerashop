import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { RatedCamera } from '../../../entities/camera';

export const getCartItems = (state: State): RatedCamera[] => state[NameSpace.Cart].cartList;

export const getCartUoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Cart].cartUploadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
