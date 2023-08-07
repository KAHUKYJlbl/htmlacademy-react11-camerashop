import { useEffect } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import { CatalogSearchParams } from '../const/catalog-search-params';

export const usePageSearchParams = (page: string, setSearchParams: SetURLSearchParams) => {
  useEffect(() => {

    setSearchParams((current) =>
      new URLSearchParams({
        ...Object.fromEntries( current.entries() ),
        [CatalogSearchParams.Page]: page,
      })
    );
  }, [page]);
};
