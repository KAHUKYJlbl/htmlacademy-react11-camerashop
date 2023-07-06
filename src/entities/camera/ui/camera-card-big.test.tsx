import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { Camera } from '../types/camera';
import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';
import { CameraCardBig } from './camera-card-big';
import { CameraTabs } from '../lib/const';

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

describe('Component: CameraCardBig', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CameraCardBig camera={camera} cameraTab={CameraTabs.Description} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
});
