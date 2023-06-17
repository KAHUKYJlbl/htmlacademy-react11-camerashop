import { createSlice } from '@reduxjs/toolkit';

import { fetchCatalog } from './api-actions/fetch-catalog';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { Camera } from '../../../entities/camera';

type InitialState = {
  catalogLoadingStatus: FetchStatus;
  catalog: Camera[];
}

const initialState: InitialState = {
  catalogLoadingStatus: FetchStatus.Idle,
  catalog: [],
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
      })
      .addCase(fetchCatalog.pending, (state) => {
        state.catalogLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchCatalog.rejected, (state) => {
        state.catalogLoadingStatus = FetchStatus.Failed;
      });
  }
});
