import { Link } from 'react-router-dom';

import { AppRoute } from '../../../../app/provider/router';
import { Titles } from '../../../lib/const/titles';
import { Camera } from '../../../../entities/camera';

type BreadcrumbsProps = {
  title: Titles;
  camera?: Camera | null;
}

export function Breadcrumbs ({title, camera}: BreadcrumbsProps): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Main}>
              Главная
              <svg width="5" height="8" aria-hidden="true">
                <image href="/img/sprite/icon-arrow-mini.svg" />
              </svg>
            </Link>
          </li>

          {
            title === Titles.Catalog &&

            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {title}
              </span>
            </li>
          }

          {
            title === Titles.Cart &&

            <>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
                  {Titles.Catalog}
                  <svg width="5" height="8" aria-hidden="true">
                    <image href="/img/sprite/icon-arrow-mini.svg" />
                  </svg>
                </Link>
              </li>

              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  {title}
                </span>
              </li>
            </>
          }

          {
            title === Titles.Product &&

            <>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
                  {Titles.Catalog}
                  <svg width="5" height="8" aria-hidden="true">
                    <image href="/img/sprite/icon-arrow-mini.svg" />
                  </svg>
                </Link>
              </li>

              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  {title}{camera?.name}
                </span>
              </li>
            </>
          }
        </ul>
      </div>
    </div>
  );
}
