type FilterElement = {[key: string]: string}

export type Filter = {
  name: string;
  filterElements: FilterElement;
}

export type CatalogFilterType = { [key: string]: { [key: string]: boolean } };
