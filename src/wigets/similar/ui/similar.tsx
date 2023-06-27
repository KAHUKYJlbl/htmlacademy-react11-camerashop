import { useEffect, useState } from 'react';
import cn from 'classnames';

import { getSimilar, getSimilarLoadingStatus } from '../model/similar-selectors';
import { fetchSimilar } from '../model/api-actions/fetch-similar';
import { SIMILAR_SHOWN_COUNT } from '../lib/const';
import styles from './similar.module.sass';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { CameraCard } from '../../../entities/camera';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

type SimilarProps = {
  cameraId: string;
}

export function Similar ({cameraId}: SimilarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const similar = useAppSelector(getSimilar);
  const similarLoadingStatus = useAppSelector(getSimilarLoadingStatus);
  const [shown, setShown] = useState(0);
  const [scroll, setScroll] = useState('');

  useEffect(() => {
    dispatch(fetchSimilar(cameraId));
  }, [cameraId]);

  const scrollRight = () => {
    if (shown < similar.length - SIMILAR_SHOWN_COUNT) {
      setScroll('right');

      setTimeout(() => {
        setScroll('');
        setShown((a) => a === similar.length - SIMILAR_SHOWN_COUNT ? a : a + 1);
      }, 300);
    }
  };

  const scrollLeft = () => {
    if (shown > 0) {
      setScroll('left');

      setTimeout(() => {
        setScroll('');
        setShown((a) => a === 0 ? 0 : a - 1);
      }, 300);
    }
  };

  if (similar.length === 0) {
    return <p>Oops ...</p>;
  }

  if (similarLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='widget' />;
  }

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">
          Похожие товары
        </h2>

        <div className="product-similar__slider">
          <div
            className={
              cn(
                'product-similar__slider-list',
                scroll === 'left' && styles.left,
                scroll === 'right' && styles.right,
              )
            }
          >
            {
              similar.map((camera, index) => (
                <CameraCard
                  camera={camera}
                  key={camera.id}
                  className={
                    cn(
                      styles.mount,
                      (index >= shown && index < shown + SIMILAR_SHOWN_COUNT) && 'is-active',
                      (index === shown && scroll === 'right') && styles.unmount,
                      (index === shown + SIMILAR_SHOWN_COUNT - 1 && scroll === 'left') && styles.unmount
                    )
                  }
                />
              ))
            }
          </div>

          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            onClick={scrollLeft}
            disabled={shown === 0}
            style={{pointerEvents: 'auto'}}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>

          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            onClick={scrollRight}
            disabled={shown === similar.length - SIMILAR_SHOWN_COUNT}
            style={{pointerEvents: 'auto'}}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
