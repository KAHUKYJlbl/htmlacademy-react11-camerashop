import { Outlet, useParams } from 'react-router-dom';

import { Breadcrumbs } from '../../../shared/ui/breadcrumbs';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Titles } from '../../../shared/lib/const/titles';
import { AddCart, getAddCartShown } from '../../../features/add-cart';
import { PostReview, SuccessReview, getPostReviewShown, getSuccessReviewShown } from '../../../features/post-review';
import { Layout } from '../../../wigets/layout';
import { Similar } from '../../../wigets/similar';
import { getCamera } from '../../../wigets/camera-info';
import { ReviewBlock } from '../../../wigets/review-block';

const CameraPage = (): JSX.Element => {
  const { cameraId } = useParams();
  const camera = useAppSelector(getCamera);
  const isAddCartShown = useAppSelector(getAddCartShown);
  const isPostReviewShown = useAppSelector(getPostReviewShown);
  const isSuccessReviewShown = useAppSelector(getSuccessReviewShown);

  if (!cameraId) {
    return (
      <p>
        Oops ...
      </p>
    );
  }

  return (
    <Layout title={Titles.Product} camera={camera} isUpHeader isScrollRestoration >
      <main>
        <div className="page-content">
          <Breadcrumbs title={Titles.Product} camera={camera} />

          <Outlet context={cameraId} />

          <div className="page-content__section">
            <Similar cameraId={cameraId} />
          </div>

          <div className="page-content__section">
            <ReviewBlock cameraId={cameraId} />
          </div>
        </div>

        {isAddCartShown && <AddCart />}
        {isPostReviewShown && <PostReview />}
        {isSuccessReviewShown && <SuccessReview />}
      </main>
    </Layout>
  );
};

export default CameraPage;
