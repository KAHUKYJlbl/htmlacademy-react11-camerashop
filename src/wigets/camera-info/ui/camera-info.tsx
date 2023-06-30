import { useEffect } from 'react';

import { fetchCamera } from '../model/api-actions/fetch-camera';
import { getCamera, getCameraLoadingStatus } from '../model/camera-info-selectors';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { CameraCardBig, CameraTabs } from '../../../entities/camera';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useOutletContext } from 'react-router-dom';
import { Oops } from '../../oops';

type CameraInfoProps = {
  cameraTab: CameraTabs;
}

export function CameraInfo ({cameraTab}: CameraInfoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const cameraId = useOutletContext<string>();
  const camera = useAppSelector(getCamera);
  const cameraLoadingStatus = useAppSelector(getCameraLoadingStatus);

  useEffect(() => {
    dispatch(fetchCamera(cameraId));
  }, [cameraId]);

  if (!camera) {
    return <Oops type='camera' arg={cameraId} />;
  }


  if (cameraLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='widget' />;
  }

  return (
    <div className="page-content__section">
      <CameraCardBig camera={camera} cameraTab={cameraTab} />
    </div>
  );
}
