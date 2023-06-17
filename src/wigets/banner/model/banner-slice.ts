import { createSlice } from '@reduxjs/toolkit';


import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { BannerCamera } from '../../../entities/camera';
import { fetchBanner } from './api-actions/fetch-banner';

type InitialState = {
  bannerLoadingStatus: FetchStatus;
  banner: BannerCamera | null;
}

const initialState: InitialState = {
  bannerLoadingStatus: FetchStatus.Idle,
  banner: null,
};

export const bannerSlice = createSlice({
  name: NameSpace.Banner,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.bannerLoadingStatus = FetchStatus.Success;
        state.banner = action.payload;
      })
      .addCase(fetchBanner.pending, (state) => {
        state.bannerLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchBanner.rejected, (state) => {
        state.bannerLoadingStatus = FetchStatus.Failed;
      });
  }
});
