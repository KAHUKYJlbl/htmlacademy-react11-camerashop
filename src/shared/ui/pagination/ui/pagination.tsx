import { Link, SetURLSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../../../../app/provider/router';
import { CatalogSearchParams } from '../../../../wigets/catalog';

type PaginationProps = {
  page: string;
  pagesCount: number;
  setSearchParams: SetURLSearchParams;
}

export function Pagination ({ page, pagesCount, setSearchParams }: PaginationProps): JSX.Element {
  const buttons = Array(pagesCount).fill('').map((element, index) => index + 1);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          page !== '1' &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={AppRoute.Catalog}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSearchParams((current) =>
                  new URLSearchParams({
                    ...Object.fromEntries( current.entries() ),
                    [CatalogSearchParams.Page]: String(+page - 1),
                  })
                );
              }}
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
                to={AppRoute.Catalog}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchParams((current) =>
                    new URLSearchParams({
                      ...Object.fromEntries( current.entries() ),
                      [CatalogSearchParams.Page]: String(button),
                    })
                  );
                }}
              >
                {button}
              </Link>
            </li>
          ))
        }

        {
          page !== String(pagesCount) &&
          <li className="pagination__item">
            <Link
              className='pagination__link pagination__link--text'
              to={AppRoute.Catalog}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSearchParams((current) =>
                  new URLSearchParams({
                    ...Object.fromEntries( current.entries() ),
                    [CatalogSearchParams.Page]: String(+page + 1),
                  })
                );
              }}
            >
              Далее
            </Link>
          </li>
        }

        {
          page === String(pagesCount) &&
          <li className="pagination__item">
            <div className="pagination__link pagination__link--text pagination__link--text--disabled"></div>
          </li>
        }
      </ul>
    </div>
  );
}
