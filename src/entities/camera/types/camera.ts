export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: CameraTypes;
  category: CameraCategories;
  level: CameraLevels;
  description: string;
  price: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type CameraTypes = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';

export type CameraCategories = 'Видеокамера' | 'Фотоаппарат';

export type CameraLevels = 'Нулевой' | 'Любительский' | 'Профессиональный';
