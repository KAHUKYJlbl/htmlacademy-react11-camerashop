export type BannerCamera = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type Camera = BannerCamera & {
  vendorCode: string;
  type: CameraTypes;
  category: CameraCategories;
  level: CameraLevels;
  description: string;
  price: number;
  reviewCount: number;
};

export type CameraTypes = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';

export type CameraCategories = 'Видеокамера' | 'Фотоаппарат';

export type CameraLevels = 'Нулевой' | 'Любительский' | 'Профессиональный';
