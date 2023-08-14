import { CameraCardCart } from '../../../entities/camera';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { getCartItems } from '../model/cart-selectors';

export const CartList = (): JSX.Element => {
  const cartItems = useAppSelector(getCartItems);

  if (!cartItems.length) {
    return (
      <li className="basket-item">
        <div className="basket-item__description">
          <p className="basket-item__title">
            {`Корзина${'\u00A0'}пуста`}
          </p>
        </div>
      </li>
    );
  }

  return (
    <ul className="basket__list">
      {
        cartItems.map((item) => (
          <CameraCardCart key={item.camera.id} camera={item.camera} quantity={item.quantity} />
        ))
      }
    </ul>
  );
};
