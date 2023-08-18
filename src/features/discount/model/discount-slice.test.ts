import { FetchStatus } from '../../../shared/types/fetch-status';
import { checkDiscount } from './api-actions/check-discount';
import { discountSlice, setCoupon, setDiscount, setDiscountStatus } from './discount-slice';

describe('Reducer: discountSlice', () => {
  it('without additional parameters should return initial state', () => {
    const state = {
      coupon: '',
      discount: 0,
      discountStatus: FetchStatus.Idle,
      checkDiscountLoadingStatus: FetchStatus.Idle,
    };
    expect(discountSlice.reducer(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        coupon: '',
        discount: 0,
        discountStatus: FetchStatus.Idle,
        checkDiscountLoadingStatus: FetchStatus.Idle,
      });
  });

  it('should set FetchStatus.Success to discountStatus', () => {
    const state = {
      coupon: '',
      discount: 0,
      discountStatus: FetchStatus.Idle,
      checkDiscountLoadingStatus: FetchStatus.Idle,
    };
    expect(discountSlice.reducer(state, setDiscountStatus(FetchStatus.Success)))
      .toEqual({
        coupon: '',
        discount: 0,
        discountStatus: FetchStatus.Success,
        checkDiscountLoadingStatus: FetchStatus.Idle,
      });
  });

  it('should set "coupon" to coupon', () => {
    const state = {
      coupon: '',
      discount: 0,
      discountStatus: FetchStatus.Idle,
      checkDiscountLoadingStatus: FetchStatus.Idle,
    };
    expect(discountSlice.reducer(state, setCoupon('coupon')))
      .toEqual({
        coupon: 'coupon',
        discount: 0,
        discountStatus: FetchStatus.Idle,
        checkDiscountLoadingStatus: FetchStatus.Idle,
      });
  });

  it('should set 100 to discount', () => {
    const state = {
      coupon: '',
      discount: 0,
      discountStatus: FetchStatus.Idle,
      checkDiscountLoadingStatus: FetchStatus.Idle,
    };
    expect(discountSlice.reducer(state, setDiscount(100)))
      .toEqual({
        coupon: '',
        discount: 100,
        discountStatus: FetchStatus.Idle,
        checkDiscountLoadingStatus: FetchStatus.Idle,
      });
  });

  it('should set FetchStatus.Success to discountStatus and checkDiscountLoadingStatus and set 0.5 to discount', () => {
    const state = {
      coupon: '',
      discount: 0,
      discountStatus: FetchStatus.Idle,
      checkDiscountLoadingStatus: FetchStatus.Idle,
    };
    expect(discountSlice.reducer(state, {type: checkDiscount.fulfilled.type, payload: '50'}))
      .toEqual({
        coupon: '',
        discount: 0.5,
        discountStatus: FetchStatus.Success,
        checkDiscountLoadingStatus: FetchStatus.Success,
      });
  });

  it('should set FetchStatus.Failed to discountStatus and FetchStatus.Success checkDiscountLoadingStatus', () => {
    const state = {
      coupon: '',
      discount: 0,
      discountStatus: FetchStatus.Idle,
      checkDiscountLoadingStatus: FetchStatus.Idle,
    };
    expect(discountSlice.reducer(state, {type: checkDiscount.fulfilled.type, payload: '0'}))
      .toEqual({
        coupon: '',
        discount: 0,
        discountStatus: FetchStatus.Failed,
        checkDiscountLoadingStatus: FetchStatus.Success,
      });
  });

  it('should set FetchStatus.Pending to discountStatus and checkDiscountLoadingStatus while dis are loading', () => {
    const state = {
      coupon: '',
      discount: 0,
      discountStatus: FetchStatus.Idle,
      checkDiscountLoadingStatus: FetchStatus.Idle,
    };
    expect(discountSlice.reducer(state, {type: checkDiscount.pending.type}))
      .toEqual({
        coupon: '',
        discount: 0,
        discountStatus: FetchStatus.Pending,
        checkDiscountLoadingStatus: FetchStatus.Pending,
      });
  });

  it('should set FetchStatus.Failed to postReviewLoadingStatus if server is unavailable', () => {
    const state = {
      coupon: '',
      discount: 0,
      discountStatus: FetchStatus.Idle,
      checkDiscountLoadingStatus: FetchStatus.Idle,
    };
    expect(discountSlice.reducer(state, {type: checkDiscount.pending.type}))
      .toEqual({
        coupon: '',
        discount: 0,
        discountStatus: FetchStatus.Pending,
        checkDiscountLoadingStatus: FetchStatus.Pending,
      });
  });
});
