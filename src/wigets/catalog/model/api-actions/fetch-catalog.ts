import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';

import { ReviewCamera } from '../../../../entities/camera';
import { AppDispatch, State } from '../../../../app/provider/store';
import { toast } from 'react-toastify';
import { APIRoute } from '../../../../shared/lib/const/api-routes';

export const fetchCatalog = createAsyncThunk<ReviewCamera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Catalog/fetchCatalog',
  async (_arg, {extra: axios}) => {
    try {
      const { data } = await axios.get<ReviewCamera[]>(APIRoute.Catalog);

      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Catalog loading failed.');
      }
      throw err;
    }
  },
);
