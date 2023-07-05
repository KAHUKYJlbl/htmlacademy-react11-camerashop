import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';
import { SuccessReview } from './success-review';

const mockStore = configureMockStore();
const store = mockStore({});

const history = createMemoryHistory();

describe('Component: SuccessReview', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SuccessReview />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  });
});
