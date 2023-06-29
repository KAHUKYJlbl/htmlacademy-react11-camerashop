import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';

import { LoadingSpinner } from '../shared/ui/loading-spinner';
import { store } from './provider/store/ui/store';
import { AppRouter } from './provider/router';

export default function App(): JSX.Element {
  return (
    // <Oops type='error-boundary' />
    <ErrorBoundary fallback={<div>Oops...</div>}>
      <Suspense fallback={<LoadingSpinner spinnerType='page' />}>
        <Provider store={store}>
          {/* <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} /> */}
          <RouterProvider router={AppRouter} />
        </Provider>
      </Suspense>
    </ErrorBoundary>
  );
}
