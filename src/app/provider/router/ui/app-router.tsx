import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { MainPage } from '../../../../pages/main-page';
import { CatalogPage } from '../../../../pages/catalog-page';
import { CameraPage } from '../../../../pages/camera-page';
import { CartPage } from '../../../../pages/cart-page';
import { NotFound } from '../../../../pages/not-found';
import { CameraInfo } from '../../../../wigets/camera-info';
import { CameraTabs } from '../../../../entities/camera/lib/const';

import { AppRoute } from '../lib/routes';

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={AppRoute.Main}
        element={
          <MainPage />
        }
      />
      <Route
        path="*"
        element={<NotFound />}
      />
      <Route
        path={AppRoute.Catalog}
        element={<CatalogPage />}
      />
      <Route
        path={AppRoute.Cart}
        element={<CartPage />}
      />
      <Route
        path={AppRoute.Camera}
        element={<CameraPage />}
      >
        <Route
          index
          element={<CameraInfo cameraTab={CameraTabs.Description} />}
        />
        <Route
          path={AppRoute.CameraDescription}
          element={<CameraInfo cameraTab={CameraTabs.Description} />}
        />
        <Route
          path={AppRoute.CameraProperties}
          element={<CameraInfo cameraTab={CameraTabs.Properties} />}
        />
      </Route>
    </>
  )
);
