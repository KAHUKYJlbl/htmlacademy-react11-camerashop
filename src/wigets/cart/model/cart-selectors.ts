import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { CartCamera, RatedCamera } from '../../../entities/camera';

export const getCartItems = (state: State): CartCamera[] => state[NameSpace.Cart].cartList;

export const getCameraCartStatus = createSelector(
  [
    getCartItems,
    (state: State, camera: RatedCamera) => camera,
  ],
  (cart, camera) => ({
    inCart: cart.some((item) => item.camera.id === camera.id),
    notInCart: cart.every((item) => item.camera.id !== camera.id),
  })
);

export const getCartLength = createSelector(
  getCartItems,
  (items) => items.length
);

export const getCartSumPrice = createSelector(
  getCartItems,
  (items) =>
    items.reduce((sum, item) =>
      sum + item.quantity * item.camera.price,
    0)
);

export const getCartUploadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Cart].cartUploadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
