import { Camera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { fetchCamera } from './api-actions/fetch-camera';
import { cameraInfoSlice } from './camera-info-slice';

const camera: Camera = {
  id: 0,
  name: '',
  previewImg: '',
  previewImg2x: '',
  previewImgWebp: '',
  previewImgWebp2x: '',
  vendorCode: '',
  type: 'Коллекционная',
  category: 'Видеокамера',
  level: 'Нулевой',
  description: '',
  price: 0,
  reviewCount: 0,
};

describe('Reducer: cameraInfoSlice', () => {
  it('without additional parameters should return initial state', () => {
    const state = {cameraInfoLoadingStatus: FetchStatus.Idle, camera: null};
    expect(cameraInfoSlice.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({cameraInfoLoadingStatus: FetchStatus.Idle, camera: null});
  });

  it('should update camera by load camera and set FetchStatus.Success to cameraInfoLoadingStatus', () => {
    const state = {cameraInfoLoadingStatus: FetchStatus.Idle, camera: null};
    expect(cameraInfoSlice.reducer(state, {type: fetchCamera.fulfilled.type, payload: camera}))
      .toEqual({cameraInfoLoadingStatus: FetchStatus.Success, camera});
  });

  it('should set FetchStatus.Pending to cameraInfoLoadingStatus while camera are loading', () => {
    const state = {cameraInfoLoadingStatus: FetchStatus.Success, camera: null};
    expect(cameraInfoSlice.reducer(state, {type: fetchCamera.pending.type}))
      .toEqual({cameraInfoLoadingStatus: FetchStatus.Pending, camera: null});
  });

  it('should set FetchStatus.Failed to cameraInfoLoadingStatus if server is unavailable', () => {
    const state = {cameraInfoLoadingStatus: FetchStatus.Success, camera: null};
    expect(cameraInfoSlice.reducer(state, {type: fetchCamera.rejected.type}))
      .toEqual({cameraInfoLoadingStatus: FetchStatus.Failed, camera: null});
  });
});
