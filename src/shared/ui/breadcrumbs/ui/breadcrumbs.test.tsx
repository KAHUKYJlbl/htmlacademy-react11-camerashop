import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { createMemoryHistory } from 'history';
import { Breadcrumbs } from './breadcrumbs';
import { Titles } from '../../../lib/const/titles';
import { HistoryRouter } from '../../../../app/provider/history-router';

const mockStore = configureMockStore();
const store = mockStore({});

const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Breadcrumbs title={Titles.Catalog} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
