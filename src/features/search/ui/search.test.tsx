import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../../app/provider/store';
import { Search } from './search';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Catalog]: {
    ratedCatalog: [],
    catalog: [],
  },
});

const history = createMemoryHistory();

describe('Component: PostReview', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Search />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button').textContent).toBe('Сбросить поиск');
  });
});
