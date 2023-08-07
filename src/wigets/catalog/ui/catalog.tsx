import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CurrentSort, SortOrder, SortType } from '../lib/types/current-sort';
import { getCurrentFilters } from '../lib/get-current-filters';
import { CARDS_PER_PAGE } from '../lib/const/cards-per-page';
import { CATALOG_INITIAL_FILTER } from '../lib/const/catalog-initial-filter';
import { CurrentPrice } from '../lib/types/current-price';
import { fetchRating } from '../model/api-actions/fetch-rating';
import { fetchCatalog } from '../model/api-actions/fetch-catalog';
import {
  getCatalogIDs,
  getCatalogLoadingStatus,
  getSortedFilteredCatalog,
  getSortedFilteredPricedCatalog
} from '../model/catalog-selectors';
import classes from './catalog.module.sass';

import { CatalogFilter, CatalogFilterType } from '../../../features/catalog-filter';
import { CatalogSort } from '../../../features/catalog-sort';
import { CameraCard } from '../../../entities/camera';
import { Pagination } from '../../../shared/ui/pagination';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { Oops } from '../../oops';
import { CatalogSearchParams } from '../lib/const/catalog-search-params';

export function Catalog (): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get(CatalogSearchParams.Page) || '1';
  const currentSort: CurrentSort = {
    type: searchParams.get(CatalogSearchParams.SortType) as SortType,
    order: searchParams.get(CatalogSearchParams.SortOrder) as SortOrder,
  };
  const [currentPrice, setCurrentPrice] = useState<CurrentPrice>({min: 0, max: 0});
  const [currentPricePlaceholder, setCurrentPricePlaceholder] = useState<CurrentPrice>({min: 0, max: 0});
  const [currentFilter, setCurrentFilter] = useState<CatalogFilterType>(CATALOG_INITIAL_FILTER);
  const dispatch = useAppDispatch();
  const catalog = useAppSelector((state) =>
    getSortedFilteredCatalog(state, currentSort, getCurrentFilters(currentFilter))
  );
  const catalogPriced = useAppSelector((state) =>
    getSortedFilteredPricedCatalog(state, currentSort, getCurrentFilters(currentFilter), currentPrice)
  );
  const catalogIDs = useAppSelector(getCatalogIDs);
  const catalogLoadingStatus = useAppSelector(getCatalogLoadingStatus);

  useEffect(() => {
    dispatch(fetchCatalog());
  }, []);

  useEffect(() => {
    if (page && +page > Math.ceil( catalogPriced.length / CARDS_PER_PAGE )) {
      setSearchParams( (current) => new URLSearchParams( {...current, page: '1'} ) );
    }
  }, [catalogPriced.length]);

  useEffect(() => {
    if (catalog.length) {
      const sorted = [...catalog].sort((a, b) => a.price - b.price);

      setCurrentPricePlaceholder({
        min: sorted[0].price,
        max: sorted[sorted.length - 1].price,
      });
    }
  }, [catalog.length]);

  useEffect(() => {
    catalogIDs.forEach((ID) => {
      dispatch(fetchRating( String(ID) ));
    });
  }, [catalogIDs]);

  if (catalogLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='widget' />;
  }

  if (catalogLoadingStatus.isFailed) {
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
            <CatalogFilter
              currentPricePlaceholder={currentPricePlaceholder}
              currentPrice={currentPrice}
              setCurrentPrice={setCurrentPrice}
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
            />
          </div>

          <div className="catalog__content">
            <CatalogSort currentSort={currentSort} setSearchParams={setSearchParams} />

            {
              catalogPriced.length
                ?
                <div className="cards catalog__cards">
                  {
                    catalogPriced
                      .slice( (+page - 1) * CARDS_PER_PAGE, +page * CARDS_PER_PAGE )
                      .map((camera) =>
                        <CameraCard camera={camera} key={camera.id} />
                      )
                  }
                </div>
                : <div className={classes.catalogEmpty}>По вашему запросу ничего не найдено.</div>
            }

            {
              !!catalogPriced.length
              &&
              <Pagination
                setSearchParams={setSearchParams}
                page={page}
                pagesCount={ Math.ceil( catalogPriced.length / CARDS_PER_PAGE ) }
              />
            }
          </div>
        </div>
      </div>
    </section>
  );
}
