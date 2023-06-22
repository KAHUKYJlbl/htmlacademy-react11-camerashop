import { useEffect } from 'react';

import { fetchCamera } from '../model/api-actions/fetch-camera';
import { getCamera, getCameraLoadingStatus } from '../model/camera-info-selectors';

import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { CameraCardBig } from '../../../entities/camera';

type CameraInfoProps = {
  cameraId: string;
}

export function CameraInfo ({cameraId}: CameraInfoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getCamera);
  const cameraLoadingStatus = useAppSelector(getCameraLoadingStatus);

  useEffect(() => {
    dispatch(fetchCamera(cameraId));
  }, [cameraId]);


  if (cameraLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='wiget' />;
  }

  if (!camera) {
    return (
      <p>
        Oops ...
      </p>
    );
  }

  return (
    <div className="page-content__section">
      <CameraCardBig camera={camera} />
    </div>
  );
}
