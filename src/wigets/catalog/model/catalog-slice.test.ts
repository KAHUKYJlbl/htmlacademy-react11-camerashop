import { Camera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { fetchCatalog } from './api-actions/fetch-catalog';
import { catalogSlice } from './catalog-slice';

const catalog: Camera[] = [{
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
}];

describe('Reducer: catalogSlice', () => {
  it('without additional parameters should return initial state', () => {
    const state = {catalogLoadingStatus: FetchStatus.Idle, catalog: [], ratedCatalog: []};
    expect(catalogSlice.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({catalogLoadingStatus: FetchStatus.Idle, catalog: [], ratedCatalog: []});
  });

  it('should update catalog by load catalog and set FetchStatus.Success to catalogLoadingStatus', () => {
    const state = {catalogLoadingStatus: FetchStatus.Idle, catalog: [], ratedCatalog: []};
    expect(catalogSlice.reducer(state, {type: fetchCatalog.fulfilled.type, payload: catalog}))
      .toEqual({catalogLoadingStatus: FetchStatus.Success, catalog, ratedCatalog: []});
  });

  it('should set FetchStatus.Pending to catalogLoadingStatus while catalog are loading', () => {
    const state = {catalogLoadingStatus: FetchStatus.Success, catalog: [], ratedCatalog: []};
    expect(catalogSlice.reducer(state, {type: fetchCatalog.pending.type}))
      .toEqual({catalogLoadingStatus: FetchStatus.Pending, catalog: [], ratedCatalog: []});
  });

  it('should set FetchStatus.Failed to catalogLoadingStatus if server is unavailable', () => {
    const state = {catalogLoadingStatus: FetchStatus.Success, catalog: [], ratedCatalog: []};
    expect(catalogSlice.reducer(state, {type: fetchCatalog.rejected.type}))
      .toEqual({catalogLoadingStatus: FetchStatus.Failed, catalog: [], ratedCatalog: []});
  });
});
