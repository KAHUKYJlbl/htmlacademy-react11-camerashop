import { Camera } from '../../../entities/camera';
import { addBasketSlice, hideAddBasket, showAddBasket } from './add-basket-slice';

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

describe('Reducer: addBasketSlice', () => {
  it('without additional parameters should return initial state', () => {
    const state = {isAddBasketShown: false, currentCamera: null};
    expect(addBasketSlice.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({isAddBasketShown: false, currentCamera: null});
  });

  it('should change state isAddBasketShown to true and currentCamera to new camera', () => {
    const state = {isAddBasketShown: false, currentCamera: null};
    expect(addBasketSlice.reducer(state, showAddBasket(camera)))
      .toEqual({isAddBasketShown: true, currentCamera: camera});
  });

  it('should change state isAddBasketShown to false and currentCamera to new null', () => {
    const state = {isAddBasketShown: true, currentCamera: camera};
    expect(addBasketSlice.reducer(state, hideAddBasket()))
      .toEqual({isAddBasketShown: false, currentCamera: null});
  });
});
