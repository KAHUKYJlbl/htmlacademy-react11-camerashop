import { Link } from 'react-router-dom';

import { AppRoute } from '../../../app/provider/router';
import { Search } from '../../../features/search';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { getCartLength } from '../../cart';

export default function Header (): JSX.Element {
  const cartLength = useAppSelector(getCartLength);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Main} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>

        <Search />

        <Link className="header__basket-link" to={AppRoute.Cart}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>

          {
            !!cartLength
            && <span className="header__basket-count">{cartLength}</span>
          }
        </Link>
      </div>
    </header>
  );
}
