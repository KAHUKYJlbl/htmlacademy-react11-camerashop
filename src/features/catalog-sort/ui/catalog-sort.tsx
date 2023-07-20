import { CurrentSort, SortChoise } from '../../../wigets/catalog';

type CatalogSortProps = {
  currentSort: CurrentSort;
  setCurrentSort: React.Dispatch<React.SetStateAction<CurrentSort>>;
}

export function CatalogSort ({currentSort, setCurrentSort}: CatalogSortProps): JSX.Element {
  const handleSort = (sort: SortChoise) => {
    setCurrentSort((current) => (
      current.type === null
        ? {type: 'price', order: 'up', ...sort}
        : {...current, ...sort}
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
                onChange={() => handleSort({type: 'price'})}
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
                onChange={() => handleSort({type: 'popular'})}
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
                onChange={() => handleSort({order: 'up'})}
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
                onChange={() => handleSort({order: 'down'})}
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
