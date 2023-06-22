import { Link, generatePath } from 'react-router-dom';

import { Camera } from '../types/camera';
import { AppRoute } from '../../../app/provider/router';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { showAddBasket } from '../../../features/add-basket';

type CameraCardProps = {
  camera: Camera;
}

export function CameraCard ({camera}: CameraCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
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
            <image href="/img/sprite/icon-full-star.svg" />
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <image href="/img/sprite/icon-full-star.svg" />
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <image href="/img/sprite/icon-full-star.svg" />
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <image href="/img/sprite/icon-star.svg" />
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <image href="/img/sprite/icon-star.svg" />
          </svg>
          <p className="visually-hidden">
            Рейтинг: 3
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
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => dispatch(showAddBasket(camera))}>
          Купить
        </button>
        <Link className="btn btn--transparent" to={ generatePath( AppRoute.Camera, { id: String(camera.id) } ) }>
          Подробнее
        </Link>
      </div>
    </div>
  );
}
