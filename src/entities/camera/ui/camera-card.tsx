import { Link, generatePath } from 'react-router-dom';
import cn from 'classnames';

import { Camera } from '../types/camera';
import { AppRoute } from '../../../app/provider/router';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { showAddBasket } from '../../../features/add-basket';

type CameraCardProps = {
  camera: Camera;
  className?: string;
}

export function CameraCard ({camera, className}: CameraCardProps): JSX.Element {
  const dispatch = useAppDispatch();

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
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">
            Рейтинг: {camera.id}
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
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => dispatch(showAddBasket(camera))}
        >
          Купить
        </button>

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
