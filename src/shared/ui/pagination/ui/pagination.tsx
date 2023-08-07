import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../../../../app/provider/router';

type PaginationProps = {
  page: string;
  pagesCount: number;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export function Pagination ({ page, pagesCount, setPage }: PaginationProps): JSX.Element {
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
                setPage((current) => String( +current - 1 ));
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
                  setPage( String(button) );
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
                setPage((current) => String( +current + 1 ));
                // setSearchParams((current) =>
                //   new URLSearchParams({
                //     ...Object.fromEntries( current.entries() ),
                //     [CatalogSearchParams.Page]: String(+page + 1),
                //   })
                // );
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
