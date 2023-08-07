import { useEffect } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import { CatalogFilterType } from '../../../../features/catalog-filter';
import { getSearchQueryFilters } from '../get-search-query-filters';
import { CurrentPrice } from '../types/current-price';
import { CatalogSearchParams } from '../const/catalog-search-params';

export const useFiltersSearchParams = (filter: CatalogFilterType, price: CurrentPrice, setSearchParams: SetURLSearchParams) => {
  useEffect(() => {
    const {category, type, level} = getSearchQueryFilters(filter);
    const {min, max} = price;

    setSearchParams((current) =>
      new URLSearchParams({
        ...Object.fromEntries( current.entries() ),
        [CatalogSearchParams.FilterCategory]: category.toString(),
        [CatalogSearchParams.FilterType]: type.toString(),
        [CatalogSearchParams.FilterLevel]: level.toString(),
        [CatalogSearchParams.FilterPriceMin]: String(min),
        [CatalogSearchParams.FilterPriceMax]: String(max),
      })
    );
  }, [filter, price]);
};
