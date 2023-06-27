import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../lib/name-space';
import { bannerSlice } from '../../../../wigets/banner';
import { catalogSlice } from '../../../../wigets/catalog';
import { addBasketSlice } from '../../../../features/add-basket';
import { cameraInfoSlice } from '../../../../wigets/camera-info';
import { similarSlice } from '../../../../wigets/similar';
import { reviewSlice } from '../../../../wigets/review-block';
import { addReviewSlice } from '../../../../features/add-review';

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogSlice.reducer,
  [NameSpace.Banner]: bannerSlice.reducer,
  [NameSpace.AddBasket]: addBasketSlice.reducer,
  [NameSpace.AddReview]: addReviewSlice.reducer,
  [NameSpace.CameraInfo]: cameraInfoSlice.reducer,
  [NameSpace.Similar]: similarSlice.reducer,
  [NameSpace.Review]: reviewSlice.reducer,
});
