import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';
import { Camera } from '../../../entities/camera';
import { NameSpace } from '../../../app/provider/store';
import { PostReview } from './post-review';

const camera: Camera = {
  id: 1,
  name: '',
  previewImg: '',
  previewImg2x: '',
  previewImgWebp: '',
  previewImgWebp2x: '',
  vendorCode: '',
  type: 'Коллекционная',
  category: 'Видеокамера',
  level: 'Нулевой',
  description: '',
  price: 0,
  reviewCount: 0,
};

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.PostReview]: {currentCameraId: camera.id},
});

const history = createMemoryHistory();

describe('Component: PostReview', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PostReview />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
  });
});
