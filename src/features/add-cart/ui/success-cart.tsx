import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { Modal } from '../../../shared/ui/modal';
import { AppRoute } from '../../../app/provider/router';

import { hideSuccessCart } from '../model/add-cart-slice';

export function SuccessCart (): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Modal onClose={() => dispatch(hideSuccessCart())} >
      <>
        <p className="title title--h4">
          Товар успешно добавлен в корзину
        </p>

        <svg
          className="modal__icon"
          width="86"
          height="80"
          aria-hidden="true"
        >
          <use xlinkHref="#icon-success" />
        </svg>

        <div className="modal__buttons">
          <button
            className="btn btn--transparent modal__btn"
            onClick={() => dispatch(hideSuccessCart())}
          >
            Продолжить покупки
          </button>

          <Link
            className="btn btn--purple modal__btn modal__btn--fit-width"
            to={AppRoute.Cart}
            onClick={() => dispatch(hideSuccessCart())}
          >
            Перейти в корзину
          </Link>
        </div>

        <button
          className="cross-btn"
          type="button"
          aria-label="Закрыть попап"
          onClick={() => dispatch(hideSuccessCart())}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      </>
    </Modal>
  );
}
