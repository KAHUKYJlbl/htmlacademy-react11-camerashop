import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../../app/provider/store';
import { Discount } from './discount';
import { FetchStatus } from '../../../shared/types/fetch-status';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Discount]: {
    discountStatus: FetchStatus.Idle,
    checkDiscountLoadingStatus: FetchStatus.Idle,
  },
});

const history = createMemoryHistory();

describe('Component: AddCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Discount />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button').some((button) => button.textContent === 'Применить')).toBe(true);
  });
});
