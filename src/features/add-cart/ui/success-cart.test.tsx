import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';
import { SuccessCart } from './success-cart';

const mockStore = configureMockStore();
const store = mockStore({});

const history = createMemoryHistory();

describe('Component: AddCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SuccessCart />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button').some((button) => button.textContent === 'Продолжить покупки')).toBe(true);
    expect(screen.getAllByRole('link').some((link) => link.classList.contains('btn--purple'))).toBe(true);
  });
});
