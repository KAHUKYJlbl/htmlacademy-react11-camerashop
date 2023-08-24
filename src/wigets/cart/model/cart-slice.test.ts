import { CartCamera, RatedCamera } from '../../../entities/camera';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { postOrder } from '../../../features/post-order/model/api-actions/post-order';
import { cartItemAdd, cartItemRemove, cartItemSetQuantity, cartSlice } from './cart-slice';

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

describe('Reducer: cartSlice', () => {
  it('without additional parameters should return initial state', () => {
    const state = {
      cartUploadingStatus: FetchStatus.Idle,
      cartList: [],
    };
    expect(cartSlice.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        cartUploadingStatus: FetchStatus.Idle,
        cartList: [],
      });
  });

  it('should add new item to cart', () => {
    const state = {
      cartUploadingStatus: FetchStatus.Idle,
      cartList: [],
    };
    expect(cartSlice.reducer(state, cartItemAdd(camera)))
      .toEqual({
        cartUploadingStatus: FetchStatus.Idle,
        cartList: [cartCamera],
      });
  });

  it('should remove item from cart', () => {
    const state = {
      cartUploadingStatus: FetchStatus.Idle,
      cartList: [cartCamera, {...cartCamera, camera: {...cartCamera.camera, id: 2}}],
    };
    expect(cartSlice.reducer(state, cartItemRemove(camera)))
      .toEqual({
        cartUploadingStatus: FetchStatus.Idle,
        cartList: [{...cartCamera, camera: {...cartCamera.camera, id: 2}}],
      });
  });

  it('should set 100 quantity to camera1', () => {
    const state = {
      cartUploadingStatus: FetchStatus.Idle,
      cartList: [cartCamera, {...cartCamera, camera: {...cartCamera.camera, id: 2}}],
    };
    expect(cartSlice.reducer(state, cartItemSetQuantity({camera, quantity: 100})))
      .toEqual({
        cartUploadingStatus: FetchStatus.Idle,
        cartList: [{...cartCamera, camera: {...cartCamera.camera, id: 2}}, {...cartCamera, quantity: 100}],
      });
  });

  it('should set [] to cartList and FetchStatus.Success to cartUploadingSattus', () => {
    const state = {
      cartUploadingStatus: FetchStatus.Idle,
      cartList: [cartCamera]
    };
    expect(cartSlice.reducer(state, {type: postOrder.fulfilled.type}))
      .toEqual({
        cartUploadingStatus: FetchStatus.Success,
        cartList: [],
      });
  });

  it('should set FetchStatus.Pending to cartUploadingStatus while review is posting', () => {
    const state = {
      cartUploadingStatus: FetchStatus.Idle,
      cartList: []
    };
    expect(cartSlice.reducer(state, {type: postOrder.pending.type}))
      .toEqual({
        cartUploadingStatus: FetchStatus.Pending,
        cartList: []
      });
  });

  it('should set FetchStatus.Failed to cartUploadingStatus if server is unavailable', () => {
    const state = {
      cartUploadingStatus: FetchStatus.Idle,
      cartList: []
    };
    expect(cartSlice.reducer(state, {type: postOrder.rejected.type}))
      .toEqual({
        cartUploadingStatus: FetchStatus.Failed,
        cartList: []
      });
  });
});
