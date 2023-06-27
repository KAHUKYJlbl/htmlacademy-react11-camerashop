import { useEffect, useState } from 'react';

import { fetchReviews } from '../model/api-actions/fetch-reviews';
import { getReviews } from '../model/review-selectors';

import { Review } from '../../../entities/review';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { REVIEWS_PER_STEP } from '../lib/const';

type ReviewBlockProps = {
  cameraId: string;
}

export function ReviewBlock ({cameraId}: ReviewBlockProps): JSX.Element {
  const dispath = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const [shownReviewsCount, setShownReviewsCount] = useState<number>(REVIEWS_PER_STEP);
  const reviewsToShow = reviews.slice(0, shownReviewsCount);

  useEffect(() => {
    dispath(fetchReviews(cameraId));
  }, [cameraId]);

  const handleButtonClick = () => {
    setShownReviewsCount((current) => current + REVIEWS_PER_STEP);
  };

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">
            Отзывы
          </h2>
          <button className="btn" type="button">
            Оставить свой отзыв
          </button>
        </div>

        <ul className="review-block__list">
          {
            reviewsToShow.map((review) => (
              <Review key={review.id} review={review} />
            ))
          }
        </ul>

        {
          shownReviewsCount < reviews.length &&
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button" onClick={handleButtonClick}>
              Показать больше отзывов
            </button>
          </div>
        }
      </div>
    </section>
  );
}
