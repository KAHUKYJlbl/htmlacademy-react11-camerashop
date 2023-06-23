import { createSlice } from '@reduxjs/toolkit';


import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { Camera } from '../../../entities/camera';
import { fetchSimilar } from './api-actions/fetch-similar';

type InitialState = {
  similarLoadingStatus: FetchStatus;
  similar: Camera[];
}

const initialState: InitialState = {
  similarLoadingStatus: FetchStatus.Idle,
  similar: [],
};

export const similarSlice = createSlice({
  name: NameSpace.Similar,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.similarLoadingStatus = FetchStatus.Success;
        state.similar = action.payload;
      })
      .addCase(fetchSimilar.pending, (state) => {
        state.similarLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSimilar.rejected, (state) => {
        state.similarLoadingStatus = FetchStatus.Failed;
      });
  }
});
