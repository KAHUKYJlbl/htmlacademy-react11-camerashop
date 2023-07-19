import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { Camera } from '../../../entities/camera';

export const getSearch = createSelector(
  [
    (state: State): Camera[] => state[NameSpace.Catalog].catalog,
    (state: State, searchInput: string) => searchInput
  ],
  (catalog, searchInput) => catalog.filter((camera) => camera.name.toLowerCase().includes(searchInput.toLowerCase()))
);
