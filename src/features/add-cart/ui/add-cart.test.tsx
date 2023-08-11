import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';
import { AddCart } from './add-cart';
import { Camera } from '../../../entities/camera';
import { NameSpace } from '../../../app/provider/store';

const camera: Camera = {
  id: 0,
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
  [NameSpace.AddCart]: {currentCamera: camera},
});

const history = createMemoryHistory();

describe('Component: AddBasket', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddCart />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
  });
});
