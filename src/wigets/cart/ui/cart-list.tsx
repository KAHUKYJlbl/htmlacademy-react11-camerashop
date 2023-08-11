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
            Корзина пуста
          </p>
        </div>
      </li>
    );
  }

  return (
    <ul className="basket__list">
      {
        cartItems.map((camera) => (
          <CameraCardCart key={camera.id} camera={camera} />
        ))
      }
    </ul>
  );
};
