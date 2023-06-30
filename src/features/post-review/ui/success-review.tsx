import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { Modal } from '../../../shared/ui/modal';
import { hideSuccessReview } from '../model/post-review-slice';

export function SuccessReview (): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Modal onClose={() => dispatch(hideSuccessReview())} >
      <>
        <p className="title title--h4">
          Спасибо за отзыв
        </p>

        <svg
          className="modal__icon"
          width="80"
          height="78"
          aria-hidden
        >
          <use xlinkHref="#icon-review-success" />
        </svg>

        <div className="modal__buttons">
          <button
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={() => dispatch(hideSuccessReview())}
          >
            Вернуться к покупкам
          </button>
        </div>

        <button
          className="cross-btn"
          type="button"
          aria-label="Закрыть попап"
          onClick={() => dispatch(hideSuccessReview())}
        >
          <svg
            width="10"
            height="10"
            aria-hidden
          >
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      </>
    </Modal>
  );
}
