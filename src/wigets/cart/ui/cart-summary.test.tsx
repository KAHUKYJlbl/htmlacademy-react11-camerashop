import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { HistoryRouter } from '../../../app/provider/history-router';
import { CartCamera, RatedCamera } from '../../../entities/camera';
import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { CartSummary } from './cart-summary';

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
  [NameSpace.Cart]: {
    cartList: [cartCamera],
    cartUploadingStatus: FetchStatus.Idle,
  },
  [NameSpace.Discount]: {
    coupon: '',
    discount: 0,
  },
});

const history = createMemoryHistory();

describe('Component: AddCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartSummary />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Всего:')).toBeInTheDocument();
    expect(screen.getAllByRole('button').some((button) => button.textContent === 'Оформить заказ')).toBe(true);
  });
});
