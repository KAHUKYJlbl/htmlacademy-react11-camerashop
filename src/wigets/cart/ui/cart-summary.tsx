import cn from 'classnames';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { Discount, getCoupon, getDiscount, setCoupon, setDiscount, setDiscountStatus } from '../../../features/discount';

import { getCartItemsIds, getCartSumPrice, getCartUploadingStatus } from '../model/cart-selectors';
import { postOrder } from '../model/api-actions/post-order';

export const CartSummary = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const cartSumPrice = useAppSelector(getCartSumPrice);
  const cartItemsIds = useAppSelector(getCartItemsIds);
  const cartUploadingStatus = useAppSelector(getCartUploadingStatus);
  const coupon = useAppSelector(getCoupon);
  const discount = cartSumPrice * useAppSelector(getDiscount);

  const onPostOrderClick = () => {
    dispatch(postOrder({
      camerasIds: cartItemsIds,
      coupon: coupon || null
    }))
      .then((responce) => {
        if (responce.meta.requestStatus === 'fulfilled') {
          toast.success('Заказ принят!');

          dispatch(setCoupon(''));
          dispatch(setDiscount(0));
          dispatch(setDiscountStatus(FetchStatus.Idle));
        }

        return null;
      });
  };

  return (
    <div className="basket__summary">
      <Discount />

      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">
            Всего:
          </span>

          <span className="basket__summary-value">
            {cartSumPrice} ₽
          </span>
        </p>

        <p className="basket__summary-item">
          <span className="basket__summary-text">
            Скидка:
          </span>

          <span
            className={cn(
              'basket__summary-value',
              {'basket__summary-value--bonus': discount}
            )}
          >
            {discount} ₽
          </span>
        </p>

        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>

          <span className="basket__summary-value basket__summary-value--total">
            {cartSumPrice - discount} ₽
          </span>
        </p>

        <button
          className="btn btn--purple"
          type="button"
          onClick={onPostOrderClick}
          disabled={cartUploadingStatus.isLoading}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};
