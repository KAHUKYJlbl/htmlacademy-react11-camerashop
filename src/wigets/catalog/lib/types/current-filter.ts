import { CameraCategories, CameraLevels, CameraTypes } from '../../../../entities/camera';

export type CategoryFilters = 'photocamera' | 'videocamera';

export type TypeFilters = 'digital' | 'film' | 'snapshot' | 'collection';

export type LevelFilters = 'zero' | 'nonprofessional' | 'professional';

export type CurrentSearchQueryFilter = {
  category: Array<CategoryFilters>;
  type: Array<TypeFilters>;
  level: Array<LevelFilters>;
}

export type CurrentFilter = {
  category: Array<CameraCategories>;
  type: Array<CameraTypes>;
  level: Array<CameraLevels>;
}
