import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { Camera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';

export const getCamera = (state: State): Camera | null => state[NameSpace.CameraInfo].camera;

export const getCameraLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.CameraInfo].cameraInfoLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
