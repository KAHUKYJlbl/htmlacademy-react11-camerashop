import { Camera } from '../../../entities/camera';
import { addCartSlice, hideAddCart, showAddCart } from './add-cart-slice';

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

describe('Reducer: addCartSlice', () => {
  it('without additional parameters should return initial state', () => {
    const state = {isAddCartShown: false, currentCamera: null};
    expect(addCartSlice.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({isAddCartShown: false, currentCamera: null});
  });

  it('should change state isAddCartShown to true and currentCamera to new camera', () => {
    const state = {isAddCartShown: false, currentCamera: null};
    expect(addCartSlice.reducer(state, showAddCart(camera)))
      .toEqual({isAddCartShown: true, currentCamera: camera});
  });

  it('should change state isAddCartShown to false and currentCamera to new null', () => {
    const state = {isAddCartShown: true, currentCamera: camera};
    expect(addCartSlice.reducer(state, hideAddCart()))
      .toEqual({isAddCartShown: false, currentCamera: null});
  });
});
