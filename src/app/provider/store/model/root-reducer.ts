import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../lib/name-space';
import { bannerSlice } from '../../../../wigets/banner';
import { catalogSlice } from '../../../../wigets/catalog';
import { addBasketSlice } from '../../../../features/add-basket';

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogSlice.reducer,
  [NameSpace.Banner]: bannerSlice.reducer,
  [NameSpace.AddBasket]: addBasketSlice.reducer,
  // [NameSpace.Quest]: questSlice.reducer,
  // [NameSpace.User]: userSlice.reducer,
});
