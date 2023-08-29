import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

import { LoadingSpinner } from '../shared/ui/loading-spinner';
import { persistor, store } from './provider/store/ui/store';
import { AppRouter } from './provider/router';
import { HelmetProvider } from 'react-helmet-async';
import { Oops } from '../wigets/oops';


export default function App(): JSX.Element {
  return (
    <ErrorBoundary fallback={<Oops type='error-boundary' />}>
      <Suspense fallback={<LoadingSpinner spinnerType='page' />}>
        <Provider store={store}>
          <PersistGate loading={<LoadingSpinner spinnerType="page" />} persistor={persistor}>
            <HelmetProvider>
              <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
              <RouterProvider router={AppRouter} />
            </HelmetProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  );
}
