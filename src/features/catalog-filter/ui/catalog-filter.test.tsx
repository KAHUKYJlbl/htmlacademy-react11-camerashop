import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';
import { CatalogFilter } from './catalog-filter';

const mockStore = configureMockStore();
const store = mockStore({});

const history = createMemoryHistory();

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogFilter />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });
});
