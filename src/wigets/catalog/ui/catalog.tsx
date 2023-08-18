import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CurrentSort, SortOrder, SortType } from '../lib/types/current-sort';
import { getCurrentFilters } from '../lib/get-current-filters';
import { CARDS_PER_PAGE } from '../lib/const/cards-per-page';
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
import { usePlaceholders } from '../lib/hooks/use-placeholders';
import { useFiltersSearchParams } from '../lib/hooks/use-filters-search-params';
import { useSortSearchParams } from '../lib/hooks/use-sort-search-params';
import { usePageSearchParams } from '../lib/hooks/use-page-search-params';

export function Catalog (): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsPage = searchParams.get(CatalogSearchParams.Page) || '1';
  const searchParamsSort: CurrentSort = {
    type: searchParams.get(CatalogSearchParams.SortType) as SortType || null,
    order: searchParams.get(CatalogSearchParams.SortOrder) as SortOrder || null,
  };
  const searchParamsPrice: CurrentPrice = {
    min: Number(searchParams.get(CatalogSearchParams.FilterPriceMin)) || 0,
    max: Number(searchParams.get(CatalogSearchParams.FilterPriceMax)) || 0,
  };
  const searchParamsFilter: CatalogFilterType = {
    category: {
      photocamera: !!searchParams.get(CatalogSearchParams.FilterCategory)?.includes('photocamera'),
      videocamera: !!searchParams.get(CatalogSearchParams.FilterCategory)?.includes('videocamera'),
    },
    type: {
      digital: !!searchParams.get(CatalogSearchParams.FilterType)?.includes('digital'),
      film: !!searchParams.get(CatalogSearchParams.FilterType)?.includes('film'),
      snapshot: !!searchParams.get(CatalogSearchParams.FilterType)?.includes('snapshot'),
      collection: !!searchParams.get(CatalogSearchParams.FilterType)?.includes('collection'),
    },
    level: {
      zero: !!searchParams.get(CatalogSearchParams.FilterLevel)?.includes('zero'),
      nonprofessional: !!searchParams.get(CatalogSearchParams.FilterLevel)?.includes('nonprofessional'),
      professional: !!searchParams.get(CatalogSearchParams.FilterLevel)?.includes('professional'),
    },
  };

  const [page, setPage] = useState<string>(searchParamsPage);
  const [currentSort, setCurrentSort] = useState<CurrentSort>(searchParamsSort);
  const [currentPrice, setCurrentPrice] = useState<CurrentPrice>(searchParamsPrice);
  const [currentPricePlaceholder, setCurrentPricePlaceholder] = useState<CurrentPrice>(searchParamsPrice);
  const [currentFilter, setCurrentFilter] = useState<CatalogFilterType>(searchParamsFilter);

  const dispatch = useAppDispatch();
  const catalog = useAppSelector((state) =>
    getSortedFilteredCatalog(state, currentSort, getCurrentFilters(currentFilter))
  );
  const catalogPriced = useAppSelector((state) =>
    getSortedFilteredPricedCatalog(state, currentSort, getCurrentFilters(currentFilter), currentPrice)
  );
  const catalogIDs = useAppSelector(getCatalogIDs);
  const catalogLoadingStatus = useAppSelector(getCatalogLoadingStatus);

  // фетчим каталог
  useEffect(() => {
    dispatch(fetchCatalog());
  }, []);

  // фетчим рейтинги для каждой камеры
  useEffect(() => {
    catalogIDs.forEach((ID) => {
      dispatch(fetchRating( String(ID) ));
    });
  }, [catalogIDs]);

  // переполнение пагинации
  useEffect(() => {
    if (page && +page > Math.ceil( catalogPriced.length / CARDS_PER_PAGE )) {
      setPage('1');
    }
  }, [catalogPriced.length]);

  // вносим фильтры в URL
  useFiltersSearchParams(currentFilter, currentPrice, setSearchParams);

  // вносим сортировку в URL
  useSortSearchParams(currentSort, setSearchParams);

  // вносим пагинацию в URL
  usePageSearchParams(page, setSearchParams);

  // вычисление плейсхолдеров цены
  usePlaceholders(catalog, setCurrentPricePlaceholder);

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
            <CatalogSort currentSort={currentSort} setCurrentSort={setCurrentSort} />

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
                setPage={setPage}
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
