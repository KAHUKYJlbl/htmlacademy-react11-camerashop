import React, { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';


import { RATING_SCALE_MAX, RatingScale, ReviewForm } from '../../../entities/review';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { Modal } from '../../../shared/ui/modal';

import { REVIEW_MIN_LENGTH } from '../lib/const';
import { hidePostReview } from '../model/post-review-slice';
import { postReview } from '../model/api-actions/post-review';
import { getCurrentCameraId } from '../model/post-review-selectors';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';

export function PostReview (): JSX.Element {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<ReviewForm>();
  const currentCameraId = useAppSelector(getCurrentCameraId);
  const [fieldErrors, setFieldErrors] = useState({
    rating: false,
    userName: false,
    advantage: false,
    disadvantage: false,
    review: false,
  });

  if (!currentCameraId) {
    return (
      <Modal>
        <p>Oops ...</p>
      </Modal>
    );
  }

  const onFormSubmit: SubmitHandler<ReviewForm> = (data) => {
    dispatch(postReview({...data, rating: +data.rating, cameraId: +currentCameraId}));
  };

  const onFormSubmitError: SubmitErrorHandler<ReviewForm> = (errors) => {
    setFieldErrors({
      rating: !!errors.rating,
      userName: !!errors.userName,
      advantage: !!errors.advantage,
      disadvantage: !!errors.disadvantage,
      review: !!errors.review,
    });
  };

  return (
    <Modal>
      <>
        <p className="title title--h4">Оставить отзыв</p>
        <div className="form-review">
          <form
            onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}
          >
            <div className="form-review__rate">
              <fieldset className="rate form-review__item">
                <legend className="rate__caption">
                  Рейтинг
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </legend>

                <div className="rate__bar">
                  <div className="rate__group">
                    {
                      Object.keys(RatingScale)
                        .reverse()
                        .map((rating) => (
                          <React.Fragment key={rating}>
                            <input
                              {...register('rating', {required: true})}
                              className="visually-hidden"
                              id={`star-${rating}`}
                              name="rating"
                              type="radio"
                              value={rating}
                            />

                            <label
                              className="rate__label"
                              htmlFor={`star-${rating}`}
                              title={RatingScale[rating]}
                            >
                            </label>
                          </React.Fragment>
                        ))
                    }
                  </div>

                  <div className="rate__progress">
                    <span className="rate__stars">
                      0
                    </span>

                    <span>
                      /
                    </span>

                    <span className="rate__all-stars">
                      {RATING_SCALE_MAX}
                    </span>
                  </div>
                </div>

                {fieldErrors.rating && <p className="rate__message">Нужно оценить товар</p>}
              </fieldset>

              <div className="custom-input form-review__item">
                <label>
                  <span className="custom-input__label">
                    Ваше имя

                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>

                  <input
                    {...register('userName', {required: true})}
                    type="text"
                    name="userName"
                    placeholder="Введите ваше имя"
                    required
                  />
                </label>
                {fieldErrors.userName && <p className="custom-input__error">Нужно указать имя</p>}
              </div>

              <div className="custom-input form-review__item">
                <label>
                  <span className="custom-input__label">
                    Достоинства

                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  <input
                    {...register('advantage', {required: true})}
                    type="text"
                    name="advantage"
                    placeholder="Основные преимущества товара"
                    required
                  />
                </label>

                {fieldErrors.advantage && <p className="custom-input__error">Нужно указать достоинства</p>}
              </div>

              <div className="custom-input form-review__item">
                <label>
                  <span className="custom-input__label">
                    Недостатки

                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>

                  <input
                    {...register('disadvantage', {required: true})}
                    type="text"
                    name="disadvantage"
                    placeholder="Главные недостатки товара"
                    required
                  />
                </label>

                {fieldErrors.disadvantage && <p className="custom-input__error">Нужно указать недостатки</p>}
              </div>

              <div className="custom-textarea form-review__item">
                <label>
                  <span className="custom-textarea__label">
                    Комментарий

                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>

                  <textarea
                    {...register('review', {required: true, minLength: REVIEW_MIN_LENGTH})}
                    name="review"
                    minLength={REVIEW_MIN_LENGTH}
                    placeholder="Поделитесь своим опытом покупки"
                  >
                  </textarea>
                </label>

                {fieldErrors.review && <div className="custom-textarea__error">Нужно добавить комментарий</div>}
              </div>
            </div>

            <button
              className="btn btn--purple form-review__btn"
              type="submit"
            >
              Отправить отзыв
            </button>
          </form>
        </div>
        <button
          className="cross-btn"
          type="button"
          aria-label="Закрыть попап"
          onClick={() => dispatch(hidePostReview())}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </>
    </Modal>
  );
}
