import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';

import { Camera } from '../../../../entities/camera';
import { AppDispatch, State } from '../../../../app/provider/store';
import { toast } from 'react-toastify';
import { APIRoute } from '../../../../shared/lib/api-routes';

export const fetchCatalog = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Catalog/fetchCatalog',
  async (_arg, {extra: axios}) => {
    try {
      const { data } = await axios.get<Camera[]>(APIRoute.Catalog);

      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Login check failed.');
      }
      throw err;
    }
  },
);
