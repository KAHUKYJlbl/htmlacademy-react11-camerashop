import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../../app/provider/history-router';
import { NameSpace } from '../../../app/provider/store';
import { ReviewBlock } from './review-block';
import { FetchStatus } from '../../../shared/types/fetch-status';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Review]: {
    reviews: [],
    reviewsLoadingStatus: FetchStatus.Success,
  },
});

const history = createMemoryHistory();

describe('Component: ReviewBlock', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewBlock cameraId={''} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Оставить свой отзыв');
  });
});
