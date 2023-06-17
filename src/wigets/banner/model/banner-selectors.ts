import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { BannerCamera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';

export const getBanner = (state: State): BannerCamera | null => state[NameSpace.Banner].banner;

export const getBannerLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Banner].bannerLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
