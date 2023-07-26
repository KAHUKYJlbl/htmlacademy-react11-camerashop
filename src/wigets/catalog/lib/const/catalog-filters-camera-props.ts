import { CameraCategories, CameraLevels, CameraTypes } from '../../../../entities/camera';
import { CategoryFilters, LevelFilters, TypeFilters } from '../types/current-filter';

export const Category: Record<CategoryFilters, CameraCategories> = {
  'photocamera': 'Фотоаппарат',
  'videocamera': 'Видеокамера',
};

export const Type: Record<TypeFilters, CameraTypes> = {
  'digital': 'Цифровая',
  'film': 'Плёночная',
  'snapshot': 'Моментальная',
  'collection': 'Коллекционная',
};

export const Level: Record<LevelFilters, CameraLevels> = {
  'zero': 'Нулевой',
  'nonprofessional': 'Любительский',
  'professional': 'Профессиональный',
};
