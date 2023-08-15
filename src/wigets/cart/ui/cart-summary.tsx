import cn from 'classnames';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Discount, getDiscount } from '../../../features/discount';

import { getCartSumPrice } from '../model/cart-selectors';

export const CartSummary = (): JSX.Element => {
  const cartSumPrice = useAppSelector(getCartSumPrice);
  const discount = cartSumPrice * useAppSelector(getDiscount);

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

        <button className="btn btn--purple" type="submit">
          Оформить заказ
        </button>
      </div>
    </div>
  );
};
