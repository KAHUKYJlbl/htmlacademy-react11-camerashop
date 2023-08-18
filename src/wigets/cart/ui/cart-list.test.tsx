import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';
import { CartList } from './cart-list';
import { CartCamera, RatedCamera } from '../../../entities/camera';
import { NameSpace } from '../../../app/provider/store';

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

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Cart]: {cartList: [cartCamera]},
});

const history = createMemoryHistory();

describe('Component: AddCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
