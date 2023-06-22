import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../../shared/ui/breadcrumbs';
import { Layout } from '../../../wigets/layout';
import { Review } from '../../../wigets/review';
import { Similar } from '../../../wigets/similar';
import { CameraInfo } from '../../../wigets/camera-info';

const CameraPage = (): JSX.Element => {
  const { cameraId } = useParams();

  if (!cameraId) {
    return (
      <p>
        Oops ...
      </p>
    );
  }

  return (
    <Layout isUpHeader>
      <main>
        <div className="page-content">
          <Breadcrumbs />

          <CameraInfo cameraId={cameraId} />

          <div className="page-content__section">
            <Similar />
          </div>

          <div className="page-content__section">
            <Review />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default CameraPage;
