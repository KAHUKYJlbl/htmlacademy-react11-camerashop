import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../app/provider/router';

export function Breadcrumbs (): JSX.Element {
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

          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">
              Каталог
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
