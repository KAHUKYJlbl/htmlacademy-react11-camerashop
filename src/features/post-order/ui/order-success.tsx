import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { Modal } from '../../../shared/ui/modal';
import { AppRoute } from '../../../app/provider/router';

import { hideOrderSuccess } from '../model/post-order-slice';

export function OrderSuccess (): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Modal onClose={() => dispatch(hideOrderSuccess())} >
      <>
        <p className="title title--h4">
          Спасибо за покупку
        </p>

        <svg
          className="modal__icon"
          width="80"
          height="78"
          aria-hidden="true"
        >
          <use xlinkHref="#icon-review-success" />
        </svg>

        <div className="modal__buttons">
          <Link
            className="btn btn--purple modal__btn modal__btn--fit-width"
            to={AppRoute.Cart}
            onClick={() => dispatch(hideOrderSuccess())}
          >
            Вернуться к покупкам
          </Link>
        </div>

        <button
          className="cross-btn"
          type="button"
          aria-label="Закрыть попап"
          onClick={() => dispatch(hideOrderSuccess())}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      </>
    </Modal>
  );
}
