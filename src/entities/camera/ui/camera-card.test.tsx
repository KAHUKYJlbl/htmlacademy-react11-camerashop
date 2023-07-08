import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { CameraCard } from './camera-card';
import { Camera } from '../types/camera';
import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();
const store = mockStore({});

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
  price: 1,
  reviewCount: 1,
};

const history = createMemoryHistory();

describe('Component: CameraCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CameraCard camera={camera} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Купить');
  });
});
