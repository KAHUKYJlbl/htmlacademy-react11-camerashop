import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../../../app/provider/history-router';
import { UpHeader } from './up-header';

const mockStore = configureMockStore();
const store = mockStore({});

const history = createMemoryHistory();

describe('Component: UpHeader', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UpHeader />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
