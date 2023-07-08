import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../../app/provider/history-router';
import Header from './header';

const mockStore = configureMockStore();
const store = mockStore();

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
