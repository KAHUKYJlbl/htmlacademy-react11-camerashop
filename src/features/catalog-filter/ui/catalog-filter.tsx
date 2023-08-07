import { CATALOG_INITIAL_FILTER, CurrentPrice } from '../../../wigets/catalog';

import { filters } from '../lib/const';
import { CatalogFilterType } from '../lib/types';

type CatalogFilterProps = {
  currentPricePlaceholder: CurrentPrice;
  currentPrice: CurrentPrice;
  setCurrentPrice: React.Dispatch< React.SetStateAction<CurrentPrice>>;
  currentFilter: CatalogFilterType;
  setCurrentFilter: React.Dispatch< React.SetStateAction<CatalogFilterType>>;
}

export function CatalogFilter ({
  currentPricePlaceholder,
  currentPrice,
  setCurrentPrice,
  currentFilter,
  setCurrentFilter
}: CatalogFilterProps): JSX.Element {
  const onMinPriceBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      if (currentPrice.min < 0) {
        setCurrentPrice((current) => (
          {
            ...current,
            min: 0
          }
        ));
      }

      if (currentPrice.min < currentPricePlaceholder.min) {
        setCurrentPrice((current) => (
          {
            ...current,
            min: currentPricePlaceholder.min
          }
        ));
      }

      if (currentPrice.min > currentPricePlaceholder.max) {
        setCurrentPrice((current) => (
          {
            ...current,
            min: currentPricePlaceholder.max
          }
        ));
      }
    }

    if (currentPrice.min > currentPrice.max && currentPrice.max && e.relatedTarget?.id !== 'max') {
      setCurrentPrice((current) => (
        {
          ...current,
          min: currentPrice.max
        }
      ));
    }
  };

  const onMaxPriceBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      if (currentPrice.max < 0) {
        setCurrentPrice((current) => (
          {
            ...current,
            max: 0
          }
        ));
      }

      if (currentPrice.max < currentPricePlaceholder.min) {
        setCurrentPrice((current) => (
          {
            ...current,
            max: currentPricePlaceholder.min
          }
        ));
      }

      if (currentPrice.max < currentPrice.min && currentPrice.min && e.relatedTarget?.id !== 'min') {
        setCurrentPrice((current) => (
          {
            ...current,
            max: currentPrice.min
          }
        ));
      }

      if (currentPrice.max > currentPricePlaceholder.max) {
        setCurrentPrice((current) => (
          {
            ...current,
            max: currentPricePlaceholder.max
          }
        ));
      }
    }
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPrice((current) => (
      Number.isNaN( Number(e.target.value) )
        ? current
        : {...current, [e.target.name]: Number(e.target.value)}
    ));
  };

  const onFilterReset = () => {
    setCurrentPrice({min: 0, max: 0});
    setCurrentFilter(CATALOG_INITIAL_FILTER);
  };

  return (
    <div className="catalog-filter">

      <form action="#">
        <h2 className="visually-hidden">
          Фильтр
        </h2>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">
            Цена, ₽
          </legend>

          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="text"
                  name="min"
                  id='min'
                  placeholder={String(currentPricePlaceholder.min)}
                  onChange={onPriceChange}
                  onBlur={onMinPriceBlur}
                  value={currentPrice.min || ''}
                />
              </label>
            </div>

            <div className="custom-input">
              <label>
                <input
                  type="text"
                  name="max"
                  id='max'
                  placeholder={String(currentPricePlaceholder.max)}
                  onChange={onPriceChange}
                  onBlur={onMaxPriceBlur}
                  value={currentPrice.max || ''}
                />
              </label>
            </div>
          </div>
        </fieldset>

        {
          Array.from(Object.keys(filters)).map((filter) => (
            <fieldset key={filter} className="catalog-filter__block">
              <legend className="title title--h5">
                {filters[filter].name}
              </legend>

              {
                Array.from(Object.keys(filters[filter].filterElements)).map((filterElement) => (
                  <div key={filterElement} className="custom-checkbox catalog-filter__item">
                    <label>
                      <input
                        type="checkbox"
                        name={filterElement}
                        disabled = {
                          currentFilter.category.videocamera
                          && (
                            filters[filter].filterElements[filterElement] === 'Пленочная'
                            || filters[filter].filterElements[filterElement] === 'Моментальная'
                          )
                        }
                        checked={currentFilter[filter][filterElement]}
                        onChange={() => {
                          setCurrentFilter((current) => (
                            {
                              ...current,
                              [filter]: {
                                ...current[filter],
                                [filterElement]: !current[filter][filterElement]
                              }
                            }
                          ));

                          if (filters[filter].filterElements[filterElement] === 'Фотокамера') {
                            setCurrentFilter((current) => (
                              {
                                ...current,
                                category: {
                                  ...current.category,
                                  videocamera: false
                                }
                              }
                            ));
                          }

                          if (filters[filter].filterElements[filterElement] === 'Видеокамера') {
                            setCurrentFilter((current) => (
                              {
                                ...current,
                                category: {
                                  ...current.category,
                                  photocamera: false
                                },
                                type: {
                                  ...current.type,
                                  film: false,
                                  snapshot: false,
                                }
                              }
                            ));
                          }
                        }}
                      />

                      <span className="custom-checkbox__icon" />

                      <span className="custom-checkbox__label">
                        {filters[filter].filterElements[filterElement]}
                      </span>
                    </label>
                  </div>
                ))
              }
            </fieldset>
          ))
        }

        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={onFilterReset}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
