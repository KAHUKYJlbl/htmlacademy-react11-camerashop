import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Discount } from '../../../features/discount';

import { getCartItemsIds, getCartSumPrice } from '../model/cart-selectors';
import { Order } from '../../../features/post-order';

export const CartSummary = (): JSX.Element => {
  const cartSumPrice = useAppSelector(getCartSumPrice);
  const cartItemsIds = useAppSelector(getCartItemsIds);


  return (
    <div className="basket__summary">
      <Discount />

      <Order cartSum={cartSumPrice} orderList={cartItemsIds} />
    </div>
  );
};
