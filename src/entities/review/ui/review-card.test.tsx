import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';
import { Review } from '../types/review';
import { ReviewCard } from './review-card';

const mockStore = configureMockStore();
const store = mockStore({});

const review: Review = {
  userName: 'string',
  advantage: 'string',
  disadvantage: 'string',
  review: 'string',
  cameraId: 0,
  rating: 0,
  id: 'string',
  createAt: 'string',
};

const history = createMemoryHistory();

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewCard review={review} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();
  });
});
