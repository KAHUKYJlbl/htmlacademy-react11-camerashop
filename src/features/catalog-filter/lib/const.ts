import { Filter } from './types';

export const filters: Record<string, Filter> = {
  category: {
    name: 'Категория',
    filterElements: {
      photocamera: 'Фотокамера',
      videocamera: 'Видеокамера',
    }
  },
  type: {
    name: 'Тип камеры',
    filterElements: {
      digital: 'Цифровая',
      film: 'Пленочная',
      snapshot: 'Моментальная',
      collection: 'Коллекционная',
    }
  },
  level: {
    name: 'Уровень',
    filterElements: {
      zero: 'Нулевой',
      nonprofessional: 'Любительский',
      professional: 'Профессиональный'
    }
  }
};
