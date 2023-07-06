import { useEffect, useState } from 'react';

import { fetchReviews } from '../model/api-actions/fetch-reviews';
import { getSortedReviewsNewToOld, getReviewsLoadingStatus } from '../model/review-selectors';

import { ReviewCard } from '../../../entities/review';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { REVIEWS_PER_STEP } from '../lib/const';
import { showPostReview } from '../../../features/post-review';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

type ReviewBlockProps = {
  cameraId: string;
}

export function ReviewBlock ({cameraId}: ReviewBlockProps): JSX.Element {
  const dispath = useAppDispatch();
  const reviews = useAppSelector(getSortedReviewsNewToOld);
  const reviewsLoadingStatus = useAppSelector(getReviewsLoadingStatus);
  const [shownReviewsCount, setShownReviewsCount] = useState<number>(REVIEWS_PER_STEP);

  useEffect(() => {
    dispath( fetchReviews( String(cameraId) ) );
  }, [cameraId]);

  const reviewsToShow = reviews.slice(0, shownReviewsCount);

  const handleButtonClick = () => {
    setShownReviewsCount((current) => current + REVIEWS_PER_STEP);
  };

  if (reviewsLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='widget' />;
  }

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">
            Отзывы
          </h2>

          <button
            className="btn"
            type="button"
            onClick={() => dispath(showPostReview(cameraId))}
          >
            Оставить свой отзыв
          </button>
        </div>

        <ul className="review-block__list">
          {
            reviewsToShow.map((review) => (
              <ReviewCard key={review.id} review={review} />
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
