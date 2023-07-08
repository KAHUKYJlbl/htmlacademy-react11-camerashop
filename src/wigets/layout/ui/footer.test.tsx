import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../../app/provider/history-router';
import Footer from './footer';

const mockStore = configureMockStore();
const store = mockStore();

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Footer />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
  });
});
