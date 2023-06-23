import { useEffect } from 'react';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { getSimilar, getSimilarLoadingStatus } from '../model/similar-selectors';
import { fetchSimilar } from '../model/api-actions/fetch-similar';
import { CameraCard } from '../../../entities/camera';

type SimilarProps = {
  cameraId: string;
}

export function Similar ({cameraId}: SimilarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const similar = useAppSelector(getSimilar);
  const similarLoadingStatus = useAppSelector(getSimilarLoadingStatus);


  useEffect(() => {
    dispatch(fetchSimilar(cameraId));
  }, [cameraId]);

  if (similarLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='wiget' />;
  }

  if (similar.length === 0) {
    return <p>Oops ...</p>;
  }

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">
          Похожие товары
        </h2>

        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {
              similar.map((camera) =>
                <CameraCard camera={camera} key={camera.id} />
              )
            }
          </div>

          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
            <svg width="7" height="12" aria-hidden="true">
              <image href="/img/sprite/icon-arrow.svg" />
            </svg>
          </button>

          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
            <svg width="7" height="12" aria-hidden="true">
              <image href="/img/sprite/icon-arrow.svg" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
