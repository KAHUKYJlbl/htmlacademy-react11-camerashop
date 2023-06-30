import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

import { Review } from '..';

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  months: [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ]
});

type ReviewProps = {
  review: Review;
}

export function ReviewCard ({review}: ReviewProps): JSX.Element {
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">
          {review.userName}
        </p>

        <time className="review-card__data" dateTime={review.createAt}>
          {dayjs(review.createAt).format('D MMMM')}
        </time>
      </div>

      <div className="rate review-card__rate">
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
          <image href="/img/sprite/icon-full-star.svg" />
        </svg>
        <svg width="17" height="16" aria-hidden="true">
          <image href="/img/sprite/icon-full-star.svg" />
        </svg>

        <p className="visually-hidden">
          {review.rating}
        </p>
      </div>

      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">
            Достоинства:
          </span>
          <p className="item-list__text">
            {review.advantage}
          </p>
        </li>

        <li className="item-list">
          <span className="item-list__title">
            Недостатки:
          </span>

          <p className="item-list__text">
            {review.disadvantage}
          </p>
        </li>

        <li className="item-list">
          <span className="item-list__title">
            Комментарий:
          </span>

          <p className="item-list__text">
            {review.review}
          </p>
        </li>
      </ul>
    </li>
  );
}
