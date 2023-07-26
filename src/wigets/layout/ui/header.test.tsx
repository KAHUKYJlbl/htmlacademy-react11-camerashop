import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../../app/provider/history-router';
import Header from './header';
import { NameSpace } from '../../../app/provider/store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Catalog]: {
    catalog: [],
    ratedCatalog: [],
  }
});

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button').textContent).toBe('Сбросить поиск');
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
  });
});
