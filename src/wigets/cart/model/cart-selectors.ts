import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { CartCamera, RatedCamera } from '../../../entities/camera';

export const getCartItems = createSelector(
  (state: State): CartCamera[] => state[NameSpace.Cart].cartList,
  (list) => [...list].sort((a, b) => a.camera.price - b.camera.price)
);

export const getCartItemsIds = createSelector(
  (state: State): CartCamera[] => state[NameSpace.Cart].cartList,
  (list) => list.map((item) => item.camera.id)
);

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
  (items) =>
    items.reduce((sum, item) =>
      sum + (item.quantity ? item.quantity : 1),
    0)
);

export const getCartSumPrice = createSelector(
  getCartItems,
  (items) =>
    items.reduce((sum, item) =>
      sum + (item.quantity ? item.quantity : 1) * item.camera.price,
    0)
);

export const getCartUploadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Cart].cartUploadingStatus,
  (status) => ({
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
