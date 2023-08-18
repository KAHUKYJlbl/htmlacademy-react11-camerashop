import { Link, generatePath } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../../../app/provider/router';
import { getCameraCartStatus } from '../../../wigets/cart';
import { showAddCart } from '../../../features/add-cart';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { RATING_SCALE_MAX } from '../../review';

import { RatedCamera } from '../types/camera';

type CameraCardProps = {
  camera: RatedCamera;
  className?: string;
}

export function CameraCard ({camera, className}: CameraCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const cartStatus = useAppSelector((state) => getCameraCartStatus(state, camera));

  return (
    <div className={ cn('product-card', className) }>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${camera.previewImgWebp} /${camera.previewImgWebp2x}`}
          />
          <img
            src={`/${camera.previewImg}`}
            srcSet={`/${camera.previewImg2x}`}
            width="280"
            height="240"
            alt={camera.name}
          />
        </picture>
      </div>

      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            new Array(RATING_SCALE_MAX)
              .fill('')
              .map((_, index) => (
                <svg key={`${RATING_SCALE_MAX + index}`} width="17" height="16" aria-hidden="true">
                  <use
                    xlinkHref={cn({
                      '#icon-full-star': index < camera.rating,
                      '#icon-star': index >= camera.rating
                    })}
                  />
                </svg>
              ))
          }

          <p className="visually-hidden">
            Рейтинг: {camera.rating}
          </p>

          <p className="rate__count">
            <span className="visually-hidden">
              Всего оценок:
            </span>
            {camera.reviewCount}
          </p>
        </div>

        <p className="product-card__title">
          {camera.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">
            Цена:
          </span>
          {camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {
          cartStatus.inCart
            ? (
              <Link
                className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
                to={AppRoute.Cart}
              >
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-basket" />
                </svg>

                В корзине
              </Link>
            ) : (
              <button
                className="btn btn--purple product-card__btn"
                type="button"
                onClick={() => dispatch(showAddCart(camera))}
              >
                Купить
              </button>
            )
        }

        <Link
          className="btn btn--transparent"
          to={ generatePath( AppRoute.Camera, { cameraId: String(camera.id) } ) }
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}
