import { Link, generatePath } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../../../../app/provider/router';

type PaginationProps = {
  page: string;
  pagesCount: number;
}

export function Pagination ({ page, pagesCount }: PaginationProps): JSX.Element {
  const buttons = Array(pagesCount).fill('').map((element, index) => index + 1);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          page !== '1' &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={ generatePath( AppRoute.Catalog, { page: String(+page - 1) } ) }
            >
              Назад
            </Link>
          </li>
        }

        {
          buttons.map((button) => (
            <li className="pagination__item" key={button}>
              <Link
                className={cn('pagination__link', {'pagination__link--active': page === String(button) })}
                to={generatePath(AppRoute.Catalog, {page: String(button)})}
              >
                {button}
              </Link>
            </li>
          ))
        }

        <li className="pagination__item">
          <Link
            className={cn(
              'pagination__link pagination__link--text',
              {'pagination__link--text--disabled': page === String(pagesCount)}
            )}
            to={ generatePath( AppRoute.Catalog, { page: String(+page + 1) } ) }
          >
            Далее
          </Link>
        </li>
      </ul>
    </div>
  );
}
