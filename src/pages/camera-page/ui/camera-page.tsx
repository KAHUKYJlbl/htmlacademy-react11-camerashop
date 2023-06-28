import { useParams } from 'react-router-dom';

import { Breadcrumbs } from '../../../shared/ui/breadcrumbs';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Titles } from '../../../shared/lib/const/titles';
import { AddBasket, getAddBasketShown } from '../../../features/add-basket';
import { Layout } from '../../../wigets/layout';
import { Similar } from '../../../wigets/similar';
import { CameraInfo, getCamera } from '../../../wigets/camera-info';
import { ReviewBlock } from '../../../wigets/review-block';
import { PostReview, getPostReviewShown } from '../../../features/post-review';

const CameraPage = (): JSX.Element => {
  const { cameraId } = useParams();
  const camera = useAppSelector(getCamera);
  const isAddBasketShown = useAppSelector(getAddBasketShown);
  const isPostReviewShown = useAppSelector(getPostReviewShown);

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
            <ReviewBlock cameraId={cameraId} />
          </div>
        </div>

        {isAddBasketShown && <AddBasket />}
        {isPostReviewShown && <PostReview />}
      </main>
    </Layout>
  );
};

export default CameraPage;
