import { createSlice } from '@reduxjs/toolkit';


import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { Camera } from '../../../entities/camera';
import { fetchCamera } from './api-actions/fetch-camera';

type InitialState = {
  cameraInfoLoadingStatus: FetchStatus;
  camera: Camera | null;
}

const initialState: InitialState = {
  cameraInfoLoadingStatus: FetchStatus.Idle,
  camera: null,
};

export const cameraInfoSlice = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamera.fulfilled, (state, action) => {
        state.cameraInfoLoadingStatus = FetchStatus.Success;
        state.camera = action.payload;
      })
      .addCase(fetchCamera.pending, (state) => {
        state.cameraInfoLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchCamera.rejected, (state) => {
        state.cameraInfoLoadingStatus = FetchStatus.Failed;
      });
  }
});
