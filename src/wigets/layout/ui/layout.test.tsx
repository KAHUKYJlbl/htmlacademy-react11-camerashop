import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../../app/provider/history-router';
import { Banner } from '../../banner';
import { NameSpace } from '../../../app/provider/store';

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
  [NameSpace.Banner]: {
    banner: bannerCamera,
  },
  [NameSpace.Catalog]: {
    catalog: [],
    ratedCatalog: [],
  }
});

const history = createMemoryHistory();

describe('Component: Layout', () => {
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
