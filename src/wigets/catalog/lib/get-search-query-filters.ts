import { CatalogFilterType } from '../../../features/catalog-filter';
import { CategoryFilters, CurrentSearchQueryFilter, LevelFilters, TypeFilters } from './types/current-filter';

export const getSearchQueryFilters = (currentFilter: CatalogFilterType): CurrentSearchQueryFilter => {
  const filters: CurrentSearchQueryFilter = { category: [], type: [], level: [] };

  Array.from(Object.keys(currentFilter)).forEach((filterName) =>
    Array.from(Object.keys(currentFilter[filterName])).forEach((filter) => {
      if (currentFilter[filterName][filter]) {
        if (filterName === 'category') {
          filters[filterName].push(filter as CategoryFilters);
        } else if (filterName === 'type') {
          filters[filterName].push(filter as TypeFilters);
        } else if (filterName === 'level') {
          filters[filterName].push(filter as LevelFilters);
        }
      }
    })
  );

  return filters;
};
