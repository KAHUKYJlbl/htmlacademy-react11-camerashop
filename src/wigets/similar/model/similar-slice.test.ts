import { RatedCamera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { fetchSimilar } from './api-actions/fetch-similar';
import { similarSlice } from './similar-slice';

const similar: RatedCamera[] = [{
  id: 0,
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
  price: 0,
  reviewCount: 0,
}];

describe('Reducer: similarSlice', () => {
  it('without additional parameters should return initial state', () => {
    const state = {similarLoadingStatus: FetchStatus.Idle, similar: [], ratedSimilar: []};
    expect(similarSlice.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({similarLoadingStatus: FetchStatus.Idle, similar: [], ratedSimilar: []});
  });

  it('should update similar by load similar and set FetchStatus.Success to similarLoadingStatus', () => {
    const state = {similarLoadingStatus: FetchStatus.Idle, similar: [], ratedSimilar: []};
    expect(similarSlice.reducer(state, {type: fetchSimilar.fulfilled.type, payload: similar}))
      .toEqual({similarLoadingStatus: FetchStatus.Success, similar, ratedSimilar: []});
  });

  it('should set FetchStatus.Pending to similarLoadingStatus while similar are loading', () => {
    const state = {similarLoadingStatus: FetchStatus.Success, similar: [], ratedSimilar: []};
    expect(similarSlice.reducer(state, {type: fetchSimilar.pending.type}))
      .toEqual({similarLoadingStatus: FetchStatus.Pending, similar: [], ratedSimilar: []});
  });

  it('should set FetchStatus.Failed to similarLoadingStatus if server is unavailable', () => {
    const state = {similarLoadingStatus: FetchStatus.Success, similar: [], ratedSimilar: []};
    expect(similarSlice.reducer(state, {type: fetchSimilar.rejected.type}))
      .toEqual({similarLoadingStatus: FetchStatus.Failed, similar: [], ratedSimilar: []});
  });
});
