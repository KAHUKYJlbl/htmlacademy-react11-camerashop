import { useEffect } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import { CurrentSort } from '../types/current-sort';
import { CatalogSearchParams } from '../const/catalog-search-params';

export const useSortSearchParams = (sort: CurrentSort, setSearchParams: SetURLSearchParams) => {
  useEffect(() => {
    const {type, order} = sort;

    setSearchParams((current) =>
      new URLSearchParams({
        ...Object.fromEntries( current.entries() ),
        [CatalogSearchParams.SortType]: type || '',
        [CatalogSearchParams.SortOrder]: order || '',
      })
    );
  }, [sort]);
};
