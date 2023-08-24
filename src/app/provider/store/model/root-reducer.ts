import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../lib/name-space';
import { bannerSlice } from '../../../../wigets/banner';
import { catalogSlice } from '../../../../wigets/catalog';
import { cameraInfoSlice } from '../../../../wigets/camera-info';
import { similarSlice } from '../../../../wigets/similar';
import { reviewSlice } from '../../../../wigets/review-block';
import { postReviewSlice } from '../../../../features/post-review';
import { cartSlice } from '../../../../wigets/cart/model/cart-slice';
import { addCartSlice } from '../../../../features/add-cart';
import { discountSlice } from '../../../../features/discount';
import { postOrderSlice } from '../../../../features/post-order';

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogSlice.reducer,
  [NameSpace.Banner]: bannerSlice.reducer,
  [NameSpace.CameraInfo]: cameraInfoSlice.reducer,
  [NameSpace.Similar]: similarSlice.reducer,
  [NameSpace.Review]: reviewSlice.reducer,
  [NameSpace.PostReview]: postReviewSlice.reducer,
  [NameSpace.Cart]: cartSlice.reducer,
  [NameSpace.AddCart]: addCartSlice.reducer,
  [NameSpace.Discount]: discountSlice.reducer,
  [NameSpace.PostOrder]: postOrderSlice.reducer,
});
