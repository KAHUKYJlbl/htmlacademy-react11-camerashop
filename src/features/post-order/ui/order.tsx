import cn from 'classnames';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { getCoupon, getDiscount, setCoupon, setDiscount, setDiscountStatus } from '../../../features/discount';

import { postOrder } from '../../../features/post-order/model/api-actions/post-order';

import { getOrderPostingStatus } from '../model/post-order-selectors';
import { showOrderSuccess } from '../model/post-order-slice';
import { priceFormat } from '../../../shared/lib/price-format';

type OrderProps = {
  cartSum: number;
  orderList: number[];
}

export const Order = ({cartSum, orderList}: OrderProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const orderPostingStatus = useAppSelector(getOrderPostingStatus);
  const coupon = useAppSelector(getCoupon);
  const discount = cartSum * useAppSelector(getDiscount);

  const onPostOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();

    if (orderList.length > 0) {
      dispatch(postOrder({
        camerasIds: orderList,
        coupon: coupon || null
      }))
        .then((responce) => {
          if (responce.meta.requestStatus === 'fulfilled') {
            dispatch(showOrderSuccess());
            dispatch(setCoupon(''));
            dispatch(setDiscount(0));
            dispatch(setDiscountStatus(FetchStatus.Idle));
          }

          return null;
        });
    }
  };

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">
          Всего:
        </span>

        <span className="basket__summary-value">
          {priceFormat(cartSum)}
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
          {priceFormat(discount)}
        </span>
      </p>

      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">
          К оплате:
        </span>

        <span className="basket__summary-value basket__summary-value--total">
          {priceFormat(cartSum - discount)}
        </span>
      </p>

      <button
        className="btn btn--purple"
        type="button"
        onClick={onPostOrderClick}
        disabled={orderPostingStatus.isLoading}
      >
        Оформить заказ
      </button>
    </div>
  );
};
