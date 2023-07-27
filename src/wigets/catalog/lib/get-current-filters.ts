import { CatalogFilterType } from '../../../features/catalog-filter';
import { Category, Level, Type } from './const/catalog-filters-camera-props';
import { CategoryFilters, CurrentFilter, LevelFilters, TypeFilters } from './types/current-filter';

export const getCurrentFilters = (currentFilter: CatalogFilterType): CurrentFilter => {
  const filters: CurrentFilter = { category: [], type: [], level: [] };

  Array.from(Object.keys(currentFilter)).forEach((filterName) =>
    Array.from(Object.keys(currentFilter[filterName])).forEach((filter) => {
      if (currentFilter[filterName][filter]) {
        if (filterName === 'category') {
          filters[filterName].push(Category[filter as CategoryFilters]);
        } else if (filterName === 'type') {
          filters[filterName].push(Type[filter as TypeFilters]);
        } else if (filterName === 'level') {
          filters[filterName].push(Level[filter as LevelFilters]);
        }
      }
    })
  );

  return filters;
};
