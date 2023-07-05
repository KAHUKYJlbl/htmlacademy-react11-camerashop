import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Modal } from '../../../shared/ui/modal';
import { getCurrentCamera } from '../model/add-basket-selectors';
import { hideAddBasket } from '../model/add-basket-slice';

export function AddBasket (): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCamera = useAppSelector(getCurrentCamera);

  if (!currentCamera) {
    return (
      <p>Oops ...</p>
    );
  }

  return (
    <Modal onClose={() => dispatch(hideAddBasket())} >
      <>
        <p className="title title--h4">Добавить товар в корзину</p>

        <div className="basket-item basket-item--short">
          <div className="basket-item__img">
            <picture>
              <source
                type="image/webp"
                srcSet={`/${currentCamera.previewImgWebp} /${currentCamera.previewImgWebp2x}`}
              />

              <img
                src={`/${currentCamera.previewImg}`}
                srcSet={`/${currentCamera.previewImg2x}`}
                width="140"
                height="120"
                alt={currentCamera.name}
              />
            </picture>
          </div>

          <div className="basket-item__description">
            <p className="basket-item__title">
              {currentCamera.name}
            </p>

            <ul className="basket-item__list">
              <li className="basket-item__list-item">
                <span className="basket-item__article">
                  {'Артикул: '}
                </span>

                <span className="basket-item__number">
                  {currentCamera.vendorCode}
                </span>
              </li>

              <li className="basket-item__list-item">
                {currentCamera.type}
                {currentCamera.category === 'Видеокамера' ? ' видеокамера' : ' фотокамера'}
              </li>

              <li className="basket-item__list-item">
                {currentCamera.level} уровень
              </li>
            </ul>

            <p className="basket-item__price">
              <span className="visually-hidden">
                Цена:
              </span>
              {currentCamera.price} ₽
            </p>
          </div>
        </div>

        <div className="modal__buttons">
          <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" >
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>
            Добавить в корзину
          </button>
        </div>

        <button
          className="cross-btn"
          type="button"
          aria-label="Закрыть попап"
          onClick={() => dispatch(hideAddBasket())}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </>
    </Modal>
  );
}
