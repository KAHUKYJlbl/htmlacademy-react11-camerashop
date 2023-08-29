import { createSlice } from '@reduxjs/toolkit';

import { fetchCatalog } from './api-actions/fetch-catalog';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { RatedCamera, ReviewCamera } from '../../../entities/camera';
import { fetchRating } from './api-actions/fetch-rating';

type InitialState = {
  catalogLoadingStatus: FetchStatus;
  catalog: ReviewCamera[];
  ratedCatalog: RatedCamera[];
}

const initialState: InitialState = {
  catalogLoadingStatus: FetchStatus.Idle,
  catalog: [],
  ratedCatalog: [],
};

export const catalogSlice = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.catalogLoadingStatus = FetchStatus.Success;
        state.catalog = action.payload;
        state.ratedCatalog = action.payload.map((camera) => (
          {
            ...camera,
            rating: Math.ceil(camera.reviews.reduce((rating, review) => (
              rating + review.rating
            ), 0) / camera.reviews.length)
          }
        ));
      })
      .addCase(fetchCatalog.pending, (state) => {
        state.catalogLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchCatalog.rejected, (state) => {
        state.catalogLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchRating.fulfilled, (state, action) => {
        state.catalogLoadingStatus = FetchStatus.Success;

        const cameraToRate = state.catalog.find((camera) => camera.id === action.payload.id);

        if (cameraToRate && !state.ratedCatalog.some((camera) => camera.id === action.payload.id)) {
          state.ratedCatalog.push( {...cameraToRate, rating: action.payload.rating} );
        }
      })
      .addCase(fetchRating.pending, (state) => {
        state.catalogLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchRating.rejected, (state) => {
        state.catalogLoadingStatus = FetchStatus.Failed;
      });
  }
});
