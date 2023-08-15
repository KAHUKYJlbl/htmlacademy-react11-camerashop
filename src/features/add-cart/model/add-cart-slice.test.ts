import { RatedCamera } from '../../../entities/camera';
import { addCartSlice, hideAddCart, showAddCart } from './add-cart-slice';

const camera: RatedCamera = {
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
  rating: 5,
};

describe('Reducer: addCartSlice', () => {
  it('without additional parameters should return initial state', () => {
    const state = {isAddCartShown: false, isSuccessCartShown: false, isRemoveCartShown: false, currentCamera: null};
    expect(addCartSlice.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({isAddCartShown: false, isSuccessCartShown: false, isRemoveCartShown: false, currentCamera: null});
  });

  it('should change state isAddCartShown to true and currentCamera to new camera', () => {
    const state = {isAddCartShown: false, isSuccessCartShown: false, isRemoveCartShown: false, currentCamera: null};
    expect(addCartSlice.reducer(state, showAddCart(camera)))
      .toEqual({isAddCartShown: true, isSuccessCartShown: false, isRemoveCartShown: false, currentCamera: camera});
  });

  it('should change state isAddCartShown to false and currentCamera to new null', () => {
    const state = {isAddCartShown: true, isSuccessCartShown: false, isRemoveCartShown: false, currentCamera: camera};
    expect(addCartSlice.reducer(state, hideAddCart()))
      .toEqual({isAddCartShown: false, isSuccessCartShown: false, isRemoveCartShown: false, currentCamera: null});
  });
});
