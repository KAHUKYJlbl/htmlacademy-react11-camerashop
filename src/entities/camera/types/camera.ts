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

export type RatedCamera = Camera & {
  rating: number;
}

export type CameraRating = {
  id: number;
  rating: number;
}

export type CameraCategories = 'Видеокамера' | 'Фотоаппарат';

export type CameraTypes = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';

export type CameraLevels = 'Нулевой' | 'Любительский' | 'Профессиональный';
