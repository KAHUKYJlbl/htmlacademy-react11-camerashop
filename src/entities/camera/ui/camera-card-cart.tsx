import { useEffect, useState } from 'react';
import { showRemoveCart } from '../../../features/add-cart';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { cartItemSetQuantity } from '../../../wigets/cart';

import { RatedCamera } from '../types/camera';
import { priceFormat } from '../../../shared/lib/price-format';

type CameraCardCartProps = {
  camera: RatedCamera;
  quantity: number;
}

export const CameraCardCart = ({camera, quantity}: CameraCardCartProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [stateQuantity, setStateQuantity] = useState(quantity);

  useEffect(() => {
    dispatch(cartItemSetQuantity({camera, quantity: stateQuantity}));
  }, [stateQuantity]);

  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateQuantity((prev) =>
      (
        (
          /^\d*$/.test(e.target.value)
          && Number(e.target.value) <= 99
          && Number(e.target.value) >= 1
        ) || (e.target.value === '')
      )
        ? +e.target.value
        : prev
    );
  };

  const onCartRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    dispatch(showRemoveCart(camera));
  };

  return (
    <li className="basket-item" data-testid="test">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${camera.previewImgWebp} /${camera.previewImgWebp2x}`}
          />
          <img
            src={`/${camera.previewImg}`}
            srcSet={`/${camera.previewImg2x}`}
            width="140"
            height="120"
            alt={camera.name}
          />
        </picture>
      </div>

      <div className="basket-item__description">
        <p className="basket-item__title">
          {camera.name}
        </p>

        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">
              Артикул:
            </span>

            <span className="basket-item__number">
              {camera.vendorCode}
            </span>
          </li>

          <li className="basket-item__list-item">
            {`${camera.type} ${camera.category.toLowerCase()}`}
          </li>

          <li className="basket-item__list-item">
            {camera.level}
          </li>
        </ul>
      </div>

      <p className="basket-item__price">
        <span className="visually-hidden">
          Цена:
        </span>

        {priceFormat(camera.price)}
      </p>

      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={() => setStateQuantity(quantity - 1)}
          disabled={quantity === 1}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>

        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="text"
          id="counter1"
          value={quantity}
          onChange={(e) => onQuantityChange(e)}
          onBlur={(e) => +e.target.value === 0 ? setStateQuantity(1) : null}
          aria-label="количество товара"
        />

        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => setStateQuantity(quantity + 1)}
          disabled={quantity === 99}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>

      <div className="basket-item__total-price">
        <span className="visually-hidden">
          Общая цена:
        </span>

        {priceFormat( camera.price * ( quantity ? quantity : 1 ) )}
      </div>

      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={onCartRemove}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
};
