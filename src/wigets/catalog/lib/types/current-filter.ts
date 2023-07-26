import { CameraCategories, CameraLevels, CameraTypes } from '../../../../entities/camera';

export type CategoryFilters = 'photocamera' | 'videocamera';

export type TypeFilters = 'digital' | 'film' | 'snapshot' | 'collection';

export type LevelFilters = 'zero' | 'nonprofessional' | 'professional';

export type CurrentFilter = {
  category: Array<CameraCategories>;
  type: Array<CameraTypes>;
  level: Array<CameraLevels>;
}
