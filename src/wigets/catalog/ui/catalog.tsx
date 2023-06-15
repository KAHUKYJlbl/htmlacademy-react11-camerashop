import { useEffect } from 'react';

import { fetchCatalog } from '../model/api-actions/fetch-catalog';
import { getCatalog, getCatalogLoadingStatus } from '../model/catalog-selectors';

import { CatalogFilter } from '../../../features/catalog-filter';
import { CatalogSort } from '../../../features/catalog-sort';
import { CameraCard } from '../../../entities/camera';
import { Pagination } from '../../../shared/ui/pagination';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

export function Catalog (): JSX.Element {
  const dispatch = useAppDispatch();
  const catalog = useAppSelector(getCatalog);
  const catalogLoadingStatus = useAppSelector(getCatalogLoadingStatus);

  useEffect(() => {
    dispatch(fetchCatalog());
  }, []);

  if (catalogLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='page' />;
  }

  if (catalog.length === 0) {
    return <span>Oops ...</span>;
  }

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">
          Каталог фото- и видеотехники
        </h1>

        <div className="page-content__columns">
          <div className="catalog__aside">
            <CatalogFilter />
          </div>

          <div className="catalog__content">
            <CatalogSort />

            <div className="cards catalog__cards">
              <CameraCard camera={catalog[0]}/>
              {/* <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard /> */}
            </div>

            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
}
