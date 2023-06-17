import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../lib/name-space';
import { bannerSlice } from '../../../../wigets/banner';
import { catalogSlice } from '../../../../wigets/catalog';

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogSlice.reducer,
  [NameSpace.Banner]: bannerSlice.reducer,
  // [NameSpace.MyQuests]: myQuestsSlice.reducer,
  // [NameSpace.Quest]: questSlice.reducer,
  // [NameSpace.User]: userSlice.reducer,
});
