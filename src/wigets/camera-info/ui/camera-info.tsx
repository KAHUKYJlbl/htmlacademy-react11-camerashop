import { useEffect } from 'react';

import { fetchCamera } from '../model/api-actions/fetch-camera';
import { getCamera, getCameraLoadingStatus } from '../model/camera-info-selectors';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { CameraCardBig } from '../../../entities/camera';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useOutletContext } from 'react-router-dom';
import { Oops } from '../../oops';
import { getReviewsLoadingStatus, getSortedReviewsNewToOld } from '../../review-block/model/review-selectors';
import { CameraTabs } from '../../../entities/camera/lib/const';

type CameraInfoProps = {
  cameraTab: CameraTabs;
}

export function CameraInfo ({cameraTab}: CameraInfoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const cameraId = useOutletContext<string>();
  const camera = useAppSelector(getCamera);
  const cameraLoadingStatus = useAppSelector(getCameraLoadingStatus);
  const reviews = useAppSelector(getSortedReviewsNewToOld);
  const rating = Math.ceil( reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length );
  const reviewsLoadingStatus = useAppSelector(getReviewsLoadingStatus);

  useEffect(() => {
    dispatch(fetchCamera(cameraId));
  }, [cameraId]);

  if (!camera) {
    return <Oops type='camera' arg={cameraId} />;
  }


  if (cameraLoadingStatus.isLoading || reviewsLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='widget' />;
  }

  return (
    <div className="page-content__section">
      <CameraCardBig camera={{...camera, rating}} cameraTab={cameraTab} />
    </div>
  );
}
