import cn from 'classnames';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Discount, getDiscount, setCoupon, setDiscount, setDiscountStatus } from '../../../features/discount';

import { getCartItemsIds, getCartSumPrice } from '../model/cart-selectors';
import { getCoupon } from '../../../features/discount/model/discount-selectors';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { postOrder } from '../model/api-actions/post-order';
import { cartClear } from '../model/cart-slice';
import { toast } from 'react-toastify';
import { FetchStatus } from '../../../shared/types/fetch-status';

export const CartSummary = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const cartSumPrice = useAppSelector(getCartSumPrice);
  const cartItemsIds = useAppSelector(getCartItemsIds);
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

          dispatch(cartClear());
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
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};
