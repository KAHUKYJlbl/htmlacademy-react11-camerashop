import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../lib/name-space';
import { catalogSlice } from '../../../../wigets/catalog/model/catalog-slice';

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogSlice.reducer,
  // [NameSpace.Booking]: bookingSlice.reducer,
  // [NameSpace.MyQuests]: myQuestsSlice.reducer,
  // [NameSpace.Quest]: questSlice.reducer,
  // [NameSpace.User]: userSlice.reducer,
});
