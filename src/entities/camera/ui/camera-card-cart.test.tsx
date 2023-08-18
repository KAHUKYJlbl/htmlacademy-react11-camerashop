import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';

import { HistoryRouter } from '../../../app/provider/history-router';
import { NameSpace } from '../../../app/provider/store';

import { CartCamera, RatedCamera } from '../types/camera';
import { CameraCardCart } from './camera-card-cart';

const camera: RatedCamera = {
  id: 1,
  rating: 1,
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

const cartCamera: CartCamera = {
  camera,
  quantity: 1,
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Cart]: {cartList: [cartCamera]},
});

const history = createMemoryHistory();

describe('Component: CameraCardCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CameraCardCart camera={camera} quantity={1} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button').some((button) => button.className === 'cross-btn')).toBe(true);
  });
});
