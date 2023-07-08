import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../../app/provider/history-router';
import { Oops } from './oops';

const mockStore = configureMockStore();
const store = mockStore();

const history = createMemoryHistory();

describe('Component: Oops', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Oops type={'catalog'} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTitle(/Try again/i)).toBeInTheDocument();
  });
});
