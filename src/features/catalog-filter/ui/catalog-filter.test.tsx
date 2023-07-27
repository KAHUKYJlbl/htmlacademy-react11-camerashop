import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { HistoryRouter } from '../../../app/provider/history-router';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { Banner } from '../../../wigets/banner';

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
    catalogLoadingStatus: FetchStatus.Success,
  }
});

const history = createMemoryHistory();

describe('Component: CatalogFilter', () => {
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
