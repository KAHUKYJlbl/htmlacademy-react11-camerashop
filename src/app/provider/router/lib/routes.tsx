export enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  CatalogQuery = '/catalog?*',
  Camera = '/camera/:cameraId',
  CameraDescription = '/camera/:cameraId/description',
  CameraProperties = '/camera/:cameraId/properties',
  NotFound = '/not-found',
}
