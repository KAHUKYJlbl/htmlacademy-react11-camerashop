export type SortType = 'price' | 'popular';

export type SortOrder = 'up' | 'down';

export type CurrentSort = {
  type: SortType | null;
  order: SortOrder | null;
};

export type SortChoise = {
  sortType?: SortType;
  sortOrder?: SortOrder;
}
