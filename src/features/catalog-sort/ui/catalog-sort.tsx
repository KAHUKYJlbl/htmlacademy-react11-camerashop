import { SetURLSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { CatalogSearchParams, CurrentSort, SortChoise, getCatalogLoadingStatus } from '../../../wigets/catalog';

type CatalogSortProps = {
  currentSort: CurrentSort;
  setSearchParams: SetURLSearchParams;
}

export function CatalogSort ({currentSort, setSearchParams}: CatalogSortProps): JSX.Element {
  const catalogLoadingStatus = useAppSelector(getCatalogLoadingStatus);

  const handleSort = (sort: SortChoise) => {
    setSearchParams((current) => (
      current.get(CatalogSearchParams.SortType) === null
        ? new URLSearchParams({
          ...Object.fromEntries( current.entries() ),
          [CatalogSearchParams.SortType]: 'price',
          [CatalogSearchParams.SortOrder]: 'up',
          ...sort
        })
        : new URLSearchParams( {...Object.fromEntries( current.entries() ), ...sort } )
    ));
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">
            Сортировать:
          </p>

          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={currentSort.type === 'price'}
                onChange={() => handleSort({[CatalogSearchParams.SortType]: 'price'})}
                disabled={catalogLoadingStatus.isLoading || catalogLoadingStatus.isFailed}
              />

              <label htmlFor="sortPrice">
                по цене
              </label>
            </div>

            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={currentSort.type === 'popular'}
                onChange={() => handleSort({[CatalogSearchParams.SortType]: 'popular'})}
                disabled={catalogLoadingStatus.isLoading || catalogLoadingStatus.isFailed}
              />

              <label htmlFor="sortPopular">
                по популярности
              </label>
            </div>
          </div>

          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={currentSort.order === 'up'}
                onChange={() => handleSort({[CatalogSearchParams.SortOrder]: 'up'})}
                disabled={catalogLoadingStatus.isLoading || catalogLoadingStatus.isFailed}
              />

              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>

            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={currentSort.order === 'down'}
                onChange={() => handleSort({[CatalogSearchParams.SortOrder]: 'down'})}
                disabled={catalogLoadingStatus.isLoading || catalogLoadingStatus.isFailed}
              />

              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
