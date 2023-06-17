import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { store } from './provider/store/ui/store';
import HistoryRouter from './provider/router/ui/app-router';
import { AppRoute } from './provider/router/lib/routes';
import { browserHistory } from './provider/router/lib/history';

import { CatalogPage } from '../pages/catalog-page';
import { MainPage } from '../pages/main-page';
import { LoadingSpinner } from '../shared/ui/loading-spinner';
import { CameraPage } from '../pages/camera-page';

export default function App(): JSX.Element {
  // const authStatus = useAppSelector(getAuthStatus);

  // if (authStatus.unknown) {
  //   return <LoadingSpinner spinnerType='page' />;
  // }

  return (
    // <Oops type='error-boundary' />
    <ErrorBoundary fallback={<div>Oops...</div>}>
      <Suspense fallback={<LoadingSpinner spinnerType='page' />}>
        <Provider store={store}>
          <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
          <HistoryRouter history={browserHistory}>
            <Routes>
              <Route
                path={AppRoute.Main}
                element={
                  <MainPage />
                }
              />
              <Route
                path={AppRoute.Catalog}
                element={<CatalogPage />}
              />
              <Route
                path={AppRoute.Camera}
                element={<CameraPage />}
              />
              {/* <Route
                path="*"
                element={<NotFound />}
              /> */}
            </Routes>
          </HistoryRouter>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  );
}
