import { useEffect } from 'react';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { fetchBanner } from '../model/api-actions/fetch-banner';
import { getBanner } from '../model/banner-selectors';
import { getCatalog } from '../../catalog/model/catalog-selectors';

export function Banner (): JSX.Element {
  const dispatch = useAppDispatch();
  const banner = useAppSelector(getBanner);
  const catalog = useAppSelector(getCatalog);

  useEffect(() => {
    dispatch(fetchBanner());
  }, []);

  if (!banner) {
    return <div className="banner"></div>;
  }

  return (
    <div className="banner">
      <picture>
        <source
          type="image/webp"
          srcSet={`/${banner.previewImgWebp} /${banner.previewImgWebp2x}`}
        />
        <img
          src={`/${banner.previewImg}`}
          srcSet={`/${banner.previewImg2x}`}
          width="1280"
          height="280"
          alt="баннер"
        />
      </picture>

      <p className="banner__info">
        <span className="banner__message">
          Новинка!
        </span>
        <span className="title title--h1">
          {banner.name}
        </span>
        <span className="banner__text">
          {catalog.find((camera) => camera.id === banner.id)?.description}
        </span>
        <a className="btn" href="#">
          Подробнее
        </a>
      </p>
    </div>
  );
}
