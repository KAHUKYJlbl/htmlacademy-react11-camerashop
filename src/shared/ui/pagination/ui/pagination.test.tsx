import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../../../app/provider/history-router';
import { Pagination } from './pagination';

const mockStore = configureMockStore();
const store = mockStore({});

const history = createMemoryHistory();

const paginationProps = {
  page: '2',
  pagesCount: 5,
};

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination {...paginationProps} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });
});
