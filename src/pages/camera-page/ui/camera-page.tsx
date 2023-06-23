import { useParams } from 'react-router-dom';

import { Breadcrumbs } from '../../../shared/ui/breadcrumbs';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Titles } from '../../../shared/lib/const/titles';
import { AddBasket, getAddBasketShown } from '../../../features/add-basket';
import { Layout } from '../../../wigets/layout';
import { Review } from '../../../wigets/review';
import { Similar } from '../../../wigets/similar';
import { CameraInfo, getCamera } from '../../../wigets/camera-info';

const CameraPage = (): JSX.Element => {
  const { cameraId } = useParams();
  const camera = useAppSelector(getCamera);
  const isAddBasketShown = useAppSelector(getAddBasketShown);

  if (!cameraId) {
    return (
      <p>
        Oops ...
      </p>
    );
  }

  return (
    <Layout title={Titles.Product} camera={camera} isUpHeader>
      <main>
        <div className="page-content">
          <Breadcrumbs title={Titles.Product} camera={camera} />

          <CameraInfo cameraId={cameraId} />

          <div className="page-content__section">
            <Similar cameraId={cameraId} />
          </div>

          <div className="page-content__section">
            <Review />
          </div>
        </div>

        {isAddBasketShown && <AddBasket />}
      </main>
    </Layout>
  );
};

export default CameraPage;
