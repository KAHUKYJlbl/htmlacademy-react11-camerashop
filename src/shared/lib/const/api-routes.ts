export enum APIRoute {
  Catalog = '/cameras',
  Banner = '/promo',
  Camera = '/cameras/:cameraId',
  Similar = '/cameras/:cameraId/similar',
  Review = '/cameras/:cameraId/reviews',
  PostReview = '/reviews',
  CheckDiscount = '/coupons',
  PostOrder = '/orders',
}
