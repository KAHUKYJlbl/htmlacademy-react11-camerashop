export type CurrentSort = {
  type: 'price' | 'popular' | null;
  order: 'up' | 'down' | null;
};

export type SortChoise = {
  type?: 'price' | 'popular';
  order?: 'up' | 'down';
}
