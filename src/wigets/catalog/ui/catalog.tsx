import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchCatalog } from '../model/api-actions/fetch-catalog';
import { fetchRating } from '../model/api-actions/fetch-rating';
import { getCatalog, getCatalogIDs, getCatalogLoadingStatus } from '../model/catalog-selectors';

import { CatalogFilter } from '../../../features/catalog-filter';
import { CatalogSort } from '../../../features/catalog-sort';
import { CameraCard } from '../../../entities/camera';
import { Pagination } from '../../../shared/ui/pagination';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { CARDS_PER_PAGE } from '../lib/const/cards-per-page';
import { Oops } from '../../oops';

export function Catalog (): JSX.Element {
  const { page } = useParams();
  const dispatch = useAppDispatch();
  const catalog = useAppSelector(getCatalog);
  const catalogIDs = useAppSelector(getCatalogIDs);
  const catalogLoadingStatus = useAppSelector(getCatalogLoadingStatus);

  useEffect(() => {
    dispatch(fetchCatalog());
  }, []);

  useEffect(() => {
    catalogIDs.forEach((ID) => {
      dispatch(fetchRating( String(ID) ));
    });
  }, [catalogIDs]);

  if (catalogLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='widget' />;
  }

  if (!page || !catalog.length) {
    return <Oops type='catalog' />;
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
              {
                catalog
                  .slice( (+page - 1) * CARDS_PER_PAGE, +page * CARDS_PER_PAGE )
                  .map((camera) =>
                    <CameraCard camera={camera} key={camera.id} />
                  )
              }
            </div>

            <Pagination page={page} pagesCount={ Math.ceil( catalog.length / CARDS_PER_PAGE ) } />
          </div>
        </div>
      </div>
    </section>
  );
}
