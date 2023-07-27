import { createSlice } from '@reduxjs/toolkit';


import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { Camera, RatedCamera } from '../../../entities/camera';
import { fetchSimilar } from './api-actions/fetch-similar';
import { fetchRating } from './api-actions/fetch-rating';

type InitialState = {
  similarLoadingStatus: FetchStatus;
  similar: Camera[];
  ratedSimilar: RatedCamera[];
}

const initialState: InitialState = {
  similarLoadingStatus: FetchStatus.Idle,
  similar: [],
  ratedSimilar: [],
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
      })
      .addCase(fetchRating.fulfilled, (state, action) => {
        state.similarLoadingStatus = FetchStatus.Success;

        const ratedCamera = state.similar.find((camera) => camera.id === action.payload.id);
        if (ratedCamera && !state.ratedSimilar.some((camera) => camera.id === action.payload.id)) {
          state.ratedSimilar.push( {...ratedCamera, rating: action.payload.rating} );
        }
      })
      .addCase(fetchRating.pending, (state) => {
        state.similarLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchRating.rejected, (state) => {
        state.similarLoadingStatus = FetchStatus.Failed;
      });
  }
});
