import { generatePath, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../../../app/provider/router';
import { showAddCart } from '../../../features/add-cart';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';

import { RATING_SCALE_MAX } from '../../review';
import { RatedCamera } from '../types/camera';
import { CameraTabs } from '../lib/const';
import { priceFormat } from '../../../shared/lib/price-format';

type CameraPageInfoProps = {
  camera: RatedCamera;
  cameraTab: CameraTabs;
}

export function CameraCardBig ({camera, cameraTab}: CameraPageInfoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAddCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    dispatch(showAddCart(camera));
  };

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${camera.previewImgWebp} /${camera.previewImgWebp2x}`}
            />
            <img
              src={`/${camera.previewImg}`}
              srcSet={`/${camera.previewImg2x}`}
              width="560"
              height="480"
              alt={camera.name}
            />
          </picture>
        </div>

        <div className="product__content">
          <h1 className="title title--h3">{camera.name}</h1>

          <div className="rate product__rate">
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

          <p className="product__price">
            <span className="visually-hidden">
              Цена:
            </span>
            {priceFormat(camera.price)}
          </p>

          <button
            className="btn btn--purple"
            type="button"
            onClick={onAddCartClick}
          >
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>
            Добавить в корзину
          </button>

          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <button
                type="button"
                className={ cn( 'tabs__control', { 'is-active': cameraTab === CameraTabs.Properties } ) }
                onClick={ () => navigate(
                  generatePath( AppRoute.CameraProperties, { cameraId: String(camera.id) } )
                )}
              >
                {CameraTabs.Properties}
              </button>

              <button
                className={ cn( 'tabs__control', { 'is-active': cameraTab === CameraTabs.Description } ) }
                type="button"
                onClick={ () => navigate(
                  generatePath( AppRoute.CameraDescription, { cameraId: String(camera.id) } )
                )}
              >
                {CameraTabs.Description}
              </button>
            </div>

            <div className="tabs__content">
              <div
                className={ cn( 'tabs__element', { 'is-active': cameraTab === CameraTabs.Properties } ) }
              >
                <ul className="product__tabs-list">
                  <li className="item-list">
                    <span className="item-list__title">
                      Артикул:
                    </span>

                    <p className="item-list__text">
                      {camera.vendorCode}
                    </p>
                  </li>

                  <li className="item-list">
                    <span className="item-list__title">
                      Категория:
                    </span>

                    <p className="item-list__text">
                      {camera.category}
                    </p>
                  </li>

                  <li className="item-list">
                    <span className="item-list__title">
                      Тип камеры:
                    </span>

                    <p className="item-list__text">
                      {camera.type}
                    </p>
                  </li>

                  <li className="item-list">
                    <span className="item-list__title">
                      Уровень:
                    </span>

                    <p className="item-list__text">
                      {camera.level}
                    </p>
                  </li>
                </ul>
              </div>

              <div
                className={ cn( 'tabs__element', { 'is-active': cameraTab === CameraTabs.Description } ) }
              >
                <div className="product__tabs-text">
                  <p>
                    {camera.description}
                  </p>

                  <p>
                    Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству {camera.type === 'Цифровая' ? 'цифровой' : 'аналоговой'} съёмки, заказав этот чудо-аппарат. Кто знает, может с&nbsp;{camera.name}&nbsp;начнётся ваш путь к&nbsp;наградам всех престижных {camera.category === 'Видеокамера' ? 'кинофестивалей' : 'фотовыставок'}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
