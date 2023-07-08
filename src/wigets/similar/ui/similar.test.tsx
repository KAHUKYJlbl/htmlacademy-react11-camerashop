import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../../app/provider/history-router';
import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { Banner } from '../../banner';

const camera = {
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

const bannerCamera = {
  id: 1,
  name: 'string',
  previewImg: 'string',
  previewImg2x: 'string',
  previewImgWebp: 'string',
  previewImgWebp2x: 'string',
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Similar]: {
    similar: [camera, {...camera, id: 2}],
    similarLoadingStatus: FetchStatus.Success,
  },
  [NameSpace.Banner]: {
    banner: bannerCamera,
  },
  [NameSpace.Catalog]: {
    catalog: [],
    catalogLoadingStatus: FetchStatus.Success,
  }
});

const history = createMemoryHistory();

describe('Component: Similar', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByAltText(/баннер/i)).toBeInTheDocument();
    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
  });
});
