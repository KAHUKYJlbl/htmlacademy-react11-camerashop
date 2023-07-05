import { BannerCamera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { fetchBanner } from './api-actions/fetch-banner';
import { bannerSlice } from './banner-slice';

const banner: BannerCamera = {
  id: 0,
  name: '',
  previewImg: '',
  previewImg2x: '',
  previewImgWebp: '',
  previewImgWebp2x: '',
};

describe('Reducer: bannerSlice', () => {
  it('without additional parameters should return initial state', () => {
    const state = {bannerLoadingStatus: FetchStatus.Idle, banner: null};
    expect(bannerSlice.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({bannerLoadingStatus: FetchStatus.Idle, banner: null});
  });

  it('should update banner by load banner and set FetchStatus.Success to bannerLoadingStatus', () => {
    const state = {bannerLoadingStatus: FetchStatus.Idle, banner: null};
    expect(bannerSlice.reducer(state, {type: fetchBanner.fulfilled.type, payload: banner}))
      .toEqual({bannerLoadingStatus: FetchStatus.Success, banner});
  });

  it('should set FetchStatus.Pending to bannerLoadingStatus while banner are loading', () => {
    const state = {bannerLoadingStatus: FetchStatus.Success, banner: null};
    expect(bannerSlice.reducer(state, {type: fetchBanner.pending.type}))
      .toEqual({bannerLoadingStatus: FetchStatus.Pending, banner: null});
  });

  it('should set FetchStatus.Failed to bannerLoadingStatus if server is unavailable', () => {
    const state = {bannerLoadingStatus: FetchStatus.Success, banner: null};
    expect(bannerSlice.reducer(state, {type: fetchBanner.rejected.type}))
      .toEqual({bannerLoadingStatus: FetchStatus.Failed, banner: null});
  });
});
